import React, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import styles from "./css/scheduleModal.module.css";

import { DatePicker, Space } from "antd";
import { Select } from "antd";
import axios from "axios";
import { async } from "q";
import { useNavigate } from "react-router-dom";
import { selector } from "recoil";
import moment from "moment";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const ScheduleModal = ({writer, getEventList, date, setOpenModal, groupId }) => {
  let outside = useRef();
  let [cookies, setCookie] = useCookies();
  const [group, setGroup] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [select, setSelect] = useState({});
  const navigation = useNavigate();

  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState(
    date.format("YYYY-MM-DD HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(date.format("YYYY-MM-DD HH:mm:ss"));
  const [memo, setMemo] = useState("");
  const [eventList, setEventList] = useState([]);
  const [groupEventList, setGroupEventList] = useState([]);
  const [userId, setUserId] = useState("");


  // 일자, 시간 선택
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value, typeof value);
    console.log("Formatted Selected Time: ", dateString);
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
    console.log("event title: ", title);
  };
  const memoChange = (e) => {
    setMemo(e.target.value);
    console.log("event memo: ", memo);
  };


  useEffect(() => {
    const handleClick = (e) => {
      const rect = outside.current.getBoundingClientRect();
      const isClickOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (outside.current && isClickOutside) {
        setOpenModal(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [outside]);

  async function getLocalEventList(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/calendar/my?id=${id}`
      );

      const response_group = await axios.get(
        `http://localhost:8080/calendar/my/group?group_id=${groupId}&user_id=${id}`
      );
      console.log("내 일정: ", response.data);
      console.log("다른 일정 : ", response_group.data);
      setEventList(response.data);
      setGroupEventList(response_group.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }
  // 내 그룹 데이터
  async function groupData(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/group/my?id=${id}`
      );
      let groupData = response.data;
      setGroup(groupData);

      let data =
        groupId === undefined || groupId === ""
          ? groupData.map((item) => {
              return {
                label: item.title,
                value: item.group_id,
              };
            })
          : groupData
              .filter((prev) => prev.group_id === groupId)
              .map((item) => {
                return {
                  label: item.title,
                  value: item.group_id,
                };
              });
      setSelectList(data);
      setSelect(data.length === 0 ? {} : data[0]);

      console.log("SELECT : ", data[0]);
    } catch (error) {
      console.error("error: ", error);
    }
  }

  async function eventPost() {
    if (!window.confirm("일정을 등록하시겠습니까?")) {
      return;
    }

    try {
      let id = cookies["login"].id.toString();
      const event = {
        user_id: id,
        group_id: select.value,
        title: title,
        start_date: startDate,
        end_date: endDate,
        memo: memo,
      };
      axios
        .post("http://localhost:8080/calendar/event", event)
        .then((response) => {
          console.log(response);
          alert("저장되었습니다.");
          setOpenModal(false);
          getEventList(id);
        });
    } catch (error) {
      console.error("error: ", error);
    }
  }

  const deleteBtn = async(item) => {
    if(window.confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(process.env.REACT_APP_DEV_PATH + `/calendar/group?id=${item.id}`);
        alert("삭제되었습니다.");
        getLocalEventList(userId);
        getEventList();
      } catch(error) {
        alert("오류가 발생했습니다.");
        console.log("ERROR : ", error);
      }
    }
  }

  useEffect(() => {
    if (cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigation("/login");
      return;
    }
    let id = cookies["login"].id;
    setUserId(id);

    groupData(id);
    getLocalEventList(id);
    
    console.log("그룹 : ", groupId, date);
  }, []);

  return (
    <>
      <div className={styles.scheduler_container}>
        <div className={styles.scheduler_wrap}>
          <div className={styles.scheduler_list}>
            <div className={styles.list_container}>
              <b>내 일정</b>
              <div className={styles.list}>
                {groupId === undefined
                  ? eventList
                      .filter(
                        (prev) =>
                          dayjs(prev.start_date.split(" ")[0]) <= date &&
                          dayjs(prev.end_date.split(" ")[0]) >= date
                      )
                      .map((item) => (
                        <div className={styles.block}>
                          <div
                            className={styles.block_color}
                            style={{ background: item.color }}
                          ></div>
                          <div className={styles.block_title}>{item.title}</div>
                          <div className={styles.closeBtn} onClick={() => {deleteBtn(item)}}>삭제</div>
                        </div>
                      ))
                  : eventList
                      .filter(
                        (prev) =>
                          prev.group_id === groupId &&
                          dayjs(prev.start_date.split(" ")[0]) <= date &&
                          dayjs(prev.end_date.split(" ")[0]) >= date
                      )
                      .map((item) => (
                        <div className={styles.block}>
                          <div
                            className={styles.block_color}
                            style={{ background: item.color }}
                          ></div>
                          <div className={styles.block_title}>{item.title}</div>
                          <div className={styles.closeBtn} onClick={() => {deleteBtn(item)}}>삭제</div>
                        </div>
                      ))}
              </div>

             
            </div>

            <div className={styles.list_container}>
              <b>전체 일정</b>
              <div className={styles.list}>
                  {groupId === undefined
                    ? groupEventList
                        .filter(
                          (prev) =>
                            dayjs(prev.start_date.split(" ")[0]) <= date &&
                            dayjs(prev.end_date.split(" ")[0]) >= date
                        )
                        .map((item) => (
                          <div className={styles.block}>
                            <img className={styles.img} src={item.picture?.length > 400 ? "data:image/png;base64," + item.picture : atob(item.picture)}></img>
                            <div className={styles.block_title}>{item.title}</div>
                            {
                              writer == userId ? (
                                <div className={styles.closeBtn} onClick={() => {deleteBtn(item)}}>삭제</div>
                              ) : (
                                <></>
                              )
                            }
                          </div>
                        ))
                    : groupEventList
                        .filter(
                          (prev) =>
                            prev.group_id === groupId &&
                            dayjs(prev.start_date.split(" ")[0]) <= date &&
                            dayjs(prev.end_date.split(" ")[0]) >= date
                        )
                        .map((item) => (
                          <div className={styles.block}>
                            <img className={styles.img} src={item.picture?.length > 400 ? "data:image/png;base64," + item.picture : atob(item.picture)}></img>
                            <div className={styles.block_title}>{item.title}</div>
                            {
                              writer == userId ? (
                                <div className={styles.closeBtn} onClick={() => {deleteBtn(item)}}>삭제</div>
                              ) : (
                                <></>
                              )
                            }
                          </div>
                        ))}
                </div>
              </div>
            </div>

          <div>
            <div className={styles.modal_close_title}>
              <div className={styles.modal_title}>
                {date.format("YYYY-MM-DD")}
              </div>
              <button
                className={styles.close_btn}
                onClick={() => setOpenModal(false)}
              ></button>
            </div>
            <div className={styles.title_wrap}>
              <input
                onChange={titleChange}
                type="text"
                placeholder="일정을 입력하세요"
              ></input>

              <Space direction="vertical" size={20}>
                <RangePicker
                  defaultValue={[date, date]}
                  showTime={{
                    format: "HH:mm",
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={onChange}
                  onOk={onOk}
                  style={{
                    width: 520,
                    fontSize: "20px",
                  }}
                />
              </Space>
            </div>
            <div className={styles.etc_wrap}>
              <div className={styles.group_select}>
                <span>분류</span>
                <Select
                  showSearch
                  style={{
                    width: 280,
                    height: 40,
                  }}
                  placeholder="그룹 선택"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={selectList}
                  onChange={(item, data) => {
                    setSelect(data);
                    console.log("DATA : ", data);
                  }}
                  value={select}
                />
              </div>
              <div className={styles.memo}>
                <span>메모</span>
                <textarea onChange={memoChange} />
              </div>
              <div className={styles.modal_btn}>
                <button
                  className={styles.ok_btn}
                  onClick={() => {
                    eventPost();
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scheduler_block} ref={outside}></div>
    </>
  );
};

export default ScheduleModal;
