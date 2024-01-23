import { useState, useRef, useEffect } from "react";
import styled from "./css/group.module.css";
import GroupAddModal from "./groupAddModal.js";

const GroupCard = ({ item }) => {
  console.log(item);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const showModal = () => {
    setOpenModal(true);
    setData(item);
  };

  const outside = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (outside.current && !outside.current.contains(e.target)) {
        setOpenModal(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [outside]);

  return (
    <div ref={outside}>
      {openModal ? (
        <GroupAddModal setOpenModal={setOpenModal} data={data} />
      ) : null}
      <div className={styled.group_card_container} onClick={showModal}>
        <div className={styled.title}>{item.title}</div>
        <div className={styled.contents}>{item.memo}</div>
        <div className={styled.writer}>작성자 : {item.writer}</div>
      </div>
    </div>
  );
};

export default GroupCard;
