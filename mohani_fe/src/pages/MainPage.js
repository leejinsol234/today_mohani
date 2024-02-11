//컴포넌트
import '../App.css';
import '../Layout.css'
import styled from 'styled-components';

import Calendar from 'react-calendar'; //리액트 캘린더
import '../components/Calendar.css'; //리액트 캘린더 css 
import SplitScreen from '../SplitScreen'; //메인페이지 화면분할

import Account from '../components/Account';//가계부 윗단
import TotalAccount from '../components/TotalAccount';//총지출
import Schedule from '../components/Schedule';//상세일정

import Button from '../components/Button';//버튼
import Modal from '../components/Modal';//모달
import AccountModal from '../components/AccountModal';


//관리
import { React, useEffect,useState } from 'react';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

//버튼 구역 css
export const ButtonGroup =styled.div`
display : flex;
justify-content: space-around;
margin-top : 1rem;
`

function AppHeader({userData}){
  const navigate = useNavigate();

  function onLogout(){
  localStorage.removeItem("accessToken")
  navigate('/mohani/');
}

// console.log(userData)

  return(<>
  <div className="header">
    <span>{userData.username} 님, 안녕하세요!</span>
    <button className="header_logout" onClick={onLogout}>
        로그아웃
    </button>    
  </div>
  </>)
};

const LeftComponent = ({ title,onChange,value}) => {
  return (
    <>
      <h3>{title}</h3>
      <Calendar 
          onChange={onChange}     
          value={value}
          formatDay={(locale, date) => moment(date).format("DD")}
        />

    </>  
  );
};

const MiddleComponent = ({ value,hasSchedule,scheduleData, onChange}) => {
  //미들컴포넌트에서 받아낸 스케줄데이터
  console.log('메인에서 스케줄데이터 값:',scheduleData)

  const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };
  


  return (<>
      <div className="">
        {moment(value).format("YYYY년 MM월 DD일")}                         
      </div>
      {hasSchedule ? (
        <>
          <Schedule scheduleData={scheduleData} value={value}/>  
        </>  
      ) : (
        <>
        <p>일정이 없습니다.</p>
        <ButtonGroup>
          <Button onClick={openModal}>일정 추가
          </Button>
          {isModalOpen && <Modal closeModal={closeModal} scheduleData={scheduleData} 
          onChange={onchange}
 />}
        </ButtonGroup>        
        </>
      )
    }
    {console.log('메인페이지 모멘트 밸류'+ moment(value).format("YYYY년 MM월 DD일") ) }   

  </>);
};

const RightComponent = ({ title,value,hasAccount,accountData }) => {

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const openAccountModal = () => {
    setIsAccountModalOpen(true);
  };
  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
  };

  return (<>
      <h3>{title}</h3>

      {hasAccount ? (
        <>
          <Account accountData={accountData} value={value}/>
        <TotalAccount />        
        </>  
      ) : (
        <>
        <p>지출 내역이 없습니다.</p>
        <TotalAccount />
        <ButtonGroup>
          <Button onClick={openAccountModal}>가계부 추가</Button>
          {isAccountModalOpen && <AccountModal closeAccountModal={closeAccountModal} />}
        </ButtonGroup>       
        </>
      )
    }
      
      
  </>);
};

function MainPage({ onClick, userData, setUserData }) {
  const username = "username*"; //더미데이터
  //달력 날짜 값 변경관리
  const [value, onChange] = useState(new Date());
  //일정 유무 상태관리
  const [hasSchedule, setHasSchedule] = useState(false);
  //가계부 유무 상태관리
  const [hasAccount, setHasAccount] = useState(false);
  //더미 일정 데이터와 일정추가하기
  const [scheduleData, setScheduleData] = useState([
    {
      date: '2024-01-14',
      event: '팀프로젝트 회의 2주차',
      startTime: '14:00',
      endTime: '18:00',
      location: '인천시 부평22',
      memo: '메모메모1111111111111111',
    },
    {
      date: '2024-01-21',
      event: '팀프로젝트 회의 3주차',
      startTime: '14:00',
      endTime: '19:00',
      location: '인천시 부평33',
      memo: '메모메모메모2',
    },
    {
      date: '2024-01-20',
      event: '장소가 안적혀있는 이벤트11',
      startTime: '15:00',
      endTime: '18:00',
      location: '',
      memo: '메모메모메모4444',
    },
    {
      date: '2024-01-20',
      event: '메모가 안적혀있는 이벤트22',
      startTime: '12:00',
      endTime: '21:00',
      location: '메모가 안적혀있는 이벤트의 장소 ',
      memo: '',
    },
    {
      date: '2024-01-19',
      event: '메모가 안적혀있는 이벤트33',
      startTime: '12:00',
      endTime: '21:00',
      location: '메모가 안적혀있는 이벤트의 장소33 ',
      memo: '',
    }
    // 추가적인 일정 데이터
  ]);
  
  const [accountData, setAccountData] = useState([
    {
      date: "2024-01-20", 
      category: "지출",
      expense: "500", 
      income: "",
      memo: "식비 지출" },
    { date: "2024-01-21", 
      category: "지출",
      expense: "1000",
      income :"", 
      memo: "쇼핑 지출" },
    { date: "2024-01-21", 
      category: "수입",
      expense: "",
      income :"1000", 
      memo: "수입11" },
    //나중에 추가할 가계부 데이터
  ])

  //일정 유무확인
  useEffect(() => {
    const checkScheduleForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return scheduleData.some((schedule) => schedule.date === moment(date).format('YYYY-MM-DD'));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasSchedule(checkScheduleForDate(value));
    
  }, [value, scheduleData]);

  //가계부 유무 확인
  useEffect(() => {
    const checkAccountForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return accountData.some((schedule) => schedule.date === moment(date).format('YYYY-MM-DD'));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasAccount(checkAccountForDate(value));
    
  }, [value, accountData]);

  const navigate = useNavigate();

  // token 없을 시 자동으로 mohani 이동
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate('/mohani/');
    }
  }, [navigate]);

  return (
    <div className="App">
      <AppHeader userData={userData} onClick={onClick}/>
      <SplitScreen leftWeight={1.5} middleWeight={1} rightWeight={1}>
        <LeftComponent 
          // title="달력"
          onChange={onChange} 
          value={value}
          />     
        <MiddleComponent 
          title="상세일정"
          value={value}
          hasSchedule ={hasSchedule}
          scheduleData={scheduleData}
          onChange={onChange} 
          /> 
          
        <RightComponent 
          title="가계부"
          value={value}
          hasAccount ={hasAccount}
          accountData={accountData}
          />
    </SplitScreen>
    </div>
  );
}
export default MainPage;
