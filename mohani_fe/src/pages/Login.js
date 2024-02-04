import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import CreateUser from "./CreateUser";
import AccountModal from "../components/AccountModal";
import Modal from "../components/Modal";

// const User = {
//   email: 'test@example.com',
//   password : 'test1234@@@'
// }


export default function Login({onClick}) {
  const [isUser, setIsUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  
  // 이메일 유효성 검사
  const USER_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  useEffect(() => {
    const result = USER_REGEX.test(email);
    setEmailValid(result);
  }, [email]);

  // 비밀번호 유효성감사
  const PW_REGEX = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@#!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  useEffect(() => {
    const result = PW_REGEX.test(password);
    setPwValid(result);
  }, [password]);

//   const onClickConfirmButton = () => {
//     {true}
//   }

useEffect(()=> {
  if(emailValid && pwValid){
    setNotAllow(false)
    return;
  }
  setNotAllow(true);
}, [emailValid, pwValid])

const navigate = useNavigate(); 

const loginUser = async () => {
  try {
    const response = await fetch('/mohani/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, }),
    });

    const data = await response.json();

    console.log('응답데이터', data);

    if (response.ok) {
      const token = response.headers.get('Authorization');

      localStorage.setItem('accessToken', token)
      navigate('/mohani/main');
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error.message);
  }
};




  
  return (
    <div className="page">
      <div className="titleWrap">
        오늘 머하니
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input 
          type='text' className="input" placeholder="test@gmail.com" value={email}
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
          value={password}
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
                disabled={notAllow}
        >
          {/* <Link to={'/mohani/main'} className=""> */}
            확인
          {/* </Link> */}
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