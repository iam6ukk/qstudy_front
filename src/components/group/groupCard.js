import styled from "./css/group.module.css";

const GroupCard = ({item}) => {
    return (
        <div>
            <div className={styled.group_card_container}>
                <div className={styled.title}>{item.title}</div>
                <div className={styled.contents}>{item.contents}</div>
                <div className={styled.writer}>작성자 : {item.wrtier}</div>
            </div>
        </div>
    )
}

export default GroupCard;