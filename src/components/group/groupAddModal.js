import React, { useEffect, useRef } from "react";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { ColorPicker, theme } from "antd";
import styles from "./css/groupAddMoal.module.css";
import { useParams } from "react-router-dom";
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const GroupAddModal = ({ setOpenModal, data }) => {
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });
  const outside = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      const rect = outside.current.getBoundingClientRect();
      const isClickOutside = (
        e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom
      );

      if (outside.current && isClickOutside) {
        setOpenModal(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [outside]);



  return (
    <>
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
    <div className={styles.group_block} ref={outside}></div>
    </>
    
  );
};

export default GroupAddModal;
