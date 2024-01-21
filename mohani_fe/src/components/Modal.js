import styled,{keyframes} from 'styled-components';
import React from 'react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;


function Modal({ closeModal }) {
    const ModalBackground = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;
      animation: ${fadeIn} 0.5s ease;
    `;
  

  
    return (
      <>
        <ModalBackground onClick={closeModal}/>
      <div className="page">
      <div className="AddTitleWrap">
        일정추가
      </div>

      <div>
        <div className="AddWrap">
          <div>색깔</div>
          <div className="AddInputWrap"><input className="AddInput" placeholder="일정 제목을 입력해 주세요."/></div>
        </div>

        <div className="AddWrap">
          <div>달력</div>
          <div className="AddCalInputWrap">
            <input className="AddInput" placeholder="2014.01.10"/>
          </div>
          ~
          <div style={{marginLeft : 10}} className="AddCalInputWrap">
            <input className="AddInput" placeholder="2014.01.11"/>
          </div>
        </div>

        <div className="AddWrap">
          <div>장소</div>
          <div className="AddInputWrap"><input className="AddInput" placeholder="장소 입력"/></div>
        </div>

        <div className="AddWrap">
          <div>금액</div>
          <div className="AddInputWrap"><input className="AddInput" placeholder="금액 입력"/></div>
        </div>

        <div className="AddWrap">
          <div>메모</div>
          <div className="AddInputWrap"><input className="AddMemoInput" placeholder="메모 입력"/></div>
        </div>

        <div className="flex">
          <button className="AddButton">등록</button>
        </div>

      </div>
    </div>
      
      </>
    );
  }
  

export default Modal;