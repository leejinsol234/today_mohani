import React from 'react';

function TodayAccount({toDayAccount}) {
    return (
      <>
        <h4 className=''>오늘의 지출</h4>
        <div className="">
          {toDayAccount} 원
        </div>
      </>
    );
  }


function MemoAccount({memo}) {
    return (
      <>
        <h4 className=''>메모</h4>
        <div className="">
          {memo}
        </div>
      </>
    );
  }





function Account() {
  // 더미데이터들 나중에 바꿔야함
  const toDayAccount = "1000*";
  const memo = "메모메모메모*"; 

  return (
    <>
      <TodayAccount toDayAccount={toDayAccount}/>  
      <MemoAccount memo={memo}/>      
    </>
  );
}

export default Account;