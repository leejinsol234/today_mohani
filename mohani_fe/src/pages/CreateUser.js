import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function CreateUser({userData,setUserData}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // 유효성검사 선언
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [agreeValid, setAgreeValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  // 비밀번호 보기기능 및 아이콘
  const [showPassword, setShowPassword] = useState(false);
  const eye = (
    <FontAwesomeIcon icon={faEye} />
  )
  const closeEye = (
    <FontAwesomeIcon icon={faEyeSlash} />
  )

  const passwordToggleButton = (
    <button type="button" className="ToggleButton"
    onClick={() => setShowPassword(!showPassword)} >
      {showPassword ? closeEye : eye}
    </button>
  )
  
  //회원가입 동의 true false 관리
  const [agree,setAgree] = useState(false)
  function handleAgree(){
    setAgree(!agree);
  }
  
  // 이메일 유효성 검사
  const USER_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  useEffect(() => {
    const result = USER_REGEX.test(email);
    setEmailValid(result);
  }, [email]);

  // 비밀번호 유효성 검사
  const PW_REGEX = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@#!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  useEffect(() => {
    const result = PW_REGEX.test(password);
    setPwValid(result);
    const match = password === confirmPassword;
    setConfirmPasswordValid(match);
  }, [password, confirmPassword]);

  // 전화번호 유효성 검사
  const PHONE_REGEX =  /^010-?([0-9]{4})-?([0-9]{4})$/;
  useEffect(() => {
    const result = PHONE_REGEX.test(phoneNumber);
    setPhoneNumberValid(result);
  }, [phoneNumber]);

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
          username, phoneNumber, agree })
      });


  
      // 서버 응답 처리
      if (response.ok) {
        // 회원가입 성공 시 로그인페이지로 이동
        navigate('/mohani');
        console.log('서버 요청 성공',response.statusText)
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
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="errorMessageWrap" 
          style={{visibility : (!emailValid && email.length > 0) ? "visible" : "hidden"}}>
          올바른 이메일을 입력해주세요.</div>

        <div className="CreateInputTitle">비밀번호</div>
        <div className="CreateInputWrap">
          <input
            type= {showPassword ? "text" : "password"}
            className="CreateInput"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          {passwordToggleButton}
        </div>

        <div className="errorMessageWrap" 
          style={{visibility : (!pwValid && password.length > 0) ? "visible" : "hidden"}}>
          영문 대소문자, 숫자, 특수기호 포함 8자리 이상 입력해주세요.</div>

        <div className="CreateInputTitle">비밀번호 확인</div>
        <div className="CreateInputWrap">
          <input
            type= {showPassword ? "text" : "password"}
            className="CreateInput"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e)=> {setConfirmPassword(e.target.value)}}
          />
  
        </div>
        <div className="errorMessageWrap" 
          style={{visibility : (!confirmPasswordValid && confirmPassword.length > 0) ? "visible" : "hidden"}}>
          비밀번호가 맞지 않습니다.</div>

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
        <div className="errorMessageWrap">
        빈칸
        </div>

        <div className="CreateInputTitle">전화번호</div>
        <div className="CreateInputWrap">
          <input
            type="text"
            className="CreateInput"
            placeholder="전화번호"
            value={phoneNumber}
            onChange={(e) => {setPhoneNumber(e.target.value)}}
          />
        </div>
        <div className="errorMessageWrap" 
          style={{visibility : (!phoneNumberValid && phoneNumber.length > 0) ? "visible" : "hidden"}}>
          전화번호를 입력해주세요.</div>

      </div>
      <div className="AgreeBoxWrap">
        <input type="checkbox" onClick={handleAgree} className="CreateAgreeBox" />
        이용약관 및 개인정보 처리방침에 동의합니다.
      </div>
      {/* <div className="errorMessageWrap">
          이용약관에 동의해주세요.</div> */}

      <div>
        <button onClick={handleSubmit} 
        className="CreateAddButton"
        disabled={!emailValid || !pwValid || !phoneNumberValid || !confirmPasswordValid || !agree ? true : false}
        >
          회원가입
        </button>
      </div>

      <div className="CreateFooter">
        <div className="CreateFooter1">이미 계정이 있으신가요?</div>
        <Link to={"/mohani"} className="CreateFooter2">
          로그인{" "}
        </Link>
      </div>
    </div>
  );
}
