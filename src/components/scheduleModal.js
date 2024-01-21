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

const scheduleModal = () => {
  return (
    <div className={styles.scheduler_container}>
      <div className={styles.title_wrap}>
        <input type="text"></input>
        <Space direction="vertical" size={12}>
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChange}
            onOk={onOk}
          />
        </Space>
      </div>
      <div className={styles.etc_wrap}>
        <div className={styles.group_select}>
          <span>분류</span>
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
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
        </div>
      </div>
    </div>
  );
};

export default scheduleModal;
