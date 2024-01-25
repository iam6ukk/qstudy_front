import { useState, useRef, useEffect } from "react";
import styled from "./css/group.module.css";

const GroupCard = ({ item ,openModal, setOpenModal, setData}) => {
  console.log(item);
  
  const showModal = () => {
    setOpenModal(true);
    setData(item);
  };

  return (
    <div className={styled.group_card_container} onClick={showModal}>
      <div className={styled.title}>{item.title}</div>
      <div className={styled.contents}>{item.memo}</div>
      <div className={styled.writer}>작성자 : {item.writer}</div>
    </div>
  );
};

export default GroupCard;
