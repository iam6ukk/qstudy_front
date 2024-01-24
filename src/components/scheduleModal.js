import React from "react";
import styles from "./css/scheduleModal.module.css";

import { DatePicker, Space } from "antd";
import { Select } from "antd";
const { RangePicker } = DatePicker;

// 일자, 시간 선택
const onChange = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};
const onOk = (value) => {
  console.log("onOk: ", value);
};

const scheduleModal = ({ setOpenModal }) => {
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
              options={[
                {
                  value: "1",
                  label: "C언어 우웩",
                },
                {
                  value: "2",
                  label: "세상안녕 언제까지해",
                },
                {
                  value: "3",
                  label: "코딩 싫어요",
                },
              ]}
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
      <div className={styles.scheduler_block}></div>
    </>
  );
};

export default scheduleModal;
