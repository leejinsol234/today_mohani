import styled, { keyframes } from "styled-components";
import { React, useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faWallet, faCircle, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
  `;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  animation: ${fadeIn} 0.5s ease;
`;

function Modal({ closeModal, scheduleData, value }) {
  // 모달 일정추가 데이터
  const [addEvent, setAddEvent] = useState("");
  const [addStartDate, setAddStartDate] = useState(moment(value).format("YYYY-MM-DD"));
  const [addEndDate, setAddEndDate] = useState(moment(value).format("YYYY-MM-DD"));
  const [addLocation, setAddLocation] = useState("");
  const [addPlusMoney, setAddPlusMoney] = useState("");
  const [addMinusMoney, setAddMinusMoney] = useState("");
  const [addMemo, setAddMemo] = useState("");
  const [addStartTime, setAddStartTime] = useState("09:00");
  const [addEndTime, setAddEndTime] = useState("10:00");

  
  // 달력 출력
  const [startDate, setStartDate] = useState(value);
  const [endDate, setEndDate] = useState(value);

  // 일정 색 변경
  const [iconColor, setIconColor] = useState("#8cd790");

  // 달력 날짜 변경
  const ChangeStartDate = (date) => {
    setStartDate(moment(date).format("YYYY-MM-DD")); // 달력 설정
    // 데이터 설정
    setAddStartDate(moment(date).format("YYYY-MM-DD"));
  };
  const ChangeEndDate = (date) => {
    setEndDate(moment(date).format("YYYY-MM-DD"));
    setAddEndDate(moment(date).format("YYYY-MM-DD"));
  };

  const pallet = (
    <div className="pallet">
      <FontAwesomeIcon
        style={{ color: "#e53a40" }}
        value="#e53a40"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#e53a40"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#8cd790" }}
        value="#8cd790"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#8cd790"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#f68657" }}
        value="#f68657"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("f68657"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#d499b9" }}
        value="#d499b9"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#d499b9"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#30a9de" }}
        value="#30a9de"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#30a9de"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: '#ee6e9f' }}
        value="#ee6e9f"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#ee6e9f"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#d09e88" }}
        value="#d09e88"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#d09e88"), setShowUpDown(false);
        }}
      />
      <FontAwesomeIcon
        style={{ color: "#8b8687" }}
        value="#8b8687"
        className="palletIcon"
        icon={faCircle}
        onClick={() => {
          setIconColor("#8b8687"), setShowUpDown(false);
        }}
      />
    </div>
  );

  // updown 버튼
  const [showUpDown, setShowUpDown] = useState(false);
  const palletRef = useRef();

  const down = <FontAwesomeIcon icon={faCaretDown} />;
  const up = <FontAwesomeIcon icon={faCaretUp} />;
  const palletHandler = (e) => {
    setShowUpDown((prevState) => !prevState);
  };

  // pallet 다른 곳 눌렀을 때 꺼지기 기능
  const handleDocumentClick = (e) => {
    if(palletRef.current && !palletRef.current.contains(e.target)){
      setShowUpDown(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }}, []);

  const updownToggleButton = (
    <div ref={palletRef}>
      <button type="button" className="upDownButton" onClick={palletHandler}>
        {showUpDown ? up : down}
      </button>
      {showUpDown && pallet}
    </div>
  );

  // 일정 등록 제출
  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");

    const Data = {
      // seq: addSeq,
      color : iconColor,
      startDate: addStartDate,
      endDate: addEndDate,
      title: addEvent,
      startTime: addStartTime,
      endTime: addEndTime,
      loc: addLocation,
      plusMoney: addPlusMoney,
      minusMoney: addMinusMoney,
      content: addMemo,
    };
    console.log('아이콘컬러 : ', iconColor);

    try {
      const res = await fetch("/mohani/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(Data), // 수정된 부분
      });

      if (res.ok) {
        console.log("일정제목 : " + addEvent);
        alert("일정이 추가 됐습니다.")
        closeModal();
        window.location.reload();
      } else {
        console.error("서버 요청 실패:", res.statusText);
        alert("추가할 일정제목을 입력해주세요.")
      }
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  // Modal에서 시간 고르기
  let hour = [];
  for (let i = 0; i < 25; i++) {
    let op = {};

    op.value = ("0" + i).slice(-2);
    op.label = ("0" + i).slice(-2) + ":00";

    hour.push(op);
  }

  function TimeSelector({ value, onChange }) {
    return (
      <div className="AddTimeInputWrap">
        <select
          className="AddTimeInput"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
        >
          {hour.map((data) => (
            <option key={data.value} value={data.label}>
              {data.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Title Focus
  const titleFocus = useRef(null);

  useEffect(() => {
    titleFocus.current.focus();
  }, []);

  // Enter클릭시 일정등록 EVENT
  const onKeyPress = (e) => {
    if(e.key == 'Enter'){
      handleSubmit();
    }
  }


  return (
    <>
      <ModalBackground onClick={closeModal} />
      <div className="page" onKeyDown={onKeyPress}>
        <div className="AddTitleWrap"> 일정추가 </div>
        <div>
          <div className="AddWrap">
            <FontAwesomeIcon style={{ color: iconColor }} className="modalIcon titleIcon" icon={faCircle} />
            {updownToggleButton}
            <div className="AddInputWrap">
              <input
                type="text"
                className="AddInput"
                value={addEvent}
                placeholder="일정 제목을 입력해 주세요."
                ref={titleFocus}
                onChange={(e) => setAddEvent(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="AddWrap">
              <FontAwesomeIcon className="modalIcon" icon={faCalendar} />
              <div className="AddCalInputWrap">
                {/* <input className="AddInput" value={addDate} placeholder="2014.01.10"
              onChange={(e) => setAddDate(e.target.value)}/> */}
                <DatePicker
                  selected={startDate}
                  dateFormat="yyyy. MM. dd"
                  onChange={ChangeStartDate}
                  shouldCloseOnSelect
                  onSelect={ChangeStartDate}
                  className="datePicker AddInput"
                />
              </div>
              <TimeSelector value={addStartTime} onChange={setAddStartTime} />
            </div>

            <div className="AddWrap">
              <div style={{ marginLeft: 70 }} className="AddCalInputWrap">
                {/* <input className="AddInput" placeholder="2014.01.11"/> */}
                <DatePicker
                  selected={endDate}
                  dateFormat="yyyy. MM. dd"
                  onChange={ChangeEndDate}
                  shouldCloseOnSelect
                  onSelect={ChangeEndDate}
                  className="datePicker AddInput"
                />
              </div>
              <TimeSelector className="AddInputWrap" value={addEndTime} onChange={setAddEndTime} />
            </div>
          </div>

          <div className="AddWrap">
            <FontAwesomeIcon className="modalIcon" icon={faLocationDot} />
            <div className="AddInputWrap">
              <input
                className="AddInput"
                value={addLocation}
                onChange={(e) => setAddLocation(e.target.value)}
                placeholder="장소 입력"
              />
            </div>
          </div>

          {/* <div className="AddWrap">
            <FontAwesomeIcon className="modalIcon" icon={faWallet} />
            <div className="AddInputWrap" style={{ width: "33%" }}>
              <input
                className="AddInput"
                value={addPlusMoney}
                onChange={(e) => setAddPlusMoney(e.target.value)}
                placeholder="수입 입력"
              />
            </div>

            <div className="AddInputWrap" style={{ marginLeft: "10px", width: "33%" }}>
              <input
                className="AddInput"
                value={addMinusMoney}
                onChange={(e) => setAddMinusMoney(e.target.value)}
                placeholder="지출 입력"
              />
            </div>
          </div> */}

          <div className="AddWrap">
            <FontAwesomeIcon className="modalIcon" icon={faPenToSquare} />
            <div className="AddInputWrap">
              <input
                className="AddMemoInput"
                value={addMemo}
                onChange={(e) => setAddMemo(e.target.value)}
                placeholder="메모 입력"
              />
            </div>
          </div>

          <div className="flex">
            <button onClick={handleSubmit} className="AddButton">
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;