import React, { useState } from "react";
import styles from "./css/signup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const navigate = useNavigate();

  const [id, setId] = useState();
  const [pwd, setPwd] = useState();
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();

  const idChange = (e) => {
    setId(e.target.value);
  };
  const pwdChange = (e) => {
    setPwd(e.target.value);
  };
  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  async function submit() {
    try {
      const userData = {
        id: id,
        password: pwd,
        email: email,
        nickname: nickname,
      };
      axios
        .post("http://210.114.19.32:8080/signup", userData)
        .then((response) => {
          console.log(response);
          navigate("/login");
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        })
        .catch((error2) => {
          alert("아이디가 중복되었습니다.");
        });
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form}>
        <div className={styles.basic_wrap}>
          <div className={styles.signup_input}>
            <label>ID</label>
            <input
              type="id"
              onChange={idChange}
              placeholder="아이디를 입력하세요."
            />
          </div>
          <div className={styles.signup_input}>
            <label>Password</label>
            <input
              type="password"
              onChange={pwdChange}
              placeholder="비밀번호를 입력하세요."
            />
          </div>
          <div className={styles.signup_input}>
            <label>Nickname</label>
            <input
              type="text"
              onChange={nicknameChange}
              placeholder="닉네임을 입력하세요."
            />
          </div>
          <div className={styles.signup_input}>
            <label>Email</label>
            <input
              type="email"
              onChange={emailChange}
              placeholder="이메일를 입력하세요."
            />
          </div>

          <div className={styles.signup_btn}>
            <input
              type="submit"
              value="회원가입"
              className={styles.submit}
              onClick={() => {
                submit();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
