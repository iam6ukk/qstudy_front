import { useEffect } from "react";
import GroupList from "../../components/group/myGroupList";
import styles from "./css/board.module.css";
import { groupInfoState } from "../../recoil/group/group_state";
import { useRecoilState } from "recoil";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const My = () => {
  let [list, setList] = useRecoilState(groupInfoState);
  let [cookies, setCookie] = useCookies();
  let navigation = useNavigate();

  async function myGroup(id) {
    const response = await fetch(`http://210.114.19.32:8080/group/my?id=${id}`);
    const myGroupList = await response.json();
    console.log("myGroup: " + myGroupList);
    setList(myGroupList);
  }

  useEffect(() => {
    if(cookies["login"] === undefined) {
      alert("로그인이 필요합니다");
      navigation('/login')
      return;
    }
    let id = cookies["login"].id;
    myGroup(id);
  }, []);

  return (
    <div className={styles.board_container}>
      <div className={styles.board_groups}>
        <GroupList></GroupList>
      </div>
    </div>
  );
};

export default My;
