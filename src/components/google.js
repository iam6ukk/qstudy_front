import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = () => {
  const clientId =
    "957143631493-r4bne96s73eldk4kreqs623jj40cc6eg.apps.googleusercontent.com";

  const handleGoogleLoginSuccess = async (res) => {
    try {
      const decodedToken = jwtDecode(res.credential);
      console.log(decodedToken);

      await fetch("http://localhost:8080/api/saveToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decodedToken }),
      });
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
