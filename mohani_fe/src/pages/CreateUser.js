import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreateUser({userData,setUserData}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  //회원가입 동의 true false 관리
  const [agree,setAgree] = useState(false)
  function handleAgree(){
    setAgree(!agree);
  }

  const initialUserData = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    username: username,
    phoneNumber: phoneNumber,
    agree: agree,
  };

  const navigate = useNavigate();
  async function handleSubmit() {
    try {
      // 서버에 POST 요청 보내기
      const response = await fetch("/mohani/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 요청 본문에 필요한 데이터 전달
        body: JSON.stringify({ email, password, confirmPassword, 
          username, phoneNumber, agree, ...userData }),
      });


  
      // 서버 응답 처리
      if (response.ok) {
        // 회원가입 성공 시 로그인페이지로 이동
        navigate('/');
      } else {
        console.error("서버 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("서버 요청 중 에러 발생:", error);
    }
  }

  return (
    <div className="CreatePage">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        <div className="CreateInputTitle">이메일</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="CreateInputTitle">비밀번호</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="CreateInputTitle">비밀번호 확인</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="CreateInputTitle">이름</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="이름"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="CreateInputTitle">전화번호</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="전화번호"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="AgreeBoxWrap">
        <input type="checkbox" onClick={handleAgree} className="CreateAgreeBox" />
        이용약관 및 개인정보 처리방침에 동의합니다.
      </div>
      <div>
        <button onClick={handleSubmit} className="CreateAddButton">
          회원가입
        </button>
      </div>
      <div className="CreateFooter">
        <div className="CreateFooter1">이미 계정이 있으신가요?</div>
        <Link to={"/"} className="CreateFooter2">
          로그인{" "}
        </Link>
      </div>
    </div>
  );
}
