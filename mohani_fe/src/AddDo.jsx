import React, { useEffect, useState } from "react";


export default function AddDo() {

  return(
    
    <div className="page">
      <div className="addtitleWrap">
        일정추가
      </div>

      <div>
        <div className="addWrap">
          <div>색깔</div>
          <div className="addinputWrap"><input className="addinput" placeholder="일정 제목을 입력해 주세요."/></div>
        </div>

        <div className="addWrap">
          <div>달력</div>
          <div className="addCalinputWrap">
            <input className="addinput" placeholder="2014.01.10"/>
          </div>
          ~
          <div style={{marginLeft : 10}} className="addCalinputWrap">
            <input className="addinput" placeholder="2014.01.11"/>
          </div>
        </div>

        <div className="addWrap">
          <div>장소</div>
          <div className="addinputWrap"><input className="addinput" placeholder="장소 입력"/></div>
        </div>

        <div className="addWrap">
          <div>금액</div>
          <div className="addinputWrap"><input className="addinput" placeholder="금액 입력"/></div>
        </div>

        <div className="addWrap">
          <div>메모</div>
          <div className="addinputWrap"><input className="addMemoinput" placeholder="메모 입력"/></div>
        </div>

        <div className="flex">
          <button className="addButton">등록</button>
        </div>

      </div>
    </div>
    
  )
}