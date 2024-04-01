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
import AccountModal from "../components/EditModal";
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

  const logoUrl = "LogoTrans.png";

  return (
    <>
      <div className="header">
        <span className="header_name">{userData.username} 님, 안녕하세요!</span>
        <img className="header_Logo" src={process.env.PUBLIC_URL + "/" + logoUrl} />
        <div className="headerLogoutWrap">
          <button className="header_logout" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

const LeftComponent = ({ title, onChange, value, scheduleData, mark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // console.log("레프트컴포넌트에서 스케줄 값 : ", scheduleData);
  // console.log('mark 값 : ', mark);

  // 캘린더 토요일 일요일 확인
  const tileClassName = ({ date }) => {
    // 일요일(0) 또는 토요일(6)인지 확인하여 클래스를 지정합니다.
    if (date.getDay() === 0 /* 일요일 */) {
      return "sunday"; // 일요일에 해당하는 클래스
    }
    if (date.getDay() === 6 /* 토요일 */) {
      return "saturday"; // 토요일에 해당하는 클래스
    }
    return ""; // 다른 날짜는 추가 클래스가 없습니다.
  };


  const addContent = ({ date }) => {
    // 해당 날짜(하루)에 추가할 컨텐츠의 배열
    const contents = [];

    scheduleData.forEach((schedule) => {
      if (schedule.date === moment(date).format("YYYY-MM-DD")) {
          contents.push(
              <div className="dot" style={{ backgroundColor: schedule.color }}></div>
          );
      }
  });
  // 각 날짜마다 해당 요소가 들어감
    return <>
      <div className="dotWrap">
        {contents}
      </div>
    </>; 
  };

  return (
    <>
      <h3>{title}</h3>
      <Calendar
        minDetail="month"
        locale="en"
        showNeighboringMonth={false}
        tileClassName={tileClassName}
        onChange={onChange}
        value={value}
        formatDay={(locale, date) => moment(date).format("DD")}
        tileContent={addContent}
      />
      <div className="plusButtonWrap">
        <button className="plusButton" onClick={openModal}>
          일정 추가
        </button>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} value={value} scheduleData={scheduleData} />}
    </>
  );
};

//미들컴포넌트
const MiddleComponent = ({ value, hasSchedule, scheduleData, fetchDoData }) => {
  // console.log("메인에서 스케줄데이터 값:", scheduleData);

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
    </>
  );
};

const RightComponent = ({ title, value, hasAccount, accountData, userData }) => {
  //새로운 가계부
  const [showInput, setShowInput] = useState(false); // 인풋 창을 보여줄지 여부 상태
  const [addMemo, setAddMemo] = useState("");
  const [addEvent, setAddEvent] = useState("");
  const [addPlusMoney, setAddPlusMoney] = useState("");
  const [addMinusMoney, setAddMinusMoney] = useState("");

  //수입 지출
  const [expenseType, setExpenseType] = useState(false); // 기본값은 지출

  //가계부 DB추가
  const handleAddExpense = () => {
    // 추가 후 입력 값을 초기화합니다.
    setAddPlusMoney("");
    setAddMemo("")
    // 인풋 창 보이도록 상태 업데이트
    setShowInput(true); // "등록" 후에는 인풋 창을 숨깁니다.
  };

  const addDBexpense = async () => {
    const token = localStorage.getItem("accessToken");
    const Data = {
      date: moment(value).format("YYYY-MM-DD"),
      money: addPlusMoney,
      in_ex: true, // true 수입 false 지출
      memo: addMemo,
    };
    // API를 통해 데이터를 백엔드로 전송
    try {
      const res = await fetch("/mohani/accounts/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(Data), // 입력된 값 전송
      });

      if (res.ok) {
        alert("가계부 등록 성공!");
        setShowInput(false);
      } else {
        console.error("서버 요청 실패:", res.statusText);
        alert("가계부 등록 실패.");
      }
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  //수입지출
  useEffect(() => {
    // 여기서 데이터베이스로부터 데이터를 가져오는 코드를 작성합니다.
    // fetchData 함수는 적절한 방법으로 데이터를 가져오는 함수로 대체되어야 합니다.
    const fetchData = async () => {
      try {
        const response = await fetch(`/mohani/accounts/1`); // 적절한 엔드포인트와 쿼리를 사용하여 데이터를 가져옵니다.
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 문제가 발생했습니다.');
        }
        const data = await response.json();
        setAccountData(data);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchData(); // 데이터 가져오기 실행
  }, [expenseType]); // expenseType이 변경될 때마다 실행

  // 나머지 코드는 동일하게 유지됩니다.


  return (
    <>
      <h3>{title}</h3>

      {hasAccount ? (
        <>
          <Account accountData={accountData} value={value} />
          {/* 인풋 창 */}
          {showInput && (
            <div>
              <input
              type="radio"
              id="income"
              name="expenseType"
              value="income"
              checked={expenseType === "income"}
              onChange={() => setExpenseType("income")}
            />
            <label htmlFor="income">수입</label>
            <input
              type="radio"
              id="expense"
              name="expenseType"
              value="expense"
              checked={expenseType === "expense"}
              onChange={() => setExpenseType("expense")}
            />
              <label htmlFor="expense">지출</label>
              <input
                className="input_account"
                type="text"
                value={addPlusMoney}
                onChange={(e) => setAddPlusMoney(e.target.value)}
                placeholder="금액"
              />
              <input
                className="input_account"
                type="text"
                value={addMemo}
                onChange={(aa) => setAddMemo(aa.target.value)}
                placeholder="메모"
              />
              <button onClick={addDBexpense}>추가</button>
              <button onClick={() => setShowInput(false)}>취소</button>
            </div>
          )}
          <ButtonGroup>
            <Button onClick={handleAddExpense}>가계부 추가</Button>
          </ButtonGroup>
          <TotalAccount userData={userData}/>
        </>
      ) : (
        <>
          <p>지출 내역이 없습니다.</p>
          {/* 인풋 창 */}
          {showInput && (
            <div>
              <input
              type="radio"
              id="income"
              name="expenseType"
              value="income"
              checked={expenseType === "income"}
              onChange={() => setExpenseType("income")}
            />
            <label htmlFor="income">수입</label>
            <input
              type="radio"
              id="expense"
              name="expenseType"
              value="expense"
              checked={expenseType === "expense"}
              onChange={() => setExpenseType("expense")}
            />
            <label htmlFor="expense">지출</label>
              <input
                type="text"
                value={addPlusMoney}
                onChange={(e) => setAddPlusMoney(e.target.value)}
                placeholder="금액"
              />
               <input
                type="text"
                value={addMemo}
                onChange={(aa) => setAddMemo(aa.target.value)}
                placeholder="메모"
              />
              <button onClick={addDBexpense}>추가</button>
              <button onClick={() => setShowInput(false)}>취소</button>
            </div>
          )}
          <ButtonGroup>
            <Button onClick={handleAddExpense}>가계부 추가</Button>
          </ButtonGroup>
          <TotalAccount userData={userData}/>
        </>
      )}
    </>
  );
};

function MainPage({ onClick }) {
  const navigate = useNavigate();
  //달력 날짜 값 변경관리
  const [value, onChange] = useState(new Date());
  //일정 유무 상태관리
  const [hasSchedule, setHasSchedule] = useState(false);
  //가계부 유무 상태관리
  const [hasAccount, setHasAccount] = useState(false);
  //더미 일정 데이터와 일정추가하기
  const [scheduleData, setScheduleData] = useState([]);

  const [mark, setMark] = useState([]);
  // console.log('mark에 들어온 date값들 : ', mark);

  const [accountData, setAccountData] = useState([])

  // // userdata
  const [userData, setUserData] = useState({
    email: "",
    memberNo: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
    agree: false,
  });

  const [loading, setLoading] = useState(true);

  // 토큰의 만료 시간
  const isTokenValid = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
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
            memberNo: result.data.memberNo,
          }));
          // console.log(result)
          return result.data.memberNo;
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
  const fetchDoData = async (memberNo) => {
    const token = localStorage.getItem("accessToken");

    try {
      const res = await fetch(`http://localhost:3000/mohani/${memberNo}`, {
        header: {
          Accepts: "application/json",
          Authorization: `${token}`,
        },
      });
      if (res.ok) {
        const result = await res.json();

        for (let i = 0; i < result.length; i++) {
          scheduleData.push({
            color : result[i].color,
            seq: result[i].seq,
            date: result[i].startDate,
            endDate: result[i].endDate,
            startTime: result[i].startTime,
            endTime: result[i].endTime,
            title: result[i].title,
            loc: result[i].loc,
            content: result[i].content,
          }),
            mark.push({startDate:result[i].startDate, endDate: result[i].endDate,
            color:result[i].color});
        }
        // console.log(result);
        // console.log(scheduleData)
        // console.log("fetch 스케줄 완료");
      } else {
        console.log("스케줄데이터 가져오기 실패");
      }
    } catch (error) {
      console.error("error message : ", error);
    }
  };

  useEffect(() => {
    const fetchDataAndCheckSchedule = async () => {
      try {
        // fetchData 함수를 호출하여 멤버 번호를 가져옵니다.
        if (!scheduleData.length) {
          // 스케줄 데이터를 가져오지 않은 경우에만 fetchData 함수를 호출하여 멤버 번호를 가져옵니다.
          const memberNo = await fetchData();
          // fetchDoData 함수를 호출하여 스케줄 데이터를 가져옵니다.
          await fetchDoData(memberNo);
        }
        return scheduleData.some((schedule) => schedule.date === moment(value).format("YYYY-MM-DD"));
      } catch (error) {
        console.error("fetch 에러발생", error);
        return false;
      }
    };

    // fetchDataAndCheckSchedule 함수를 호출하여 스케줄 데이터를 가져오고, hasSchedule 상태를 업데이트합니다.
    fetchDataAndCheckSchedule().then((result) => {
      setHasSchedule(result);
      // console.log('hasSchedule 값 : ',hasSchedule);
    });
  }, [value]);

  //가계부 유무 확인
  useEffect(() => {
    const checkAccountForDate = (date) => {
      //일정에 데이터가 하나라도 있으면 true 반환
      return accountData.some((schedule) => schedule.date === moment(date).format("YYYY-MM-DD"));
    };
    // 달력 리랜더링 될때마다 hasSchedule 상태를 업데이트
    setHasAccount(checkAccountForDate(value));
  }, [value, accountData]);

      // 가계부 fetch GET
      const fetchAccountData = async (memberNo) => {
        const token = localStorage.getItem("accessToken");
    
        try {
          const res = await fetch(`/mohani/accounts/view/${memberNo}`, {
            header: {
              Accepts: "application/json",
                Authorization: `${token}`,
            },
          });
          if (res.ok) {
            const result = await res.json();
    
            for(let i=0; i<result.length; i++){
            accountData.push({
              money: result[i].money, 
              date : result[i].date, 
              in_ex: result[i].in_ex, 
              memo: result[i].memo, 
              content: result[i].content,
              idx : result[i].idx
        })
            }
            // console.log(result); // 더미데이터 제외
            // console.log(accountData)
          } else {
            console.log("가계부 가져오기 실패");
          }
        } catch (error) {
          console.error("error message : ", error);
        }
      };
  
  
      useEffect(() => {
        const fetchDataAndCheckAccount = async () => {
          try {
            // fetchData 함수를 호출하여 멤버 번호를 가져옵니다.
            if (!accountData.length) {
              // 스케줄 데이터를 가져오지 않은 경우에만 fetchData 함수를 호출하여 멤버 번호를 가져옵니다.
              const memberNo = await fetchData();
              // fetchDoData 함수를 호출하여 스케줄 데이터를 가져옵니다.
              await fetchAccountData(memberNo);
            }
            return accountData.some((schedule) => schedule.date === moment(value).format("YYYY-MM-DD"));
          } catch (error) {
            console.error("fetch 에러발생", error);
            return false;
          }
        };
    
        // fetchDataAndCheckSchedule 함수를 호출하여 스케줄 데이터를 가져오고, hasSchedule 상태를 업데이트합니다.
        fetchDataAndCheckAccount().then((result) => {
          setHasAccount(result);
        });
      }, [value]);

  return (
    <div className="">
      <AppHeader userData={userData} onClick={onClick} />
      <SplitScreen leftWeight={1.5} middleWeight={1} rightWeight={1}>
        <LeftComponent
          // title="달력"
          onChange={onChange}
          value={value}
          scheduleData={scheduleData}
          mark={mark}
          fetchDoData={fetchDoData}
        />
        <MiddleComponent
          title="상세일정"
          value={value}
          hasSchedule={hasSchedule}
          scheduleData={scheduleData}
          onChange={onChange}
        />

        <RightComponent 
        title="가계부" 
        value={value} 
        hasAccount={hasAccount} 
        accountData={accountData} 
        fetchAccountData ={fetchAccountData}
        userData={userData}
        />
      </SplitScreen>
    </div>
  );
}
export default MainPage;
