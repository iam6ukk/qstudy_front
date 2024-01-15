import { useRecoilState } from "recoil";
import GroupCard from "./groupCard";
import { groupInfoState } from "../../recoil/group/group_state";

//리코일

const GroupList = () => {
    const [list, setList] = useRecoilState(groupInfoState);
    
    return (
        <div>
            {
                list.map((item) => {
                    return (
                        <GroupCard item={item}/>
                    )
                })
            }
        </div>
    )
}

export default GroupList;