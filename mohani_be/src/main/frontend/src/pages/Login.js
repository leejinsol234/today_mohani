import React, { useEffect, useState, useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';

export default function Login({onClick}) {
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navigate = useNavigate(); 

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
  }, [password]);

  const loginUser = async () => {
    try {
      const response = await fetch('/mohani/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ email : email, password : password, }),
      });
  
      if (!response.ok) {
        // Handle non-OK responses
        if (response.status === 400) {
          const data = await response.json();
          if (data.message.email) {
            // 아이디가 유효하지 않음
            alert(data.message.email[0]); // "이메일을 확인해주세요."
          } else if (data.message.password && data.message.password[0]) {
            // 비밀번호가 틀림
            alert(data.message.password[0]); // "비밀번호를 확인해주세요."
          } else {
            console.error(data.message);
          }
        } else {
          console.error('서버에서 오류 응답:', response.status);
        }
      } else {
        const token = response.headers.get('Authorization');
        localStorage.setItem('accessToken', token);
        navigate('/mohani/main');
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error.message);
    }
  };
  
  // token 있을 시 자동으로 main이동
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate('/mohani/main');
    }
    emailFocus.current.focus();
  }, []);
  
  // Enter클릭시 로그인 EVENT
  const onKeyPress = (e) => {
    if(e.key == 'Enter'){
      loginUser();
    }
  }

  const emailFocus = useRef(null);

  function Logo() {
    const logoUrl = 'todaymohaniLogo.png';
    return <img className="Logo" src={process.env.PUBLIC_URL + '/' + logoUrl} alt="logoImage" />;
  }

  
  return (
    <div className="page">
      <div className="titleWrap">
        {/* 오늘 머하니 */}
      {Logo()}
      
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input 
          type='text' className="input" placeholder="test@gmail.com" value={email}
          ref={emailFocus}
          onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
          
        <div className="errorMessageWrap" 
          style={{visibility : (!emailValid && email.length > 0) ? "visible" : "hidden"}}>
          올바른 이메일을 입력해주세요.</div>
            
        <div style = {{marginTop : "12px"}}className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input
          type = 'password' 
          className="input" placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          value={password} onKeyDown={onKeyPress}
          onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <div className="errorMessageWrap"
          style={{visibility : (!pwValid && password.length > 0) ? "visible" : "hidden"}}>
            영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
        </div>
      </div>
        
      <div className="">
        <button className="bottomButton"
                onClick={loginUser}
                disabled={!emailValid || !pwValid}
        >
            확인
        </button>

          {/* <button onClick={onClick} className="bottomButton">
            확인
          </button> */}
      </div>

      <div className="new">
          <div className="newTitle">아직 회원이 아니신가요?</div>
          <Link to={'/mohani/join'}className='newCreate'> 회원가입</Link>
      </div>
    </div>


  )
}