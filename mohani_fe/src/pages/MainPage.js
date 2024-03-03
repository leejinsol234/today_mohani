//컴포넌트
import "../App.css";
import "../Layout.css";
import styled from "styled-components";

import Calendar from "react-calendar"; //리액트 캘린더
import "../components/Calendar.css"; //리액트 캘린더 css
import SplitScreen from "../SplitScreen"; //메인페이지 화면분할

import Account from "../components/Account"; //가계부 윗단
import TotalAccount from "../components/TotalAccount"; //총지출
import Schedule from "../components/Schedule"; //상세일정

import Button from "../components/Button"; //버튼
import Modal from "../components/Modal"; //모달
import AccountModal from "../components/AccountModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";

//관리
import { React, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

//버튼 구역 css
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

function AppHeader({ userData }) {
  const navigate = useNavigate();

  // 로그아웃 기능
  function onLogout() {
    localStorage.removeItem("accessToken");
    navigate("/mohani/");
    // window.location.reload(true);
  }

  // console.log(userData)

  const logoUrl = 'LogoTrans.png';

  return (
    <>
      <div className="header">
        <span>{userData.username} 님, 안녕하세요!</span>
        <img className="mainLogo" src={process.env.PUBLIC_URL + '/' + logoUrl} />
        <button className="header_logout" onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
}

const LeftComponent = ({ title, onChange, value }) => {
  const plus = (
    <div style={{ display: "absolute" }}>
      <FontAwesomeIcon className="plusButton" icon={faPlus} />
    </div>
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h3>{title}</h3>
      <Calendar onChange={onChange} value={value} formatDay={(locale, date) => moment(date).format("DD")} />
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon className="plusButton" icon={faPlus} onClick={openModal} />
      </div>
      <div className="plusButtonWrap">
        <button className="plusButton2" onClick={openModal}>일정 추가</button>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} value={value} />}
    </>
  );
};

const MiddleComponent = ({ value, hasSchedule, scheduleData, onChange }) => {
  //미들컴포넌트에서 받아낸 스케줄데이터
  console.log("메인에서 스케줄데이터 값:", scheduleData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  return (
    <>
      <div className="">{moment(value).format("YYYY년 MM월 DD일")}</div>
      {hasSchedule ? (
        <>
          <Schedule scheduleData={scheduleData} value={value} />
        </>
      ) : (
        <>
          <p>일정이 없습니다.</p>
        </>
      )}
      {console.log("메인페이지 모멘트 밸류" + moment(value).format("YYYY년 MM월 DD일"))}
    </>
  );
};

const RightComponent = ({ title, value, hasAccount, accountData }) => {
  //새로운 가계부
  const [inputValue, setInputValue] = useState(""); 
  const [showInput, setShowInput] = useState(false); // 인풋 창을 보여줄지 여부 상태

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // 입력 값 변경 시 상태 업데이트
  };

  const handleAddExpense = () => {
    // 여기에 가계부 항목을 추가하는 로직을 추가할 수 있습니다.
    console.log("새로운 가계부 항목 추가:", inputValue);
    // 추가 후 입력 값을 초기화합니다.
    setInputValue("");
    // 인풋 창 보이도록 상태 업데이트
    setShowInput(true);
  };

  return (
    <>
      <h3>{title}</h3>

      {hasAccount ? (
        <>
          <Account accountData={accountData} value={value} />
          <ButtonGroup>
            <Button onClick={handleAddExpense}>가계부 추가</Button>
          </ButtonGroup>
          <TotalAccount />
        </>
      ) : (
        <>
          <p>지출 내역이 없습니다.</p>
          <ButtonGroup>
            <Button onClick={handleAddExpense}>가계부 추가</Button>
          </ButtonGroup>
          <TotalAccount />
        </>
      )}

      {/* 인풋 창 */}
      {showInput && (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="새로운 가계부 항목"
          />
          <button onClick={handleAddExpense}>추가</button>
          <button onClick={() => setShowInput(false)}>취소</button>
        </div>
      )}
    </>
  );
};

function MainPage({ onClick }) {
  //달력 날짜 값 변경관리
  const [value, onChange] = useState(new Date());
  //일정 유무 상태관리
  const [hasSchedule, setHasSchedule] = useState(false);
  //가계부 유무 상태관리
  const [hasAccount, setHasAccount] = useState(false);
  //더미 일정 데이터와 일정추가하기
  const [scheduleData, setScheduleData] = useState([
    {
      date: "2024-01-14",
      event: "팀프로젝트 회의 2주차",
      startTime: "14:00",
      endTime: "18:00",
      location: "인천시 부평22",
      memo: "메모메모1111111111111111",
    },
    // 추가적인 일정 데이터
  ]);
  const navigate = useNavigate();

  const [accountData, setAccountData] = useState([
    {
      date: "2024-01-20",
      category: "지출",
      memo: "식비",
      expense: "500",
      income: "",
    },
    { date: "2024-01-21", 
    category: "지출",
    memo: "쇼핑", 
    expense: "1000", 
    income: "", 
 },
    { date: "2024-01-21", 
    category: "수입",
    memo: "월급", 
    expense: "", 
    income: "1000", 
 },
    //나중에 추가할 가계부 데이터
  ]);

  // 원본
  // // userdata
  const [userData, setUserData] = useState({
    email: "",
    memberNo : "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
    agree: false,
  });

  const [loading, setLoading] = useState(true);

  const isTokenValid = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // 토큰의 만료 시간
    return Date.now() < expirationTime;
  };

  // Username fetch GET
  const fetchData = async () => {
    const token = localStorage.getItem("accessToken");

    if (token && isTokenValid(token)) {
      try {
        const response = await fetch("http://localhost:3000/mohani/info", {
          headers: {
            Accept: "application/json",
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUserData((prevUserData) => ({
            ...prevUserData,
            username: result.data.username,
              memberNo : result.data.memberNo
          }));
          console.log(result)
        } else {
          alert("토큰이 만료되었습니다. 다시 로그인 부탁드립니다.");
          // 토큰이 만료되었을 경우 로그인 페이지
          navigate("/mohani/");
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("토큰이 만료되었습니다. 다시 로그인 부탁드립니다.");
      // 토큰이 만료되었을 경우 로그인 페이지
      navigate("/mohani/");
      localStorage.removeItem("accessToken");
    }
  };

    // Schedule fetch GET
    const [finalSchedulaData, setFinalSchedulaData] = useState(scheduleData);
    const fetchDoData = async () => {
      const token = localStorage.getItem("accessToken");
      const memberNo = userData.memberNo;
  
      try {
        const res = await fetch(`http://localhost:3000/mohani/${memberNo}`, {
          header: {
            Accepts: "application/json",
            Authorization: `${token}`,
          },
        });
        if(res.ok){
          const result = await res.json();
          // setFinalSchedulaData((prevSchedule) => ({
          //   ...prevSchedule, 
          // }))
          console.log(result)
          console.log(result.data)
        }else {
          console.log('스케줄 데이터 가져오기 실패');
        }
      } catch (error) {
        console.error("error message : ", error);
      }
    }

  useEffect(() => {
    fetchData();
    fetchDoData();
  }, []);

  //일정 유무확인
  useEffect(() => {
    const checkScheduleForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return scheduleData.some((schedule) => schedule.date === moment(date).format("YYYY-MM-DD"));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasSchedule(checkScheduleForDate(value));
  }, [value, scheduleData]);

  //가계부 유무 확인
  useEffect(() => {
    const checkAccountForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return accountData.some((schedule) => schedule.date === moment(date).format("YYYY-MM-DD"));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasAccount(checkAccountForDate(value));
  }, [value, accountData]);

  return (
    <div className="App">
      <AppHeader userData={userData} onClick={onClick} />
      <SplitScreen leftWeight={1.5} middleWeight={1} rightWeight={1}>
        <LeftComponent
          // title="달력"
          onChange={onChange}
          value={value}
        />
        <MiddleComponent
          title="상세일정"
          value={value}
          hasSchedule={hasSchedule}
          scheduleData={scheduleData}
          onChange={onChange}
        />

        <RightComponent title="가계부" value={value} hasAccount={hasAccount} accountData={accountData} />
      </SplitScreen>
    </div>
  );
}
export default MainPage;
