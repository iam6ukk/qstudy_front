import React, { useEffect, useState } from "react";
import styles from "./css/groupMember.module.css";
import axios from "axios";
import Crown from "../../assets/crown.png";

const GroupMember = ({
  userId,
  setOpenMember,
  groupId,
  writer,
  deleteGroupMember,
}) => {
  const [member, setMember] = useState([]);

  // 그룹 멤버 조회
  async function getMember(groupId) {
    try {
      const response = await axios.get(
        `http://localhost:8080/group/attend/member?id=${groupId}`
      );
      console.log("그룹 멤버 목록: ", response.data);
      setMember(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // 방장을 항상 첫 번째로 올리는 함수
  const prioritizeCaptain = () => {
    const updatedMembers = member.slice(); // 배열 복사
    const captainIndex = updatedMembers.findIndex(
      (user) => writer.toString() === user.id.toString()
    );

    // 방장인 경우에만 가장 앞에 추가
    if (captainIndex !== -1) {
      const captain = updatedMembers.splice(captainIndex, 1)[0]; // splice로 방장 잘라냄
      updatedMembers.unshift(captain); // 배열의 가장 앞쪽에 추가
    }

    return updatedMembers;
  };

  const prioritizedMembers = prioritizeCaptain();

  const exile = (user) => {
    if (window.confirm(`${user.nickname} 님을 추방하시겠습니까?`)) {
      console.log("추방 : ", user.id);
      deleteGroupMember(user);
    }
  };

  // 스터디원 추방
  async function deleteGroupMember(user) {
    axios.delete("http://localhost:8080/group/attend/member/delete", {
      data: {
        group_id: groupId,
        user_id: user.id,
      },
    });
  }

  useEffect(() => {
    getMember(groupId);
  }, []);

  return (
    <div className={styles.member_container}>
      <div className={styles.container_title}>
        <div className={styles.title}>참여자 목록</div>
        <button
          className={styles.close_btn}
          onClick={() => setOpenMember(false)}
        ></button>
      </div>
      <div className={styles.member_list}>
        {prioritizedMembers.map((user) => (
          <div className={styles.member} key={user.id}>
            {writer.toString() === user.id.toString() ? (
              <>
                <div className={styles.crown}>
                  <img src={Crown}></img>
                </div>
                <div>{user.nickname}</div>
              </>
            ) : writer == userId ? (
              <>
                <div className={styles.list_nickname}>{user.nickname}</div>
                <div
                  className={styles.exile}
                  onClick={() => {
                    exile(user);
                  }}
                >
                  추방
                </div>
              </>
            ) : (
              <>
                <div>{user.nickname}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMember;
