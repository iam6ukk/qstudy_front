import { Link } from "react-router-dom";
import styles from "./css/header.module.css";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useState } from "react";


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

    
    return (
        <div className={styles.header_container}>
            <div style={{marginTop: "20px"}}></div>

            <Link to={"/main/all"}>
                <div className={styles.header_btn}>
                    전체 그룹
                </div></Link>

            <div style={{marginTop: "20px"}}></div>

            <Link to={"/main/my"}>
                <div className={styles.header_btn}>
                    내 그룹
                </div>
            </Link>

            <div style={{marginTop: "20px"}}></div>
            
            <Link to={"/main/schedule"}>
                <div className={styles.header_btn}>
                    내 일정관리
                </div>
            </Link>

            
            <div className={styles.board_todo}>
                <label>내 할일</label>
                <textarea name="todo"></textarea>
            </div>


            <CalendarBox>
                <StyleCalendar locale="en" value={today} />
            </CalendarBox>
            
        </div>
    )
}

export default Header;