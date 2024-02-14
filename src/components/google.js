import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GoogleLoginButton = () => {
  const [cookies, setCookie] = useCookies();
  const clientId =
    "957143631493-r4bne96s73eldk4kreqs623jj40cc6eg.apps.googleusercontent.com";
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (res) => {
    try {
      const decodedToken = jwtDecode(res.credential);
      //console.log(decodedToken);


      await fetch("http://localhost:8080/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decodedToken),
      });
      
      const time = 3600; //1시간
      const expiration = new Date(Date.now() + time * 1000);
      //로그인 쿠키 설정
        setCookie("login", {
            id: decodedToken.sub,
            picture: decodedToken.picture,
            nickname: decodedToken.name,
            email: decodedToken.email,
            sso: "google"
        }, {
            path: "/",
            expires: expiration
        })
        console.log("Setup Cookie");
        navigate('/main');
    } catch (error) {
      console.error("토큰 디코딩 또는 서버 전송 오류: ", error);
    }
  };

  const handleGoogleLoginFailure = (err) => {
    console.error("Google 로그인 실패:", err);
  };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
