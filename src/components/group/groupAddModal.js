import React, { useEffect, useRef, useState } from "react";
import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { ColorPicker, theme } from "antd";
import styles from "./css/groupAddMoal.module.css";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { groupInfoState } from "../../recoil/group/group_state";
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const GroupAddModal = ({ setOpenModal, data }) => {
  const { token } = theme.useToken();
  const [color, setColor] = useState("#1677ff");
  const [cookies, setCookie] = useCookies();
  let [list, setList] = useRecoilState(groupInfoState);

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  const submit = async () => {
    setOpenModal(false);
    try { 
      await fetch(`http://localhost:8080/group/attend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: cookies["login"].id.toString(),
        group_id: data.group_id,
        color: color
      })
    });

    alert(`[${data.title}] 참가되었습니다`);
    
    const response = await fetch(`http://localhost:8080/group/all?id=${cookies["login"].id}`);
    const groupList = await response.json();
    setList(groupList);

    } catch(error) {
      alert("오류가 발생했습니다.");
    }
  }

  const RGBtoHex = (r, g, b) => {
    const toHex = (c) => {
      const hex = c.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
  };

  const colorChange = (color_) => {
    let color_code = color_.metaColor;
    let a = Math.floor(color_code.a);
    let r = Math.floor(color_code.r);
    let g = Math.floor(color_code.g);
    let b = Math.floor(color_code.b);

    setColor(RGBtoHex(r, g, b));
  }

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
            <ColorPicker presets={presets} defaultValue="#1677ff" onChange={(color) => {colorChange(color)}}/>
          </div>
          <p className={styles.group_title}>{data.title}</p>
        </div>
        <div className={styles.content2}>
          <textarea>{data.memo}</textarea>
        </div>
      </div>
      <div className={styles.ok_btn}>
        <button onClick={() => submit()}>확인</button>
      </div>
    </div>
    <div className={styles.group_block} ref={outside}></div>
    </>
    
  );
};

export default GroupAddModal;
