const GithubButton  = (props) => {
  const clientId = process.env.REACT_APP_GITHUB;
  const redirectUrl = 'http://localhost:3000'
  const githubURL = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`
  const handleLogin = ()=>{
      window.location.href = githubURL
  }
  return (
      <div >
          <button onClick={handleLogin}>
              깃허브 로그인
          </button>
      </div>
  );
};

export default GithubButton;