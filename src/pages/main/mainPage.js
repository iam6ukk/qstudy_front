import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Board from "./board";

const MainPage = () => {
    const navigate = useNavigate();

    //로그인 체크 (추후 개발)
    useEffect(() => {

    }, [])

    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Board/>}/>
                <Route path="/board" element={<Board/>}/>
            </Routes>
        </div>
    )
}

export default MainPage;