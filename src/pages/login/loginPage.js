import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleButton from "../../components/google.js"
import GithubButton from "../../components/github.js"

import styles from './css/login.module.css'
import { useCookies } from 'react-cookie';

const LoginPage = () => {
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    const codeCheck = async (location) => {

        let params = new URLSearchParams(location.search);
        let code = params.get("code");
        if(code === null) return;

        let response = await fetch(`${process.env.REACT_APP_DEV_PATH}/login/github?code=${code}`, {
            method: "GET"
        });
        let json = await response.json();
        const time = 3600; //1시간
        const expiration = new Date(Date.now() + time * 1000);

        setCookie("login", {
            id: json.id,
            picture: json.avatar_url,
            nickname: json.login,
            email: json.email
        }, {
            path: "/",
            expires: expiration
        })
        console.log("Setup Cookie");
        navigate("/main/all")
    }

    useEffect(() => {
      codeCheck(window.location)
    }, [])

    return (
        <div className={styles.login_container}>
            
            <div className={styles.login_form}>
                <div className={styles.basic_wrap}>
                    <div className={styles.login_input}>
                        <label>ID</label>
                        <input type="id" value="id"/>
                    </div>
                    <div className={styles.login_input}>
                        <label>Password</label>
                        <input type="password" value="password" />
                    </div>
                    
                    <div className={styles.sign_wrap}>
                        <input type="submit" value="로그인" className={styles.submit}/>
                        <input type="submit" value="회원가입" className={styles.submit} onClick={() => {navigate('/signup')}}/>
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