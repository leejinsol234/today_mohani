import React ,{ useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { SplitDetailScreen } from '../SplitScreen';
import '../App.css' ;
import Button from './Button';
import { ButtonGroup } from '../pages/MainPage';

function TimeRange(date, startTime, endTime) {
  const endTimeFilterling = endTime ? `~${endTime}` : '';
  return `${date} ${startTime}${endTimeFilterling}`;
}

//클릭했을때 일정 순회하는 함수
export function ScheduleUseMemo({dataKey, scheduleData, value}){
  
  const clickedDate = {
    startDate: moment(value).startOf('day'),
    endDate: moment(value).endOf('day'),
  };

  console.log('dataKey:', dataKey);

  
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

function ScheduleTitle({ scheduleData }) {
  return <ScheduleDetail title="제목" dataKey={["event"]} scheduleData={scheduleData} />;
}

function ScheduleTime({ scheduleData,value }) {
 console.log('스케줄페이지 모멘트 밸류 : ' + moment(value).format('YYYY년 MM월 DD일'));

  return <ScheduleDetail 
    title="기간" 
    dataKey={["date","startTime","endTime"]} 
    scheduleData={scheduleData} 
    value={value}/>;
}

function ScheduleLocation({ scheduleData }) {
  return <ScheduleDetail title="장소" dataKey={["location"]} scheduleData={scheduleData} />;
}

function ScheduleMemo({ scheduleData }) {
  return <ScheduleDetail title="메모" dataKey={["memo"]} scheduleData={scheduleData} />;
}


function Schedule({scheduleData ,value}){

  //일정 배열에서 해당 날짜만 필터링하기
  const filteredScheduleData = useMemo(() => {
    const clickedDate = moment(value).format('YYYY-MM-DD');
    return scheduleData.filter(item => item.date === clickedDate);
  }, [scheduleData,value]);

  //상세일정 클릭했을때 상태관리
  const [clickedTitle, setClickedTitle] = useState(null);
  const handleClickTitle = (item) => {
    setClickedTitle((item) => !item);
  };
  //상세일정리스트 필터링
  const filteredDetailData = useMemo(() => {
    if (clickedTitle) {
      return filteredScheduleData.filter(item => item.event === clickedTitle);
    }
    return [];
  }, [filteredScheduleData,clickedTitle]);


  return (
    <>
      <ScheduleList
        dataKey={["event"]}
        scheduleData={filteredScheduleData}
        value={value}
        onClick={handleClickTitle}
      />

      {clickedTitle && (
        <>
        <SplitDetailScreen topWeight={1} middleWeight={1} bottomWeight={2.5}>
          {/* <ScheduleTitle
            title="제목"
            dataKey={["event"]}
            scheduleData={filteredScheduleData}
            value={value}
          /> */}
          <ScheduleTime
            dataKey={["date", "startTime", "endTime"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
          <ScheduleLocation
            dataKey={["location"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
          <ScheduleMemo
            dataKey={["memo"]}
            scheduleData={filteredDetailData}
            value={value}
            onClick={handleClickTitle}
          />
        </SplitDetailScreen>
        <ButtonGroup>
          <Button>일정 수정</Button>
          <Button>일정 삭제</Button>
        </ButtonGroup>  
        </>
      )}
    </>)  
}

export default Schedule;