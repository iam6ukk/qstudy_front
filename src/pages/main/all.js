import { useCallback, useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import styles from "./css/board.module.css";
import GroupList from "../../components/group/myGroupList";
import { useRecoilState } from "recoil";
import { groupInfoState } from "../../recoil/group/group_state";
import { useCookies } from "react-cookie";

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
  let [list, setList] = useRecoilState(groupInfoState);
  let [cookies, setCookie] = useCookies();

  let id = cookies["login"].id;

  async function group() {
    const response = await fetch(`http://localhost:8080/group/all?id=${id}`);
    const groupList = await response.json();
    console.log(groupList);
    setList(groupList);
  }

  useEffect(() => {
    group();
  }, []);

  return (
    <div className={styles.board_container}>
      <div className={styles.board_groups}>
        <GroupList></GroupList>
      </div>
    </div>
  );
};

export default Board;
