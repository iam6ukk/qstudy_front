import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "./css/schedule.module.css";
import ScheduleModal from "../../components/scheduleModal";

export const CalendarBox = styled(Calendar)`
  border: none;
  border-radius: 5px;
  width: auto;
  margin-top: 30px;
  transition: 0.3s;
  height: 90%;
  //전체 컨테이너

  .dot_container {
    position: relative;
  }
  .dot {
    height: 15px;
    width: 15px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 15px;
    left: 50px;
  }

  // 달력 네비게이션 섹션
  .react-calendar__navigation {
    height: 80px;
  }
  .react-calendar__navigation__label > span {
    font-size: 22px;
  }
  .react-calendar__navigation__prev-button {
    width: 100px;
    font-size: 24px;
    margin-left: 1.4%;
  }
  .react-calendar__navigation__next-button {
    width: 100px;
    font-size: 24px;
    margin-right: 1.4%;
  }

  // 달력 섹션
  .react-calendar__viewContainer {
    overflow: auto;
    height: 90%;
  }
  .react-calendar__month-view {
    height: 100%;
  }
  .react-calendar__month-view > div {
    height: 100%;
  }
  .react-calendar__month-view > div > div {
    height: 100%;
  }
  .react-calendar__month-view__days {
    height: 80%;
  }

  // 주간
  .react-calendar__month-view__weekdays {
    abbr {
      /*월,화,수... 글자 부분*/
      font-size: 18px;
      font-weight: 500;
      text-decoration: none;
    }
  }

  // 요일
  .react-calendar__tile {
    font-size: 18px;
    font-weight: 500;
    transition: 0.3s;
  }

  // 오늘 일자
  .react-calendar__tile--now {
    background: #fff;
    abbr {
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
      padding: 10px;
    }
  }

  // 요일 hover, focus
  .react-calendar__tile:enabled:hover {
    transition: 0.3s;
    background: #fff;

    abbr {
      background: #dee2e6;
      color: #000;
      border-radius: 10px;
      padding: 10px;
    }
  }
  .react-calendar__tile:enabled:focus {
    transition: 0.3s;
    background-color: #fff;

    abbr {
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
      padding: 10px;
    }
  }

  // 요일 선택시
  .react-calendar__tile--active {
    background-color: #fff;

    abbr {
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
      padding: 10px;
    }
  }
`;
const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const Schedule = () => {
  const [value, onChange] = useState(new Date());
  let mark = [new Date()];

  return (
    <div className={styles.schedule_conatiner}>
      <ScheduleModal />
      <CalendarBox
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        calendarType={"US"}
        formatDay={(local, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileContent={({ date, view }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => dateToString(x) === dateToString(date))) {
            html.push(
              <div className="dot_container">
                <div className="dot"></div>
              </div>
            );
          }
          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className="flex justify-center items-center absoluteDiv">
                {html}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default Schedule;
