import React, {useMemo} from 'react';
import moment from 'moment';
import '../App.css'
import ButtonList from './ButtonList';
import { useState,useEffect } from 'react';

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
  const [editedMemo, setEditedMemo] = useState("");
  const [editedin_ex, setEditin_ex] = useState("");
  const [checkIdx, setCheckIdx] = useState();

    // 원래의 값을 저장할 상태 관리
    const [originalValue, setOriginalValue] = useState("");
    const [originalMemo, setOriginalMemo] = useState("");

  //인풋창 보여줄지 말지
  const [showInput, setShowInput] = useState(false);


  const handleEdit = (index, value, memo) => {
    setEditIndex(index);
    setEditedValue(value);
    setOriginalValue(value);
    setEditedMemo(memo);
    setOriginalMemo(memo);
    setEditin_ex(value)
  };

  const handleSave = async (index) => {
    const token = localStorage.getItem("accessToken");
    try {
      // 여기서 수정된 값을 API로 보냅니다.
      const response = await fetch(`/mohani/accounts/update/${filteredAccountData[index].idx}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          money: editedValue,
          memo: editedMemo,
          in_ex: editedin_ex
        }),
      });
  
      if (!response.ok) {
        throw new Error("수정 실패했습니다.");
      }

      //수정 후 바로 렌더링
      filteredAccountData[index].money = editedValue;
      filteredAccountData[index].memo = editedMemo;
  
      // 수정 후 상태 초기화
      setEditIndex(null);
      setEditedValue("");
      setEditedMemo("");
      setEditin_ex("")

      console.log(value)

    } catch (error) {
      console.error("저장 실패:", error);
    }
  };


  //수정 후 나오는 취소 버튼
  const handleCancel = () => {
    // 취소 버튼 클릭 시 원래의 값으로 되돌리기
    setEditedValue(originalValue);
    setEditedMemo(originalMemo);
    setEditIndex(null);
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
              <div className="account_type">{item.in_ex ? "수입" : "지출"}</div>
              {editIndex === index ? (
                <>
                  {/* 수정 모드일 때 */}
                  <div className='UpdateccountInputWrap'>
                  <input type="text" className='UpdateaccountInput' value={editedValue} onChange={(e) => setEditedValue(e.target.value)} />
                  <input type="text" className='UpdateaccountInput' value={editedMemo} onChange={(e) => setEditedMemo(e.target.value)} />
                  </div>
                </>
              ) : (
                <>
                  {/* 보기 모드일 때 */}
                  <div className="account_memo">{item.money}</div>
                  <div className="account_memo">{item.memo}</div>
                </>
              )}
              {editIndex === index ? (
                <>
                  {/* 수정 모드 버튼 */}
                  <ButtonList onClick={() => handleSave(index)}>등록</ButtonList>
                  <ButtonList onClick={handleCancel}>취소</ButtonList>
                </>
              ) : (
                <>
                  {/* 보기 모드 버튼 */}
                  <ButtonList onClick={() => handleEdit(index, item.money, item.memo)}>수정</ButtonList>
                  <ButtonList onClick={() => deleteAccount(item.idx)}>삭제</ButtonList>
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
