import { useState } from "react";
import MainPage from "./pages/MainPage"
import Login from "./pages/Login";

function App(){
  const [isLogIn, setIsLogIn] = useState(false);

  function handleLogin(){
    setIsLogIn(true);
  }
  function handleLogout(){
    setIsLogIn(false);
  }

  return (
    <>
      {isLogIn ? (
        // 회원이면 메인 페이지 렌더링
        <MainPage onClick={handleLogout}/>
      ) : (
        // 비회원이면 로그인 페이지 렌더링
        <Login onClick={handleLogin}/>
      )}
    </>
  );
}; 

export default App;
 
 
