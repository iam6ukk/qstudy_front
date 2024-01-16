import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Board from "./board";
import styled from "./css/mainPage.module.css"; 
import My from "./my";
import Schedule from "./schedule";

const MainPage = () => {
    const navigate = useNavigate();

    //로그인 체크 (추후 개발)
    useEffect(() => {

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