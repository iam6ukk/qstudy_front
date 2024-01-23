import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Board from "./all";
import styled from "./css/mainPage.module.css"; 
import My from "./my";
import Schedule from "./schedule";
import { useCookies } from "react-cookie";

const MainPage = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const time = 3600; //1시간
    const expiration = new Date(Date.now() + time * 1000);

    //로그인 체크 (추후 개발)
    useEffect(() => {
        //쿠키가 존재하지 않을 때
        if(cookies["login"] === undefined) {
            alert("로그인이 필요합니다");
            //navigate('/login')
            //개발용 임시 설정
             setCookie("login", {
                id: "tester",
                token: "abcd1234"
            }, {
                path: "/",
                expires: expiration 
            })
        } else {
            //id 유효성 체크 필요
           
        }

    }, [])

    return (
        <div className={styled.main_container}>
            <div className={styled.main_menu}>
                <Header></Header>
                
                <div className={styled.routes}>
                    <Routes>
                        <Route path="/" element={<Board/>}/>
                        <Route path="/all" element={<Board/>}/>
                        <Route path="/my" element={<My/>}/>
                        <Route path="/schedule" element={<Schedule/>}/>
                        
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default MainPage;