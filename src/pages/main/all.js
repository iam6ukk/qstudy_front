import { useCallback, useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import styles from "./css/board.module.css";
import GroupList from "../../components/group/myGroupList";
import { useRecoilState } from "recoil";
import { groupInfoState } from "../../recoil/group/group_state";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

const Board = () => {
  const [today, setToday] = useState(new Date());
  let [list, setList] = useRecoilState(groupInfoState);
  let [cookies, setCookie] = useCookies();
  let navigation = useNavigate();
  let params = useParams();

  async function group(id) {
    const response = await fetch(`http://localhost:8080/group/all?id=${id}`);
    const groupList = await response.json();
    setList(groupList);
  }

  useEffect(() => {
    if(params["*"].trim() === "") navigation("/main/all")
    if(cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigation('/login')
      return;
    }
    let id = cookies["login"].id;
    group(id);
  }, []);


  return (
    <>
    <div className={styles.board_container} >
      <div className={styles.board_groups}>
        <GroupList></GroupList>
      </div>
    </div>
    </>
   
  );
};

export default Board;
