import { useEffect } from "react";
import HorizonLine from "./HorizonLine";

function TotalAccount({ userData }) {
  //더미 총지출 나중에 바꿀꺼
  const totalAccount = "5000*";
  // console.log(userData.memberNo);

  // 총 수입 지출 fetch GET

  const fetchTotalData = async () => {
    const memberNo = userData.memberNo;
    console.log(memberNo)
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://localhost:3000/mohani/accounts/totalMoney/${memberNo}`, {
        headers: {
          Accept: "application/json",
          Authorization: `${token}`,
        },
      });
      if(response.ok) {
        const result = await response.json();
        console.log(result);
      }else {
        alert('total 가계부 get 실패');
      }
    } catch (error){
      console.error('스케줄 get 실패 :', error);
    }
  }

  useEffect(() => {
    fetchTotalData()} , [])

  return (
    <>
      <HorizonLine hasText={false} />
      <h4 className="">이 달의 수익</h4>
      <div className="">이번 달의 총 수입은 {totalAccount} 원 입니다.</div>
      {/* <HorizonLine hasText={true} text="글자" /> */}
      <h4 className="">이 달의 지출</h4>
      <div className="">이번 달의 총 지출은 {totalAccount} 원 입니다.</div>
    </>
  );
}

export default TotalAccount;
