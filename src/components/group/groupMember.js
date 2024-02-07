import React from "react";
import styles from "./css/groupMember.module.css";

const GroupMember = ({ setOpenMember, groupId }) => {
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
        <div className={styles.member}>
          <div>닉네임</div>
          <div>(아이디)</div>
        </div>
        <div className={styles.member}>
          <div>닉네임</div>
          <div>(아이디)</div>
        </div>
      </div>
    </div>
  );
};

export default GroupMember;
