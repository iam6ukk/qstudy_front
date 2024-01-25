import { useState, useRef, useEffect } from "react";
import styled from "./css/group.module.css";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ item, url, openModal, setOpenModal, setData }) => {
  const navigate = useNavigate();
  const showModal = () => {
    if (url === "my") {
      navigate("/main/my/group");
    } else if (url === "all") {
      setOpenModal(true);
      setData(item);
    }
  };

  const mouseMove = (e) => {};

  return (
    <div
      className={styled.group_card_container}
      onClick={showModal}
      onMouseMove={mouseMove}
    >
      <div className={styled.title}>{item.title}</div>
      <div className={styled.contents}>{item.memo}</div>
      <div className={styled.writer}>작성자 : {item.writer}</div>
    </div>
  );
};

export default GroupCard;
