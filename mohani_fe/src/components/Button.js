//Button 요소의 style 을 정의하는 컴포넌트

import { darken } from "polished";
import { css, styled } from "styled-components";

//색상지정
//배경 설정 hover포함
const colorStyles = css`
  ${() => {
    const selected = '#228be6';
    return css`
      background: ${selected};
      &:hover {
        background: ${darken(0.3, selected)};
      }
      &:active {
        background: ${darken(0.3, selected)};
      }
    `;
  }}
`;
const StyledButton = styled.button`
  // display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  //너비지정
  width : 40%;
  min-width: 15px;
  max-width: 170px;

  //높이와 내부 컨텐츠 지정
  height: 2.25rem;
  line-height : 2.25rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;

  //글자
  text-align: center;
  white-space : nowrap;

  /*정의된 컬러스타일을 객체로 선언*/
  ${colorStyles}

  //모달보다 더 위에있게
  position : relative;
  z-index : 4;

  & + & {
    margin-left : 2rem;
  }
  `

export default function Button({children,color}){
  return( 
      <StyledButton color={color}>
        {children}
      </StyledButton>
  );
}