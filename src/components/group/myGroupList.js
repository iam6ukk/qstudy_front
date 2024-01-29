import { useRecoilState } from "recoil";
import GroupCard from "./groupCard";
import { groupInfoState, groupMinusState } from "../../recoil/group/group_state";
import styled from "./css/group.module.css";
import GroupAddModal from "./groupAddModal.js";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GroupSchedule from "../../pages/main/groupSchedule";
import axios from "axios";
import { useCookies } from "react-cookie";
//리코일

const GroupList = () => {
  const [list, setList] = useRecoilState(groupInfoState);
  const [data, setData] = useState({});
  const [minus, setMinuse] = useRecoilState(groupMinusState);
  const [openModal, setOpenModal] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [inputData, setInputData] = useState("");

  let params = useParams();
  let [url, setUrl] = useState(null);
  useEffect(() => {
    setMinuse(0);
    params = params["*"];
    setUrl(params);
  }, []);

  function calculateMatchingPercentage(str1, str2) {
    // 유니코드 문자열을 정규화
    const normalizedStr1 = str1.normalize('NFC');
    const normalizedStr2 = str2.normalize('NFC');

    // 각 문자열을 문자 배열로 변환
    const arr1 = Array.from(normalizedStr1);
    const arr2 = Array.from(normalizedStr2);

    // 두 배열 중에서 더 긴 배열의 길이를 구합니다.
    const maxLength = Math.max(arr1.length, arr2.length);

    // 일치하는 문자의 개수를 계산합니다.
    let matchingCount = 0;
    for (let i = 0; i < maxLength; i++) {
        if (arr1[i] === arr2[i]) {
            matchingCount++;
        }
    }

    // 일치하는 비율을 계산하여 백분율로 반환합니다.
    const matchingPercentage = (matchingCount / maxLength) * 100;
    return matchingPercentage;
}

  async function group(id) {
    const response = await axios.get(`http://localhost:8080/group/all?id=${id}`);
    return response.data;
  }

  async function myGroup(id) {
    const response = await axios.get(`http://localhost:8080/group/my?id=${id}`);
    return response.data;
  }

  const navigate = useNavigate();
  const search = async () => {
    let response = [];
    if(cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigate('/login')
      return;
    }
    let id = cookies["login"].id;

    if(url === "all") {
      response = await group(id);
    } else {
      response =  await myGroup(id);
    }
    console.log("RES : ", response);
    if(inputData === "") {
      setList(response);
    }  else {
      let filter = response.filter((prev) => calculateMatchingPercentage(prev.title, inputData) >= 60 || prev.title.includes(inputData))
      setList(filter);
    }
  }

  return (
    <>
      <div className={styled.mygroup}>
        {url === "all" && openModal ? (
          <GroupAddModal setOpenModal={setOpenModal} data={data} />
        ) : null}
        <div className={styled.filter}>
          <div className={styled.groupAllTitle}>
            {url === "all" ? "모두의 스터디" : "나의 스터디"}
          </div>
          <div className={styled.groupAllSearch}>
            <input placeholder="제목 입력" value={inputData} onChange={(e) => {setInputData(e.target.value)}} onKeyUp={(e) => {
              if(e.key === "Enter") {
                search();
              } 
            }} 
            className={styled.input}></input>
            <button className={styled.btn} onClick={() => {search()}}>검색</button>
          </div>
          <div className={styled.search_number}>
            검색 결과 <b>{list.length - minus}</b>건
          </div>
        </div>
        <div className={styled.group_list}>
          {list.map((item) => {
            return (
              <GroupCard
                item={item}
                url={url}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setData={setData}
              />
            );
          })}
        </div>
      </div>
      <div>{url === "my" ? <></> : null}</div>
    </>
  );
};

export default GroupList;
