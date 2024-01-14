import styled,{keyframes} from 'styled-components';

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
      <ModalBackground onClick={closeModal}>

      </ModalBackground>
    );
  }
  

export default Modal;