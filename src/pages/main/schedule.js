import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "./css/schedule.module.css";

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
    height: 30px;
    width: 30px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
    position: absolute;
    top: 10px;
    left: 43px;
  }

  



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
  //전체 데이즈
  .react-calendar__viewContainer {
    overflow: auto;
    height: 90%;

    &::-webkit-scrollbar {
    width: 4px;  /* 스크롤바의 너비 */
  }

    &::-webkit-scrollbar-thumb {
        height: 30%; /* 스크롤바의 길이 */
        background: #a4c3b2; /* 스크롤바의 색상 */
        
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, .1);  /*스크롤바 뒷 배경 색상*/
    }
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
    
    transition: 0.3s;
    height: 130px;
    font-size: 16px;
  }

  // day 타일 hover, focus
  .react-calendar__tile:enabled:hover {
    transition: 0.3s;
    background-color: #dee2e6;
    border-radius: 100px;
  }
  .react-calendar__tile:enabled:focus {
    transition: 0.3s;
    background-color: #a4c3b2;
    border-radius: 100px;
  }

  // 날짜 선택시, day 타일
  .react-calendar__tile--active {
    transition: 0.3s;
    color: #fff;
    background-color: #a4c3b2;
    border-radius: 100px;
  }
`;
const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const Schedule = () => {
  const [value, onChange] = useState(new Date());
  let mark = [
    new Date()
  ]
  return (
    <div className={styles.schedule_conatiner}>
      <CalendarBox
        onChange={onChange}
        value={value}
        formatDay={(local, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          let html = [];
          // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
          if (mark.find((x) => dateToString(x) === dateToString(date))) {
            html.push(<div className="dot_container"><div className="dot"></div></div>);
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
