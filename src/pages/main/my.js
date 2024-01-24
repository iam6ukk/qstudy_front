import { useEffect } from "react";
import GroupList from "../../components/group/myGroupList";
import styles from "./css/board.module.css";
import { groupInfoState } from "../../recoil/group/group_state";
import { useRecoilState } from "recoil";
import { Cookies, useCookies } from "react-cookie";

const My = () => {
  let [list, setList] = useRecoilState(groupInfoState);
  let [cookies, setCookie] = useCookies();

  //   let id = cookies["login"].id;

  async function myGroup() {
    const response = await fetch("http://localhost:8080/group/my?id=eukk");
    const myGroupList = await response.json();
    console.log("myGroup: " + myGroupList);
    setList(myGroupList);
  }

  useEffect(() => {
    myGroup();
  }, []);

  return (
    <div>
      <div className={styles.board_container}>
        <div className={styles.board_groups}>
          <GroupList></GroupList>
        </div>
      </div>
    </div>
  );
};

export default My;
