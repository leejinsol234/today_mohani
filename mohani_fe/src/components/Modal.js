import styled,{keyframes} from 'styled-components';
import { React, useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

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
  const navigate = useNavigate();

  // 모달 일정추가 데이터
    const [addEvent, setAddEvent] = useState('');
    const [addStartDate, setAddStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [addEndDate, setAddEndDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [addLocation, setAddLocation] = useState('');
    const [addMoney, setAddMoney] = useState('');
    const [addMemo, setAddMemo] = useState('');
    const [addStartTime, setAddStartTime] = useState('09:00');
    const [addEndTime, setAddEndTime] = useState('10:00');

    // 최종 일정
    const [addData, setAddData] = useState(scheduleData);

    // 달력 출력
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const ChangeStartDate = (date) => {
      setStartDate(date); // 달력 설정
      // 데이터 설정
      setAddStartDate(moment(date).format("YYYY-MM-DD"));
    }
    const ChangeEndDate = (date) => {
      setEndDate(date);
      setAddEndDate(moment(date).format("YYYY-MM-DD"));
    }
    
    const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");

      console.log(scheduleData)
      
      const Data = {
        //seq : 'null',
        startDate : addStartDate,
        EndDate : addEndDate,
        title : addEvent,
        startTime : addStartTime,
        endTime : addEndTime,
        loc : addLocation,
        // money : addMoney,
        content : addMemo,
      };
      
      setAddData([{...addData}, Data]);
      console.log(addData)
      console.log(Data)

      try {
        const res = await fetch('/mohani/main', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
            Authorization : `${token}`,
          },
          body : JSON.stringify(Data),
        })

        if (res.ok) {
          console.log("일정제목 : " + Data.title);
          navigate('/mohani/main');
        } else {
        console.error('서버 요청 실패:', res.statusText);
        }

      } catch (error) {
        console.error('에러 발생', error)
      }
    }

    // Modal에서 시간 고르기
    let hour = [];
    let optionhour = [];
    for (let i = 0; i < 25; i++) {
      let op = {};

      op.value = ('0' + i).slice(-2);
      op.label = ('0' + i).slice(-2) + ':00';

      hour.push(op);
      optionhour.push(<option value={op.value} 
        onClick={(e) =>setAddStartTime(e.target.value)}>
          {op.label}</option>)
    }
  
  // console.log(optionhour)  

  function SelectStartTime() {
    return (
      <div className='AddTimeInputWrap'>
        <select
          className='AddTimeInput'
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
      <div className='AddTimeInputWrap'>
        <select
          className='AddTimeInput'
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

      <ModalBackground onClick={closeModal}/>
    <div className="page">
      <div className="AddTitleWrap"> 일정추가 </div>
      <div>
        <div className="AddWrap">
          <div>제목</div>
          <div className="AddInputWrap">
            <input type="text" className="AddInput" value={addEvent}
            placeholder="일정 제목을 입력해 주세요."
            onChange={(e)=> setAddEvent(e.target.value)} />
            </div>
        </div>

        <div>
          <div className="AddWrap">
            <div>달력</div>
            <div className="AddCalInputWrap">
              {/* <input className="AddInput" value={addDate} placeholder="2014.01.10"
              onChange={(e) => setAddDate(e.target.value)}/> */}
              <DatePicker selected={startDate} dateFormat="yyyy. MM. dd" 
              onChange ={ChangeStartDate} shouldCloseOnSelect
              onSelect={ChangeStartDate}
              className='datePicker AddInput' />
            </div>
              <SelectStartTime />
            </div>
            
          <div className="AddWrap">
            <div style={{marginLeft : 60}} className="AddCalInputWrap">
              {/* <input className="AddInput" placeholder="2014.01.11"/> */}
              <DatePicker selected={endDate} dateFormat="yyyy. MM. dd" 
              onChange ={ChangeEndDate} shouldCloseOnSelect
              onSelect={ChangeEndDate}
              className='datePicker AddInput' />
            </div>
            <SelectEndTime />
          </div>
        </div>

        <div className="AddWrap">
          <div>장소</div>
          <div className="AddInputWrap">
            <input className="AddInput" value={addLocation}
            onChange={(e) => setAddLocation(e.target.value)}
            placeholder="장소 입력"/></div>
        </div>

        <div className="AddWrap">
          <div>금액</div>
          <div className="AddInputWrap">
            <input className="AddInput" value ={addMoney} onChange={(e) => setAddMoney(e.target.value)}
            placeholder="금액 입력"/></div>
        </div>

        <div className="AddWrap">
          <div>메모</div>
          <div className="AddInputWrap">
            <input className="AddMemoInput" value={addMemo} onChange={(e) => setAddMemo(e.target.value)}
            placeholder="메모 입력"/></div>
        </div>

        <div className="flex">
          <button onClick={handleSubmit}
            className="AddButton">등록</button>
        </div>

      </div>
    </div>
      
    </>
    );
  }
  

export default Modal;