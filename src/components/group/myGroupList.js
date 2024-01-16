import { useRecoilState } from "recoil";
import GroupCard from "./groupCard";
import { groupInfoState } from "../../recoil/group/group_state";
import styled from "./css/group.module.css";
//리코일

const GroupList = () => {
    const [list, setList] = useRecoilState(groupInfoState);
    
    return (
        <div className={styled.mygroup}>
            <div className={styled.filter}>
                <input placeholder="제목 입력" className={styled.input}></input>
                <button className={styled.btn}>검색</button>
            </div>
            <div className={styled.group_list}>
            {
                list.map((item) => {
                    return (
                        <GroupCard item={item}/>
                    )
                })
            }
            </div>
        </div>
    )
}

export default GroupList;