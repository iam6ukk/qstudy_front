import React from "react";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { ColorPicker, theme } from "antd";
import styles from "./css/groupAddMoal.module.css";
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const groupAddModal = ({ setOpenModal, data }) => {
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });
  return (
    <div className={styles.add_container}>
      <button
        className={styles.close_btn}
        onClick={() => setOpenModal(false)}
      ></button>
      <div className={styles.title_wrap}>
        <p>참여하시겠습니까?</p>
      </div>
      <div className={styles.content_wrap}>
        <div className={styles.content1}>
          <div className={styles.group_color}>
            <ColorPicker presets={presets} defaultValue="#1677ff" />
          </div>
          <p className={styles.group_title}>{data.title}</p>
        </div>
        <div className={styles.content2}>
          <textarea>{data.memo}</textarea>
        </div>
      </div>
      <div className={styles.ok_btn}>
        <button onClick={() => setOpenModal(false)}>확인</button>
      </div>
    </div>
  );
};

export default groupAddModal;
