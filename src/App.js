import styled from "styled-components";
import moudleStyle from "./test/test.module.css";
import Google from "./components/google.js";
import GithubButton from "./components/github.js";

const CustomInput = styled.input`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: lightblue;
`;

const App = () => {
  return (
    <div className="App">
      <Google />
      <GithubButton/>
      <input className={moudleStyle.test_input} value={"test"}></input>
      <CustomInput value="test"></CustomInput>
      김유경 바보
    </div>
  );
};

export default App;
