import React from "react";
import styles from "./css/signup.module.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form}>
        <div className={styles.basic_wrap}>
          <div className={styles.signup_input}>
            <label>ID</label>
            <input type="id" value="id" />
          </div>
          <div className={styles.signup_input}>
            <label>Password</label>
            <input type="password" value="password" />
          </div>
          <div className={styles.signup_input}>
            <label>Nickname</label>
            <input type="text" value="nickname" />
          </div>
          <div className={styles.signup_input}>
            <label>Email</label>
            <input type="email" value="email" />
          </div>

          <div className={styles.signup_btn}>
            <input
              type="submit"
              value="회원가입"
              className={styles.submit}
              onClick={() => {
                navigate("/login");
                alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
