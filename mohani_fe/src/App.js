import MainPage from "./pages/MainPage"
import Login from "./pages/Login";
import React, {useEffect, useState} from "react";

function App() {
//유저 로그인 유무 관리
  const [username, setUsername] = useState(null);
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
      {username ? <MainPage username={username} /> : <Login />}
      {console.log(username)}
    </div>
  );
}

export default App;
