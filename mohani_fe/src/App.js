import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import React, {useEffect, useState} from "react";

function App() {
// 서버에 전송할 초기데이터 설정
const [userData, setUserData] = useState({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  phoneNumber: '',
  agree: false,
});

//로딩 관리  
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mohaniApi = async () => {
      try {
        const response = await fetch('/mohani');
        const result = await response.json();

        setUserData(result.username);
      } catch (error) {
        console.error('API 호출 중 에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    mohaniApi();
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login 
          userData ={userData}
          setUserData ={setUserData}
          />} />
          <Route path="/mohani/join" element={<CreateUser 
          userData={userData} 
          setUserData={setUserData} />} />

          <Route path="/mohani/main" element={<MainPage
          userData={userData} 
          setUserData={setUserData}
          />} />
          {console.log(userData)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
