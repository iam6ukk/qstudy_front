import { useRecoilState } from "recoil";
import GroupCard from "./groupCard";
import { groupInfoState } from "../../recoil/group/group_state";
import styled from "./css/group.module.css";
import GroupAddModal from "./groupAddModal.js";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
//리코일

const GroupList = () => {
    const [list, setList] = useRecoilState(groupInfoState);
    const [data, setData] = useState({});
    const [openModal, setOpenModal] = useState(false);

    let params = useParams();
    let [url, setUrl] = useState(null);
    useEffect(() => {
        params = params["*"];
        setUrl(params);
    }, [])
    
    
    return (
        <>
            <div className={styled.mygroup}>
                {url === "all" && openModal ? (
                    <GroupAddModal setOpenModal={setOpenModal} data={data} />
                ) : null}
                <div className={styled.filter}>
                    <div className={styled.groupAllTitle}>
                        {url === "all" ? "모두의 스터디":"나의 스터디"}
                    </div>
                    <div className={styled.groupAllSearch}>
                        <input placeholder="제목 입력" className={styled.input}></input>
                        <button className={styled.btn}>검색</button>    
                    </div>
                    <div className={styled.search_number}>검색 결과 <b>{list.length}</b>건</div>
                </div>
                <div className={styled.group_list}>
                {
                    list.map((item) => {
                        return (
                            <GroupCard item={item} openModal={openModal} setOpenModal={setOpenModal} setData={setData}/>
                        )
                    })
                }
                </div>
            </div>
        </>
       
    )
}

export default GroupList;