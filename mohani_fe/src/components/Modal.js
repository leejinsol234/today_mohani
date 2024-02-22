import styled, { keyframes } from "styled-components";
import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faWallet, faCircle, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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
  const [addStartDate, setAddStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [addEndDate, setAddEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [addLocation, setAddLocation] = useState("");
  const [addMoney, setAddMoney] = useState("");
  const [addMemo, setAddMemo] = useState("");
  const [addStartTime, setAddStartTime] = useState("09:00");
  const [addEndTime, setAddEndTime] = useState("10:00");

  // 최종 일정
  const [addData, setAddData] = useState("");

  // 달력 출력
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 일정 색 변경
  const [iconColor, setIconColor] = useState("#C5EDC8");

  // 달력 날짜 변경
  const ChangeStartDate = (date) => {
    setStartDate(date); // 달력 설정
    // 데이터 설정
    setAddStartDate(moment(date).format("YYYY-MM-DD"));
  };
  const ChangeEndDate = (date) => {
    setEndDate(date);
    setAddEndDate(moment(date).format("YYYY-MM-DD"));
  };

  const pallet = (
    <div className="pallet">
      <FontAwesomeIcon
        style={{ color: "#e53a40" }}
        value="#e53a40"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#e53a40")}
      />
      <FontAwesomeIcon
        style={{ color: "#8cd790" }}
        value="#8cd790"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#8cd790")}
      />
      <FontAwesomeIcon
        style={{ color: "#f68657" }}
        value="#f68657"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#f68657")}
      />
      <FontAwesomeIcon
        style={{ color: "#d499b9" }}
        value="#d499b9"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#d499b9")}
      />
      <FontAwesomeIcon
        style={{ color: "#30a9de" }}
        value="#30a9de"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#30a9de")}
      />
      <FontAwesomeIcon
        style={{ color: "#efdc05" }}
        value="#efdc05"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#efdc05")}
      />
      <FontAwesomeIcon
        style={{ color: "#d09e88" }}
        value="#d09e88"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#d09e88")}
      />
      <FontAwesomeIcon
        style={{ color: "#8b8687" }}
        value="#8b8687"
        className="palletIcon"
        icon={faCircle}
        onClick={() => setIconColor("#8b8687")}
      />
    </div>
  );

  // updown 버튼
  const [showUpDown, setShowUpDown] = useState(false);
  const down = <FontAwesomeIcon icon={faCaretDown} />;
  const up = <FontAwesomeIcon icon={faCaretUp} />;

  const updownToggleButton = (
    <div>
      <button type="button" className="upDownButton" onClick={() => setShowUpDown(!showUpDown)}>
        {showUpDown ? down : up}
      </button>
      {showUpDown && pallet}
    </div>
  );

  // 일정 등록 제출
  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");

    const Data = {
      startDate: addStartDate,
      endDate: addEndDate,
      title: addEvent,
      startTime: addStartTime,
      endTime: addEndTime,
      loc: addLocation,
      money: addMoney,
      content: addMemo,
    };

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
        closeModal();
      } else {
        console.error("서버 요청 실패:", res.statusText);
      }
    } catch (error) {
      console.error("에러 발생", error);
    }
  };

  // Modal에서 시간 고르기
  let hour = [];
  let optionhour = [];
  for (let i = 0; i < 25; i++) {
    let op = {};

    op.value = ("0" + i).slice(-2);
    op.label = ("0" + i).slice(-2) + ":00";

    hour.push(op);
    optionhour.push(
      <option value={op.value} onClick={(e) => setAddStartTime(e.target.value)}>
        {op.label}
      </option>
    );
  }

  function SelectStartTime() {
    return (
      <div className="AddTimeInputWrap">
        <select
          className="AddTimeInput"
          onChange={(e) => setAddStartTime(e.target.value)}
          value={addStartTime} // 선택된 값을 유지하도록 설정
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

  function SelectEndTime() {
    return (
      <div className="AddTimeInputWrap">
        <select
          className="AddTimeInput"
          onChange={(e) => setAddEndTime(e.target.value)}
          value={addEndTime} // 선택된 값을 유지하도록 설정
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

  return (
    <>
      <ModalBackground onClick={closeModal} />
      <div className="page">
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
              <SelectStartTime />
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
              <SelectEndTime />
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

          <div className="AddWrap">
            <FontAwesomeIcon className="modalIcon" icon={faWallet} />
            <div className="AddInputWrap">
              <input
                className="AddInput"
                value={addMoney}
                onChange={(e) => setAddMoney(e.target.value)}
                placeholder="금액 입력"
              />
            </div>
          </div>

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
