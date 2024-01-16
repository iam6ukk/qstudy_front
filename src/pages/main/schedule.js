import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "./css/schedule.module.css";

export const CalendarBox = styled(Calendar)`
  border: none;
  border-radius: 5px;
  width: auto;
  height: 800px;

  // 달력 오늘 표시
  .react-calendar__tile--now {
    background: #a4c3b2;
    border-radius: 100px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #a4c3b2;
    border-radius: 100px;
  }

  // 달력 년/월
  .react-calendar__navigation__label > span {
    font-size: 18px;
    font-weight: bold;
  }

  // 요일
  .react-calendar__month-view__weekdays {
    abbr {
      /*월,화,수... 글자 부분*/
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
    }
  }

  // day 타일
  .react-calendar__tile {
    height: 130px;
    font-size: 16px;
  }

  // day 타일 hover, focus
  .react-calendar__tile:enabled:hover {
    background-color: #dee2e6;
    border-radius: 100px;
  }
  .react-calendar__tile:enabled:focus {
    background-color: #a4c3b2;
    border-radius: 100px;
  }

  // 날짜 선택시, day 타일
  .react-calendar__tile--active {
    color: #fff;
    background-color: #a4c3b2;
    border-radius: 100px;
  }
`;

const Schedule = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.schedule_conatiner}>
      <CalendarBox
        onChange={onChange}
        value={value}
        formatDay={(local, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
      />
    </div>
  );
};

export default Schedule;
