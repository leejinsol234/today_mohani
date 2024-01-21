//컴포넌트
import '../App.css';
import '../Layout.css'

import Calendar from 'react-calendar'; //리액트 캘린더
import '../components/Calendar.css'; //리액트 캘린더 css 
import SplitScreen from '../SplitScreen'; //메인페이지 화면분할

import Account from '../components/Account';//가계부 윗단
import TotalAccount from '../components/TotalAccount';//총지출
import Schedule from '../components/Schedule';//상세일정

import Button from '../components/Button';//버튼
import Modal from '../components/Modal';//모달
import React from 'react';


//관리
import {  useEffect,useState } from 'react';
import moment from "moment";


function AppHeader({username,onClick}){

  return(<>
  <div className="header">
    <span>{username} 님, 안녕하세요!</span>
    <button className="header_logout" onClick={onClick}>
      {/* <a href="#"> */}
        로그아웃
      {/* </a> */}
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

const MiddleComponent = ({ title,value,hasSchedule,scheduleData }) => {
  //미들컴포넌트에서 받아낸 스케줄데이터
  console.log('메인에서 스케줄데이터 값:',scheduleData)

  const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => {
      setModalOpen(true);
    };
    const closeModal = () => {
      setModalOpen(false);
    };
  


  return (<>
      <h3>{title}</h3>
      <div className="">
        {moment(value).format("YYYY년 MM월 DD일")}                         
      </div>
      {hasSchedule ? (
        <>
          <Schedule scheduleData={scheduleData} value={value}/>
          <Button>일정 수정</Button>
          <Button>일정 삭제</Button>
        </>  
      ) : (
        <>
        <p>일정이 없습니다.</p>
        <Button onClick={openModal}>일정 추가 </Button>
        {isModalOpen && <Modal closeModal={closeModal} />}
            {/* <button onClick={openModal}>경우2.일정이 없는날</button>
    {isModalOpen && <Modal closeModal={closeModal} />} */}
        </>
      )
    }
    {console.log('메인페이지 모멘트 밸류'+ moment(value).format("YYYY년 MM월 DD일") ) }   
      

  </>);
};

const RightComponent = ({ title,hasSchedule }) => {
  const [AccountModalOpen, setAccountModalOpen] = useState(false);
  const openAccountModal = () => {
    setAccountModalOpen(true);
  };
  const closeAccountModal = () => {
    setAccountModalOpen(false);
  };
  return (<>
      <h3>{title}</h3>

      {hasSchedule ? (
        <>
          <Account />
          <TotalAccount />
          <Button>가계부 수정</Button>
          <Button>가계부 삭제</Button>
        </>  
      ) : (
        <>
        <p>지출 내역이 없습니다.</p>
        <TotalAccount />
        <Button onClick={openAccountModal}>가계부 추가</Button>
        </>
      )
    }
      
      
  </>);
};

function MainPage({ onClick }) {
  const username = "username*"; //더미데이터
  //달력 날짜 값 변경관리
  const [value, onChange] = useState(new Date());
  //일정 유무 관리
  const [hasSchedule, setHasSchedule] = useState(false);
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
    // 나중에 컴포넌트로 따로 분리
    // Account도 여기에 넣을지는 회의때 정하기
  ]);


  useEffect(() => {
    const checkScheduleForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return scheduleData.some((schedule) => schedule.date === moment(date).format('YYYY-MM-DD'));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasSchedule(checkScheduleForDate(value));
    
  }, [value, scheduleData]);

  //모달 관리
  // const [isModalOpen, setModalOpen] = useState(false);
  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  return (
    <div className="App">
      <AppHeader username={username} onClick={onClick}/>
      <SplitScreen leftWeight={1.5} middleWeight={1} rightWeight={1}>
        <LeftComponent 
          title="달력"
          onChange={onChange} 
          value={value}
        />     
        <MiddleComponent 
          title="상세일정"
          value={value}
          hasSchedule ={hasSchedule}
          scheduleData={scheduleData}
          onClick={onClick}
          /> 
          
        <RightComponent 
          title="가계부"
          hasSchedule ={hasSchedule}
          />
    </SplitScreen>
    {/* <button onClick={openModal}>경우2.일정이 없는날</button>
    {isModalOpen && <Modal closeModal={closeModal} />} */}
    </div>
  );
}
export default MainPage;
