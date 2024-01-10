import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleButton from "../../components/google.js"
import GithubButton from "../../components/github.js"

import styles from './css/login.module.css'

const LoginPage = () => {

    const navigate = useNavigate();

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