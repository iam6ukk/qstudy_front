import styled from "styled-components";

const GithubButton  = (props) => {
  const clientId = process.env.REACT_APP_GITHUB;
  const redirectUrl = 'http://localhost:3000/login'
  const githubURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`
  const handleLogin = ()=>{
      window.location.href = githubURL
  }

  const GithubBtn = styled.button`
    width: 200px;
    height: 38px;
    border: 1px solid lightgray;
    background-color: black;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    margin-top: 10px;

  `

  return (
      <div >
          <GithubBtn onClick={handleLogin}>
              깃허브 로그인
          </GithubBtn>
      </div>
  );
};

export default GithubButton;