import axios from "axios";
import styles from "./css/groupAttendModal.module.css";
import { useState } from "react";

const GroupAttendModal = ({setOpenAttendModal, writer, group}) => {
    let [title, setTitle] = useState("");
    let [memo, setMemo] = useState("");

    const closeBtn = () => {
        setOpenAttendModal(false);
    }


    const submit = async() => {
        if(!window.confirm("스터디를 생성하시겠습니까?")) return;
        let groupId = Math.random().toString(36).substring(2, 11);

        let data = {
            group_id: groupId,
            writer: writer.toString(),
            title: title,
            memo: memo
        }

        try {
            await axios.post(process.env.REACT_APP_DEV_PATH + "/group/add", data);
            alert(`'${title}' 스터디가 추가되었습니다`);
            setOpenAttendModal(false);
            group(writer);
        } catch(err) {
            alert("오류가 발생했습니다.")
            console.log(err);
        }
    }

    return (
        <div className={styles.modal_background}>
            <div className={styles.modal_container}>
                <div className={styles.title}>
                    <div className={styles.title_text}>스터디 생성</div>
                    <div className={styles.close_btn} onClick={() => {closeBtn();}}></div>
                    
                </div>
                
                <div className={styles.input_container}>
                    <div className={styles.inputBox}>
                        <div className={styles.study_title}>스터디 제목</div>
                        <input value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
                    </div>

                    <div className={styles.inputBox}>
                        <div className={styles.study_title}>설명</div>
                        <textarea value={memo} onChange={(e) => {setMemo(e.target.value)}}></textarea>
                    </div>

                    <button className={styles.createBtn} onClick={() => {submit()}}>
                        생성하기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GroupAttendModal;