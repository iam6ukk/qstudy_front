import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Board from "./all";
import styled from "./css/mainPage.module.css";
import My from "./my";
import Schedule from "./schedule";
import { useCookies } from "react-cookie";
import GroupSchedule from "./groupSchedule";
import MyPage from "./mypage";

const MainPage = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const time = 3600; //1시간
  const expiration = new Date(Date.now() + time * 1000);

  //로그인 체크 (추후 개발)
  useEffect(() => {}, []);

  return (
    <div className={styled.main_container}>
      <div className={styled.main_menu}>
        <Header></Header>

        <div className={styled.routes}>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/all" element={<Board />} />
            <Route path="/my" element={<My />} />
            <Route path="/my/group" element={<GroupSchedule />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/mypage" element= {<MyPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
