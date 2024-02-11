import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route, useHistory} from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import React, {useEffect, useState } from "react";

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

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3000/mohani/info', {
      headers: {
        Accept: "application/json",
        "Authorization": localStorage.getItem("accessToken"),
      }
    });

    if (response.ok) {
      console.log('get호출 성공');
      const fetchData = await response.json();
      console.log('fetch로 받아온 데이터', fetchData);
      setUserData(prevUserData => ({ ...prevUserData, username: fetchData.data }));
    } else {
      console.log('get호출 실패');
    }
  } catch (error) {
    console.error('에러 발생', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/mohani" element={<Login 
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
          {/* {console.log(userData)} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
