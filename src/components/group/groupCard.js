import styled from "./css/group.module.css";

const GroupCard = ({item}) => {
    return (
        <div className={styled.group_card_container}>
            <div>{item.title}</div>
            <div>{item.wrtier}</div>
        </div>
    )
}

export default GroupCard;