import React, { useEffect, useRef, useState } from 'react';
import styles from './css/mypage.module.css';
import Profile from "../../assets/profile.png";
import { useCookies } from 'react-cookie';
import imageCompression from "browser-image-compression";

const MyPage = () => {

  const [cookies, setCookie] = useCookies();
  const fileInputRef = useRef(null); 
  const [formData, setFormData] = useState({
    nickname: cookies["login"]?.nickname,
    password: '',
    email: cookies["login"]?.email === null ||  cookies["login"]?.email === undefined ? '' : cookies["login"].email,
  });

  const [changeImage, setChangeImage] = useState(cookies["login"]?.picture);

  const encodeFileToBase64 = async (fileBlob) => {
    const options = {
      maxSizeMB: 0.2, // 이미지 최대 용량
      maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
      useWebWorker: true,
    };
    if(fileBlob === undefined || fileBlob === null) return;
    const compressedFile = await imageCompression(fileBlob, options);
    const promise = imageCompression.getDataUrlFromFile(compressedFile);
    promise.then((result) => {
      setChangeImage(result);
      console.log(result);
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if(formData.nickname.trim() === '') {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if(formData.password.trim() === '') {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if(formData.email.trim() === '') {
      alert("이메일을 입력해주세요.");
      return;
    }
    if(window.confirm("저장하시겠습니까?")) {
      let data = {
        nickname: formData.nickname,
        password: formData.password,
        email: formData.email,
        picture: changeImage
      }

      
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>사용자 정보 변경</h2>
      <form>
        <div className={styles.profile_Group}>
          <label htmlFor="profilePicture">프로필 사진 변경</label>
          <input name="profilePicture" ref={fileInputRef} type='file' accept='image/gif, image/jpeg, image/png' style={{display: "none"}}  onChange={(e) => { 
           encodeFileToBase64(e.target?.files[0])}}>
          </input>

          
          <img className={styles.profile_image} src={changeImage === undefined || changeImage === null ? Profile : changeImage} onClick={() => {fileInputRef.current.click()}}></img>
          
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nickname" className={styles.label}>닉네임 변경</label>
          <input
            className={styles.inputForm}
            value={formData.nickname}
            type="text"
            id="nickname"
            name="nickname"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>비밀번호 변경</label>
          <input
            className={styles.inputForm}
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>이메일 변경</label>
          <input
            className={styles.inputForm}
            value={formData.email}
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        <button className={styles.saveBtn} type="button" onClick={handleSubmit}>
          저장
        </button>
      </form>
    </div>
  );
};

export default MyPage;
