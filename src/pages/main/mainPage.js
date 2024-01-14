import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    //로그인 체크 (추후 개발)
    useEffect(() => {

    }, [])

    return (
        <div>
            메인 페이지
        </div>
    )
}

export default MainPage;