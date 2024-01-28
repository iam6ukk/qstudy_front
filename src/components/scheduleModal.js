import React, { useEffect, useRef, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import styles from "./css/scheduleModal.module.css";

import { DatePicker, Space } from "antd";
import { Select } from "antd";
import axios from "axios";
import { async } from "q";
const { RangePicker } = DatePicker;

// 일자, 시간 선택
const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};
const onOk = (value) => {
  console.log("onOk: ", value);
};

const ScheduleModal = ({ setOpenModal, groupId }) => {
  let outside = useRef();
  let [cookies, setCookie] = useCookies();
  const [group, setGroup] = useState([]);
  const [select, setSelect] = useState([]);

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
      setGroup(response.data);
    } catch (error) {
      console.error("error: ", error);
    }
  }
  useEffect(() => {
    let id = cookies["login"].id;
    groupData(id);
    console.log(groupId);
    setSelect(
      groupId === undefined || groupId === ""
        ? group.map((item) => {
            return {
              label: item.title,
              value: item.group_id,
            };
          })
        : group
            .filter((prev) => prev.group_id === groupId)
            .map((item) => {
              return {
                label: item.title,
                value: item.group_id,
              };
            })
    );
  }, [groupId]);

  return (
    <>
      <div className={styles.scheduler_container}>
        <button
          className={styles.close_btn}
          onClick={() => setOpenModal(false)}
        ></button>
        <div className={styles.title_wrap}>
          <input type="text" placeholder="일정을 입력하세요"></input>

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
              options={select}
            />
          </div>
          <div className={styles.memo}>
            <span>메모</span>
            <textarea />
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
