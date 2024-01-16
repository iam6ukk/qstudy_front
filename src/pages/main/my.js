import GroupList from "../../components/group/myGroupList";
import styles from "./css/board.module.css";

const My = () => {
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