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

  const handleEmail = (e)=> {
    setEmail(e.target.value);
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if(regex.test(email)){
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@#!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if(regex.test(password)){
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  }

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
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
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
          onChange={handleEmail}/>
        </div>
        <div className="errorMessageWrap">
          {
            !emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )
          }
        </div>

        <div style = {{marginTop : "26px"}}className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input
          type = 'password' 
          className="input" placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          value={password}
          onChange={handlePassword}/>
        </div>
        <div className="errorMessageWrap">
          {
            !pwValid && password.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )
          }
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