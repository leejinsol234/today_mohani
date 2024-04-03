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
  const [checkIdx, setCheckIdx] = useState();

  //인풋창 보여줄지 말지
  const [showInput, setShowInput] = useState(false);


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
   

  // 가계부 삭제
function deleteAccount(idx){
  const fetchDelete = async (idx) => {
    try {
      const response = await fetch(`/mohani/accounts/del/${idx}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error('삭제 실패했습니다.');
      }
      
      if (response) {
        accountData.splice(idx - 1, 1);
        alert('가계부를 삭제했습니다.');
        window.location.reload();
      }
      
    } catch(error) {
      console.error('delete error: ', error);
    }
  };
  
  fetchDelete(idx);
} 



  return (
    <>

    <div className='accountlists sagak'>
        <>          
        {filteredAccountData.map((item, index) => (
            <li key={index}>
              {/* 지출내역 */}
              <div className='account_type'>
               {item.in_ex ? "수입" : "지출"}
              </div>
              <div className='account_memo'
              onClick={()=> setCheckIdx(item.idx)}
              >{item.money}</div>
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
                  <ButtonList onClick={() => handleSave(index)}>수정</ButtonList>
                  <ButtonList onClick={() => setShowInput(false)}>취소</ButtonList>
                </>
              ) : (
                <>
                {checkIdx === item.idx && ( // 해당 항목의 idx와 클릭된 idx가 일치할 때만 삭제 버튼 표시
                <>
                  <ButtonList onClick={() => handleEdit(index, item.income || item.expense)}>수정</ButtonList>
                  <ButtonList onClick={() => deleteAccount(checkIdx)}>삭제</ButtonList>
                </>  
                )}  
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
