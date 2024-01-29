import React, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import styles from "./css/scheduleModal.module.css";

import { DatePicker, Space } from "antd";
import { Select } from "antd";
import axios from "axios";
import { async } from "q";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;

const ScheduleModal = ({ setOpenModal, groupId }) => {
  let outside = useRef();
  let [cookies, setCookie] = useCookies();
  const [group, setGroup] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [select, setSelect] = useState({});
  const navigation = useNavigate();

  const [title, setTitle] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [memo, setMemo] = useState("");

  // 일자, 시간 선택
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
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

  // 내 그룹 데이터
  async function groupData(id) {
    try {
      const response = await axios.get(
        `http://localhost:8080/group/my?id=${id}`
      );
      console.log("일정관리 분류: ", response.data);
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
    try {
      const event = {
        user_id: cookies["login"].id.toString(),
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
        });
    } catch (error) {
      console.error("error: ", error);
    }
  }

  useEffect(() => {
    if (cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigation("/login");
      return;
    }
    let id = cookies["login"].id;

    groupData(id);
    eventPost();
  }, []);

  return (
    <>
      <div className={styles.scheduler_container}>
        <button
          className={styles.close_btn}
          onClick={() => setOpenModal(false)}
        ></button>
        <div className={styles.title_wrap}>
          <input
            onChange={titleChange}
            type="text"
            placeholder="일정을 입력하세요"
          ></input>

          <Space direction="vertical" size={20}>
            <RangePicker
              showTime={{
                format: "HH:mm",
              }}
              format="YYYY-MM-DD HH:mm"
              onChange={onChange}
              onOk={onOk}
              style={{
                width: 558,
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
              onClick={() => setOpenModal(false)}
            >
              확인
            </button>
          </div>
        </div>
      </div>
      <div className={styles.scheduler_block} ref={outside}></div>
    </>
  );
};

export default ScheduleModal;
