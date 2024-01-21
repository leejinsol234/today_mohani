import React from "react";

export default function CreateUser(){

  return (
    <div className="CreatePage">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        <div className="CreateInputTitle">이메일</div>
        <div className="CreateInputWrap">
          <input type='text' className="CreateInput" placeholder="이메일" />
        </div>
        <div className="CreateInputTitle">비밀번호</div>
        <div className="CreateInputWrap">
          <input type='text' className="CreateInput" placeholder="비밀번호" />
        </div>
        <div className="CreateInputTitle">비밀번호 확인</div>
        <div className="CreateInputWrap">
          <input type='text' className="CreateInput" placeholder="비밀번호 확인" />
        </div>
        <div className="CreateInputTitle">이름</div>
        <div className="CreateInputWrap">
          <input type='text' className="CreateInput" placeholder="이름" />
        </div>
        <div className="CreateInputTitle">전화번호</div>
        <div className="CreateInputWrap">
          <input type='text' className="CreateInput" placeholder="전화번호" />
        </div>
      </div>
      <div className="AgreeBoxWrap">
        <input type="checkbox" className="CreateAgreeBox"/>
        이용약관 및 개인정보 처리방침에 동의합니다.
      </div>
      <div>
        <button className="CreateAddButton">회원가입</button>
      </div>
      <div className="CreateFooter">
        <div className="CreateFooter1">이미 계정이 있으신가요?</div>
        <button className="CreateFooter2">로그인  </button>
      </div>
    </div>
  )
}

