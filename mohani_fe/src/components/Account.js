import React, {useMemo} from 'react';
import moment from 'moment';
import '../App.css'

function TodayAccount() {
  return (
    <>
      <h4 className=''>오늘의 지출</h4>
    </>
  );
}

function MemoAccount({ memo }) {
  return (
    <>
      <h4 className=''>메모</h4>
      <div className=''>{memo}</div>
    </>
  );
}

function Account({accountData,value}) {
  //일정 배열에서 해당 날짜만 필터링하기
  const clickedDate = moment(value).format('YYYY-MM-DD');
  const filteredAccountData = accountData.filter(item => item.date === clickedDate);

  return (
    <>
    <div className='accountlists'>
        <>          
        {filteredAccountData.map((item, index) => (
            <li key={index}>
              <div className='category'>{item.category}</div>
              {item.income && <div className='income'>{item.income} 원</div>}
              {item.expense && <div className='expense'>{item.expense} 원</div>}
            </li>
        ))}
        </>
    </div>  
      <MemoAccount />
    </>
  );
}

export default Account;
