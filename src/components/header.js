import { Link } from "react-router-dom";
import styled from "./css/header.module.css";

const Header = () => {
    return (
        <div className={styled.header_container}>
            <div style={{marginTop: "20px"}}></div>

            <Link to={"/main/all"}>
                <div className={styled.header_btn}>
                    전체 그룹
                </div></Link>

            <div style={{marginTop: "20px"}}></div>

            <Link to={"/main/my"}>
                <div className={styled.header_btn}>
                    내 그룹
                </div>
            </Link>
        </div>
    )
}

export default Header;