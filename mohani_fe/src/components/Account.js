import React, {useMemo} from 'react';
import moment from 'moment';
import '../App.css'
import ButtonList from './ButtonList';
import { useState } from 'react';

function TodayAccount() {
  return (
    <>
      <h4 className=''>오늘의 지출</h4>
    </>
  );
}
//메모삭제
// function MemoAccount({ memo }) {
//   return (
//     <>
//       <h4 className=''>메모</h4>
//       <div className=''>{memo}</div>
//     </>
//   );
// }

function Account({accountData,value}) {
  //일정 배열에서 해당 날짜만 필터링하기
  const clickedDate = moment(value).format('YYYY-MM-DD');
  const filteredAccountData = accountData.filter(item => item.date === clickedDate);

  // 수정할 항목의 상태 관리
  const [editIndex, setEditIndex] = useState(null);

  // 수정된 값을 저장할 상태 관리
  const [editedValue, setEditedValue] = useState("");

  const handleEdit = (index, value) => {
    setEditIndex(index);
    setEditedValue(value);
  };

  const handleSave = (index) => {
    // 여기서 수정된 값을 저장하고 상태를 초기화할 수 있습니다.
    // 예를 들어, API 호출을 통해 서버에 값을 보낼 수도 있습니다.
    console.log("저장할 값:", editedValue);
    setEditIndex(null);
    setEditedValue("");
  };

  return (
    <>
    <div className='accountlists'>
        <>          
        {filteredAccountData.map((item, index) => (
            <li key={index}>
              <div className='category'>{item.category}</div>
              <div className='title_account'>{item.title}</div>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
              ) : (
                <>
                  {item.income && <div className='income'>{item.income} 원</div>}
                  {item.expense && <div className='expense'>{item.expense} 원</div>}
                </>
              )}
              {editIndex === index ? (
                <>
                  <ButtonList onClick={() => handleSave(index)}>저장</ButtonList>
                  <ButtonList>삭제</ButtonList>
                </>
              ) : (
                <>
                <ButtonList onClick={() => handleEdit(index, item.income || item.expense)}>수정</ButtonList>
                <ButtonList>삭제</ButtonList>
                </>
              )}
            </li>
        ))}
        </>
    </div>  
    </>
  );
}

export default Account;
