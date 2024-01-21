import { useEffect } from "react";
import GroupList from "../../components/group/myGroupList";
import styles from "./css/board.module.css";
import { groupInfoState } from "../../recoil/group/group_state";
import { useRecoilState } from "recoil";


const My = () => {
    let [list, setList] = useRecoilState(groupInfoState);

    useEffect(() => {
        setList([{
            title: "C언어 우웩",
            contents: "스터디를 참가할 인원을 모집합니다",
            wrtier: "김민수",
            enter: "false"
        }])
    }, [])

    return (
        <div>
            <div className={styles.board_container}>
                <div className={styles.board_groups}>
                <GroupList></GroupList>
                </div>
            </div>
        </div>
    )
}

export default My;