import MainPage from "./pages/MainPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import React, {useEffect, useState} from "react";

function App() {
//유저 로그인 유무 관리
  const [username, setUsername] = useState(true);
//로딩 관리  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mohaniApi = async () => {
      try {
        const response = await fetch('/mohani');
        const result = await response.json();

        setUsername(result.username);
      } catch (error) {
        console.error('API 호출 중 에러 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    mohaniApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/mohani/join" element={<CreateUser />} />
          <Route path="/mohani/main" element={<MainPage />} />
          {/* <MainPage /> */}
        {/* {username ? <MainPage username={username} /> : <Login />} */}
        {console.log(username)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
