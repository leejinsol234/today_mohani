import React, {useMemo} from 'react';
import moment from 'moment';
import '../App.css'
import ButtonList from './ButtonList';
import { useState } from 'react';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';

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
  const filteredAccountData = accountData.filter(item => item.date === clickedDate)


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

  const [checkIdx,setCheckIdx] = useState ();     
function deleteAccount(checkIdx){

  //idx 조회
//Account idx 찾기
const handleClickAccount = (item) => {
  setClickedAccount(item);

    for(let i=0; i<filteredAccountData.length; i++){
    setCheckIdx(filteredScheduleData[i].idx);
  }
};
  //가계부 삭제
  const fetchDelete = async (idx) => {
    
    try {
      const response = await fetch(`/mohani/accounts/del/${idx}`,{
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      
      if(!response.ok){
        throw new Error('삭제 실패했습니다.');
      }

      if(response) {
        accountData.splice(idx-1,1);
        alert('가계부를 삭제했습니다.');
        window.location.reload();
      }

      } catch(error) {
        console.error('delete error: ', error);
      }

    }

  } 

  return (
    <>

    <div className='accountlists'>
        <>          
        {filteredAccountData.map((item, index) => (
            <li key={index}>
              <div className='category'>{item.category}</div>
              {/* 지출내역 */}
              <div className='account_memo'>{item.money}</div>
              <div className='account_memo'>{item.memo}</div>
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
                  <ButtonList onClick={() => deleteAccount(checkIdx)}>삭제</ButtonList>
                </>
              ) : (
                <>
                <ButtonList onClick={() => handleEdit(index, item.income || item.expense)}>수정</ButtonList>
                <ButtonList onClick={() => deleteAccount(checkIdx)}>삭제</ButtonList>
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
