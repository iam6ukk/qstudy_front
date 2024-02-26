import { Link, useParams } from "react-router-dom";
import styles from "./css/header.module.css";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import Meeting from "../assets/meeting.png";
import Sociology from "../assets/sociology.png";
import { useCookies } from "react-cookie";

export const CalendarBox = styled.div`
  position: absolute;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 200px;
  width: 258px;
`;

export const StyleCalendar = styled(Calendar)`
  border-radius: 5px;
  padding: 20px;
  .react-calendar__navigation {
    display: flex;

    height: 24px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 24px;
    background-color: none;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.15em;
  }
  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: #797979;
    border-radius: 5px;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: #797979;
  }

  .react-calendar__tile--active {
    color: #ffffff;
    border-radius: 7px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #6a6a6a;
  }
`;

const Header = () => {
  const [today, setToday] = useState(new Date());
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  let url = params['*'].split("/")[0];
  const [click, setClick] = useState(url);


  const logout = (e) => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      alert("로그아웃 되었습니다.");
      removeCookie("login");
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.header_container}>
      <div style={{ marginTop: "20px" }}></div>

      <Link
        to={"/main/all"}
        onClick={() => {
          setClick("all");
        }}
      >
        <div
          className={
            click === "all" ? styles.header_btn_active : styles.header_btn
          }
        >
          <span>전체 그룹</span>
        </div>
      </Link>

      <div style={{ marginTop: "20px" }}></div>

      <Link
        to={"/main/my"}
        onClick={() => {
          setClick("my");
        }}
      >
        <div
          className={
            click === "my" ? styles.header_btn_active : styles.header_btn
          }
        >
          <span>내 그룹</span>
        </div>
      </Link>

      <div style={{ marginTop: "20px" }}></div>

      <Link
        to={"/main/schedule"}
        onClick={() => {
          setClick("schedule");
        }}
      >
        <div
          className={
            click === "schedule" ? styles.header_btn_active : styles.header_btn
          }
        >
          <span>내 일정관리</span>
        </div>
      </Link>
      <div style={{ marginTop: "20px" }}></div>

      <Link
        to={"/main/mypage"}
        onClick={() => {
          setClick("mypage");
        }}
      >
        <div
          className={
            click === "mypage" ? styles.header_btn_active : styles.header_btn
          }
        >
          <span>마이 페이지</span>
        </div>
      </Link>
      <div style={{ marginTop: "20px" }}></div>

      <Link to={"/login"} onClick={logout}>
        <div
          className={
            click === "logout" ? styles.header_btn_active : styles.header_btn
          }
        >
          <span>로그아웃</span>
        </div>
      </Link>

      <CalendarBox>
        <StyleCalendar locale="en" value={today} />
      </CalendarBox>
    </div>
  );
};

export default Header;
