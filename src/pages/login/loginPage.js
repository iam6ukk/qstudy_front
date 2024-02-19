import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../../components/google.js";
import GithubButton from "../../components/github.js";

import styles from "./css/login.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { userPicture } from "../../recoil/user/user_state.js";
import { useRecoilState } from "recoil";

const LoginPage = () => {
  const [cookies, setCookie] = useCookies();
  const [pictureState, setPictureState] = useRecoilState(userPicture);
  const [id, setId] = useState();
  const [pwd, setPwd] = useState();
  const navigate = useNavigate();

  const idChange = (e) => {
    setId(e.target.value);
  };
  const pwdChange = (e) => {
    setPwd(e.target.value);
  };
  const codeCheck = async (location) => {
    let params = new URLSearchParams(location.search);
    let code = params.get("code");
    if (code === null) return;

    let response = await fetch(
      `${process.env.REACT_APP_DEV_PATH}/login/github?code=${code}`,
      {
        method: "GET",
      }
    );
    let json = await response.json();
    const time = 3600; //1시간
    const expiration = new Date(Date.now() + time * 1000);

    setCookie(
      "login",
      {
        id: json.id,
        picture: json.avatar_url,
        nickname: json.login,
        email: json.email,
        sso: "github"
      },
      {
        path: "/",
        expires: expiration,
      }
    );
    console.log("Setup Cookie");
    navigate("/main/all");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      logIn();
    }
  };

  const cookieSetup = (res) => {
    const time = 3600; //1시간
    const expiration = new Date(Date.now() + time * 1000);
    console.log("LOGIN SUCCESS : ", res);

    setCookie(
      "login",
      {
        id: res.id,
        picture: null,
        nickname: res.nickname,
        email: res.email,
        sso: "normal"
      },
      {
        path: "/",
        expires: expiration,
      }
    );
    setPictureState(res.picture);
  }

  async function logIn() {
    try {
      const loginData = {
        id: id,
        password: pwd,
      };
      axios.post("http://localhost:8080/login", loginData).then((response) => {
        console.log(response.data);

        let res = response.data[0];

        if (res.id === undefined) {
          // id가 일치하지 않은 경우
          console.log("아이디 불일치");
          alert("입력하신 아이디가 일치하지 않습니다.");
        } else if (res.pwd === null) {
          // id는 일치하지만, pwd가 일치하지 않은 경우
          // id가 일치하지 않은 경우
          console.log("패스워드 불일치");
          alert("입력하신 비밀번호가 일치하지 않습니다.");
        } else if (res.id === id) {
          // id, pwd가 모두 일치한 경우
          console.log("로그인 성공");
         
          cookieSetup(res);
          //로그인 쿠키 설정
         
          console.log("Setup Cookie");
          navigate("/main/all");
        }
      });
    } catch (e) {
      console.log("error: ", e);
    }
  }

  useEffect(() => {
    codeCheck(window.location);
  }, []);

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form}>
        <div className={styles.basic_wrap}>
          <div className={styles.login_input}>
            <label>ID</label>
            <input type="id" onChange={idChange} onKeyUp={handleKeyPress} />
          </div>
          <div className={styles.login_input}>
            <label>Password</label>
            <input
              type="password"
              onChange={pwdChange}
              onKeyUp={handleKeyPress}
            />
          </div>

          <div className={styles.sign_wrap}>
            <input
              type="submit"
              value="로그인"
              className={styles.submit}
              onClick={() => {
                logIn();
              }}
            />
            <input
              type="submit"
              value="회원가입"
              className={styles.submit}
              onClick={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>

        <div className={styles.sso_wrap}>
          <GoogleButton />
          <GithubButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
