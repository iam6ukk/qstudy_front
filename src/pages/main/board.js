import { useCallback, useState, useRef } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import styles from "./css/board.module.css";
import GroupList from "../../components/group/myGroupList";

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
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
const Board = () => {
  const [today, setToday] = useState(new Date());

  return (
    <div className={styles.board_container}>
      <div className={styles.board_sub}>
        <div className={styles.board_todo}>
          <label>내 할일</label>
          <textarea name="todo"></textarea>
        </div>
        <div className={styles.board_calendar}>
          <CalendarBox>
            <StyleCalendar locale="en" value={today} />
          </CalendarBox>
        </div>
      </div>
      <div className={styles.board_groups}>
        <lael>스터디 그룹 목록</lael>
        <GroupList></GroupList>
      </div>
    </div>
  );
};

export default Board;
