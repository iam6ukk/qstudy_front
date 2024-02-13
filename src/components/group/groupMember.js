import React, { useEffect, useState } from "react";
import styles from "./css/groupMember.module.css";
import axios from "axios";

const GroupMember = ({ setOpenMember, groupId }) => {
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
        {member.map((user) => {
          return (
            <div className={styles.member}>
              <div>{user.nickname}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupMember;
