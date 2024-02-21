import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import Calendar from "react-calendar";
import { useLocation, useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import styles from "./css/schedule.module.css";
import styles2 from "./css/groupSchedule.module.css";
import ScheduleModal from "../../components/scheduleModal";
import dayjs from "dayjs";
import moment from "moment";
import GroupMember from "../../components/group/groupMember";

export const CalendarBox = styled(Calendar)`
  border: none;
  border-radius: 5px;
  width: auto;
  margin-top: 30px;
  transition: 0.3s;
  height: 85%;
  //전체 컨테이너

  .dot_container {
    background-color: white;
    margin-bottom: 5px;
    position: relative;
    display: flex;
    flex-direction: row;
    border: 1px solid lightgray;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;

    width: 90%;
  }
  .dot {
    margin-left: 10px;
    margin-top: 6px;
    height: 15px;
    min-width: 15px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .plus_container {
    position: absolute;
    top: -30px;
    left: 2px;
  }

  .plus {
    background-color: #a0d468;
    width: 20px;
    height: 20px;
    color: white;
    border-radius: 5px;
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
    position: relative;

    abbr {
      transition: 0.3s;
      display: block;
      position: absolute;
      top: 5px;
      left: calc(50% - 15px);
      line-height: 30px;
      width: 30px;
      height: 30px;
    }
  }

  // 오늘 일자
  .react-calendar__tile--now {
    background: #fff;
    abbr {
      display: block;
      position: absolute;
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
    }
  }

  // 요일 hover, focus
  .react-calendar__tile:enabled:hover {
    transition: 0.3s;
    background: #fff;

    abbr {
      display: block;
      position: absolute;
      background: #dee2e6;
      color: #000;
      border-radius: 10px;
    }
  }
  .react-calendar__tile:enabled:focus {
    transition: 0.3s;
    background-color: #fff;

    abbr {
      display: block;
      position: absolute;
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
    }
  }

  // 요일 선택시
  .react-calendar__tile--active {
    background-color: #fff;

    abbr {
      display: block;
      position: absolute;
      background: #a4c3b2;
      color: #fff;
      border-radius: 10px;
    }
  }
`;
const dateToString = (date) => {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const GroupSchedule = () => {
  const [value, onChange] = useState(new moment());
  const outside = useRef(null);
  let [cookies, setCookie] = useCookies();
  const [userId, setUserId] = useState();
  const navigation = useNavigate();
  const state = useLocation().state;
  const groupId = state.groupId;
  const writer = state.writer;

  let mark = [new Date()];
  const [eventList, setEventList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const showMember = () => {
    setOpenMember(true);
  };

  const studyQuit = () => {
    if (window.confirm("스터디에서 나가시겠습니까?")) {
      alert("스터디에서 나가셨습니다.");
      deleteGroupMember();
    }
  };
  const studyRemove = () => {
    if (window.confirm("스터디를 삭제하시겠습니까?")) {
      alert("스터디를 삭제하셨습니다.");
      deleteGroup();
    }
  };

  useEffect(() => {
    if (cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigation("/login");
      return;
    }
    let id = cookies["login"].id;
    setUserId(id);

    getEventList(id);
    console.log("스터디 방장: ", writer);
  }, []);

  // 이벤트 조회
  async function getEventList(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/calendar/my?id=${id}`
      );
      console.log("내 일정: ", response.data);
      setEventList(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  // 스터디원 삭제
  async function deleteGroupMember() {
    axios.delete("http://localhost:8080/group/attend/member/delete", {
      data: {
        group_id: groupId,
        user_id: userId,
      },
    });
  }

  // 스터디 삭제
  async function deleteGroup() {
    axios.delete(process.env.REACT_APP_DEV_PATH + "/group/delete", {
      data: {
        group_id: groupId,
      },
    });
  }

  return (
    <div className={styles.schedule_conatiner} ref={outside}>
      <div className={styles2.schedule_btns}>
        <button
          className={styles2.prev_btn}
          onClick={() => navigation("/main/my")}
        >
          {"<"} 이전
        </button>
        <div>
          {userId == writer ? (
            <button className={styles2.quit_btn} onClick={() => studyRemove()}>
              스터디 삭제
            </button>
          ) : (
            <button className={styles2.quit_btn} onClick={() => studyQuit()}>
              스터디 나가기
            </button>
          )}
          <button className={styles2.member_btn} onClick={showMember}>
            참여인원
          </button>
          {openMember ? (
            <GroupMember
              userId={userId}
              setOpenMember={setOpenMember}
              groupId={groupId}
              writer={writer}
              deleteGroupMember={deleteGroupMember}
            />
          ) : null}
        </div>
      </div>

      {openModal ? (
        <ScheduleModal
          getEventList={getEventList}
          date={dayjs(value)}
          setOpenModal={setOpenModal}
          groupId={groupId}
        />
      ) : null}
      <CalendarBox
        onChange={onChange}
        onClickDay={showModal}
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
          // 날짜, 그룹 비교 => 해당 색상으로 스타일 변경??
          eventList?.map((item) => {
            if (
              new Date(item.start_date).setHours(0, 0, 0, 0) <=
                new Date(date) &&
              new Date(item.end_date).setHours(0, 0, 0, 0) >= new Date(date) &&
              groupId === item.group_id
            ) {
              if (html.length == 2) {
                html.push(
                  <div className="plus_container">
                    <div className="plus">+</div>
                  </div>
                );
              } else if (html.length < 2) {
                html.push(
                  <div className="dot_container">
                    <div
                      className="dot"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="text">{item.title}</div>
                  </div>
                );
              }
            }
          });

          // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
          return (
            <>
              <div className={styles.schedule_dot_container}>{html}</div>
            </>
          );
        }}
      />
    </div>
  );
};

export default GroupSchedule;
