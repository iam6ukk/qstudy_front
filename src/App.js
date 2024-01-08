import styled from "styled-components";

import moudleStyle from "./test/test.module.css";
import Google from "./components/google.js";
import GithubButton from "./components/github.js";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/loginPage.js"
import SignupPage from "./pages/login/signupPage.js"

const CustomInput = styled.input`
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  background-color: lightblue;
`;

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
