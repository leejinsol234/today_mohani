// import MainPage from "./pages/MainPage"
// import Login from "./pages/Login";
import axios from 'axios'
import React, {useEffect, useState} from "react";
import Login from './pages/Login';
import MainPage from './pages/MainPage';

function App(){

  const [hello, setHello] = useState('')

  // useEffect(() => {
  //     axios.get('/api/hello')
  //     .then(response => setHello(response.data))
  //     .catch(error => console.log(error))
  // }, []);

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
 
 
