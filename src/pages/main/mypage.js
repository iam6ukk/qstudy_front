import React, { useEffect, useRef, useState } from 'react';
import styles from './css/mypage.module.css';
import Profile from "../../assets/profile.png";
import { useCookies } from 'react-cookie';

const MyPage = () => {

  const [cookies, setCookie] = useCookies();
  const fileInputRef = useRef(null); 
  const [formData, setFormData] = useState({
    nickname: cookies["login"].nickname,
    password: '',
    email: cookies["login"].email === null ? '' : cookies.email,
  });

  const [changeImage, setChangeImage] = useState(undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('변경된 사용자 정보:', formData);
    // 여기서는 서버로 데이터를 보내는 코드를 추가해야 합니다.
    // 실제로는 AJAX나 다른 방법을 사용하여 서버로 데이터를 전송해야 합니다.
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>사용자 정보 변경</h2>
      <form>
        <div className={styles.profile_Group}>
          <label htmlFor="profilePicture">프로필 사진 변경</label>
          <input name="profilePicture" ref={fileInputRef} type='file' accept='image/gif, image/jpeg, image/png' style={{display: "none"}}  onChange={(e) => { 
            setChangeImage(URL.createObjectURL(e.target.files[0]))}}>
          </input>

          
          <img className={styles.profile_image} src={changeImage === undefined ? Profile : changeImage} onClick={() => {fileInputRef.current.click()}}></img>
          
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nickname">닉네임 변경</label>
          <input
            value={formData.nickname}
            type="text"
            id="nickname"
            name="nickname"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">비밀번호 변경</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">이메일 변경</label>
          <input
            value={formData.email}
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={handleSubmit} className={styles.button}>
          저장
        </button>
      </form>
    </div>
  );
};

export default MyPage;
