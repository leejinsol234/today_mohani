//화면 분할 레이아웃 설정

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height : 90vh;
`;

const Box = styled.div`
  flex: ${(props) => props.weight}; // props로 받은 가중치(weight) 사용
  & + & {
    border-left : solid #000;
    margin-left : 0.5rem;
  }
  padding : 0.5rem;
`;


const SplitScreen = ({ children, leftWeight,middleWeight, rightWeight}) => {
  const [left,middle, right] = children; 
  
  return (
    <Container>
      <Box weight={leftWeight}>{left}</Box>
      <Box weight={middleWeight}>{middle}</Box>
      <Box weight={rightWeight}>{right}</Box>
    </Container>
  );
};

export default SplitScreen;