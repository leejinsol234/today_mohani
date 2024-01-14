import React, { useMemo } from 'react';
import moment from 'moment';

function TimeRange(date, startTime, endTime) {
  const endTimeFilterling = endTime ? `~${endTime}` : '';
  return `${date} ${startTime}${endTimeFilterling}`;
}

function ScheduleDetail({ title, dataKey, scheduleData, value}) {
  const clickedDate = {
    startDate : moment(value).startOf('day'),
    endDate : moment(value).endOf('day'),
  }; 
  
  const memoizedData = useMemo(() => {
    //여러 속성 배열로 처리하기 ScheduleTime 처리용
    return scheduleData.map(item => {   

      if (dataKey.length === 1) {
        return item[dataKey[0]];
      } else if (dataKey.length === 2) {
        return TimeRange(item[dataKey[0]], item[dataKey[1]]);
      } else if (dataKey.length === 3) {
        return TimeRange(item[dataKey[0]], item[dataKey[1]], item[dataKey[2]]);
      }

      });
  }, [dataKey, scheduleData,clickedDate]);

  console.log('스케줄페이지 모멘트 밸류 : '+ moment(value).format("YYYY년 MM월 DD일") )
  console.log('clickedDate : '+clickedDate.startDate.format('YYYY-MM-DD')) 

  return (
    <>
      <h4 className=''>{title}</h4>
      <div className=''>
        {memoizedData.map((item, index) => (
          <div key={`${clickedDate}-${index}`}>{item}</div>
        ))}
        {console.log('키값 : '+ dataKey)}   
      </div>
    </>
  );
  
}

function ScheduleTitle({ scheduleData }) {
  return <ScheduleDetail title="제목" dataKey={["event"]} scheduleData={scheduleData} />;
}

function ScheduleTime({ scheduleData }) {
  return <ScheduleDetail title="기간" dataKey={["date","startTime","endTime"]} scheduleData={scheduleData} />;
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
  }, [scheduleData, value]);
    return(<>
      <ScheduleTitle scheduleData={filteredScheduleData} />
      <ScheduleTime scheduleData={filteredScheduleData} />
      <ScheduleLocation scheduleData={filteredScheduleData} />
      <ScheduleMemo scheduleData={filteredScheduleData} />
    </>)
}

export default Schedule;