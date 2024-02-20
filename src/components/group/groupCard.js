import { useState, useRef, useEffect } from "react";
import styled from "./css/group.module.css";
import { useNavigate } from "react-router-dom";
import "./css/groupGlobal.css";
import Crown from "../../assets/crown.png";
import { useCookies } from "react-cookie";

const GroupCard = ({ item, url, openModal, setOpenModal, setData }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [myId, setMyId] = useState("");
  const showModal = () => {
    if (url === "my") {
      navigate("/main/my/group", {
        state: { groupId: item.group_id, writer: item.writer },
      });
    } else if (url === "all") {
      setOpenModal(true);
      setData(item);
    }
  };

  useEffect(() => {
    if (cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }
    setMyId(cookies["login"].id);
    console.log("ITEM : ", item);
  }, []);

  const mouseMove = (e) => {};
  return (
    <div
      id={item.group_id}
      className={styled.group_card_container}
      onClick={showModal}
      onMouseMove={mouseMove}
    >
      <div className={styled.title}>{item.title}</div>
      <div className={styled.contents}>{item.memo}</div>
      <div className={styled.total}>참여 인원 : {item.total}명</div>
      <div className={styled.writer}>작성자 : {item.nickname}</div>
      {item.writer.toString() === myId.toString() ? (
        <div className={styled.crown}>
          <img src={Crown}></img>
        </div>
      ) : (
        <></>
      )}
      <div
        className={styled.color}
        style={{ backgroundColor: item.color }}
      ></div>
    </div>
  );
};

export default GroupCard;
