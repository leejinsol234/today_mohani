import React ,{ memo, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { SplitDetailScreen } from '../SplitScreen';
import '../App.css' ;
import Button from './Button';
import { ButtonGroup } from '../pages/MainPage';
import EditModal from './EditModal';

function TimeRange(date, startTime, endTime) {
  const endTimeFilterling = endTime ? `~${endTime}` : '';
  return `${date} ${startTime}${endTimeFilterling}`;
}
// 19:00 ~ 20:00로 출력하고 싶으셨던 듯


//클릭했을때 일정 순회하는 함수
export function ScheduleUseMemo({dataKey, scheduleData, value}){
  
  const clickedDate = {
    startDate: moment(value).startOf('day'),
    endDate: moment(value).endOf('day'),
  };  
  
  return useMemo(() => {
    if (!Array.isArray(scheduleData)) { 
      return [];
    }
    
    return scheduleData.map((item) => {
      return dataKey.map(key => item[key]).join(' '); 
    });
  }, [dataKey, scheduleData, clickedDate]);
};



//일정리스트
function ScheduleList({ title, dataKey, scheduleData, value, onClick }) {
  const memoizedData = ScheduleUseMemo({ dataKey, scheduleData, value });

  const handleClick = (item) => {
    onClick(item);
  };
  
  return (
    <>
      <h4 className=''>{title}</h4>
      <div className='lists pointer'>
        {memoizedData.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>{item}</li>
        ))}
      </div>
    </>
  );
}

//상세 일정
function ScheduleDetail({ title, dataKey, scheduleData, value }) {
  const memoizedData = ScheduleUseMemo({dataKey, scheduleData, value});
  return (
    <>
      <h4 className=''>{title}</h4>
      <div className=''>
        {memoizedData.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </>
  );
}

// function ScheduleTitle({ scheduleData }) {
//   return <ScheduleDetail title="제목" dataKey={["title"]} scheduleData={scheduleData} />;
// }

function ScheduleTime({ scheduleData,value }) {
//  console.log('스케줄페이지 모멘트 밸류 : ' + moment(value).format('YYYY년 MM월 DD일'));

  return <ScheduleDetail 
    title="기간" 
    dataKey={["date","startTime","endTime"]} 
    scheduleData={scheduleData} 
    value={value}/>;
}

function ScheduleLocation({ scheduleData }) {
  return <ScheduleDetail title="장소" dataKey={["loc"]} scheduleData={scheduleData} />;
}

function ScheduleMemo({ scheduleData }) {
  return <ScheduleDetail title="메모" dataKey={["content"]} scheduleData={scheduleData} />;
}


function Schedule({scheduleData ,value}){

  //일정 배열에서 해당 날짜만 필터링하기
  const filteredScheduleData = useMemo(() => {
    const clickedDate = moment(value).format('YYYY-MM-DD');
    return scheduleData.filter(item => moment(item.date).format('YYYY-MM-DD') === clickedDate);
  }, [scheduleData, value]);


  const [checkSeq, setCheckSeq] = useState();
// seq찾고 하려고 만들어둔 변수  (보류)
// console.log('checkSeq 값 :',checkSeq)

  //상세일정 클릭했을때 상태관리
  const [clickedTitle, setClickedTitle] = useState(null);
  const handleClickTitle = (item) => {
    setClickedTitle(item);

      for(let i=0; i<filteredScheduleData.length; i++){
    if(item === filteredScheduleData[i].title){
      setCheckSeq(filteredScheduleData[i].seq);
    }
  }};

  //상세일정리스트 필터링
  const filteredDetailData = useMemo(() => {
    if (clickedTitle) {
      return filteredScheduleData.filter(item => item.title === clickedTitle);
    }
    return [];
  }, [filteredScheduleData,clickedTitle]);

  // console.log('필터스케쥴데이터',filteredScheduleData);
  // console.log('필터디테일데이터',filteredDetailData);


  // 일정 삭제 (fetch Delete)
  const fetchDelete = async (seq) => {
    
    try {
      const response = await fetch(`/mohani/${seq}`,{
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      
      if(!response.ok){
        throw new Error('삭제 실패했습니다.');
      }

      if(response) {
        scheduleData.splice(seq-1,1);
        alert('일정을 삭제했습니다.');
        window.location.reload();
      }

      } catch(error) {
        console.error('delete error: ', error);
      }

    } 
    // useEffect(() => {
    //   ScheduleMemo();
    // }, [value]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };
    const closeModal = () => {
      setIsModalOpen(false);
    };


  return (
    <>
      <ScheduleList
        dataKey={["title"]}
        scheduleData={filteredScheduleData}
        value={value}
        onClick={handleClickTitle}
      />

      {clickedTitle && (
        <>
        <SplitDetailScreen topWeight={0.7} middleWeight={1} bottomWeight={2}>
          {/* <ScheduleTitle
            title="제목"
            dataKey={["event"]}
            scheduleData={filteredScheduleData}
            value={value}
          /> */}
          <ScheduleTime
            dataKey={["startDate", "startTime", "endTime"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
          <ScheduleLocation
            dataKey={["loc"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
          <ScheduleMemo
            dataKey={["content"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
        </SplitDetailScreen>
        <ButtonGroup>
          <Button onClick={openModal}>일정 수정</Button>
          {isModalOpen && <EditModal scheduleData={filteredDetailData}
          closeModal={closeModal} value={value}  />}

          <Button onClick={() => fetchDelete(checkSeq)}>일정 삭제</Button>
        </ButtonGroup>  
        </>
      )}
    </>)  
}

export default Schedule;