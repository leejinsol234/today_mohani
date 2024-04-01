import { useEffect, useState } from "react";
import HorizonLine from "./HorizonLine";
import moment from "moment";


function TotalAccount({ totalMoney, value, income, expend }) {




  return (
    <>
      <HorizonLine hasText={false} />
      <h4 className="">이 달의 수익</h4>
      <div className="">이번 달의 총 수입은 {income} 원 입니다.</div>
      {/* <HorizonLine hasText={true} text="글자" /> */}
      <h4 className="">이 달의 지출</h4>
      <div className="">이번 달의 총 지출은 {expend} 원 입니다.</div>
    </>
  );
}

export default TotalAccount;
