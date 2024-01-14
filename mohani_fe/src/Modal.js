import styled from 'styled-components';

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
    `;
  

  
    return (
      <ModalBackground onClick={closeModal}>

      </ModalBackground>
    );
  }
  

export default Modal;