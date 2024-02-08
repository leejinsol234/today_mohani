import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
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

useEffect(() => {
     fetch('/mohani/main', {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": localStorage.getItem("accessToken"),
          }
        })
        .then((response) => response.json())
        .then(data => {
          const fetchData = data;
          console.log('fetch로 받아온 데이터',fetchData); })

        }, [])
      
      console.log(userData)

 
//   const getuserdata = async () => {
//     try {
//    fetch(`/mohani/main`, {
//     method : 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.getItem("accessToken"),
//     },
//     body: JSON.stringify({}),
//   })
//   } catch (error) {
//     console.log(error);
//   } 
// }
 
  

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
          {console.log(userData)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
