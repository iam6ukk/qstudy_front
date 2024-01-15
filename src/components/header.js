import { Link } from "react-router-dom";
import styled from "./css/header.module.css";

const Header = () => {
    return (
        <div>
            <Link to={"/main/all"}>전체 그룹</Link>
            <Link to={"/main/my"}>내 그룹</Link>
        </div>
    )
}

export default Header;