import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import React, {useEffect, useState } from "react";

function App() {
// 서버에 전송할 초기데이터 설정


//로딩 관리  
const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/mohani" element={<Login 
          // userData ={userData}
          // setUserData ={setUserData}
          />} />
          <Route path="/mohani/join" element={<CreateUser 
          // userData={userData} 
          // setUserData={setUserData}
          />} />

          <Route path="/mohani/main" element={<MainPage
          // userData={userData} 
          // setUserData={setUserData}
          />} />
          {/* {console.log(userData)} */}
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
