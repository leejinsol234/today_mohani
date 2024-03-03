//화면 분할 레이아웃 설정

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height : 90vh;
`;

const Box = styled.div`
  flex: ${(props) => props.weight}; // props로 받은 가중치(weight) 사용
  & + & {
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
//상세일정 분할
const DetailContainer = styled.div`
  height : 70%;
  display : flex;
  flex-direction: column;
`;

const DetailBox = styled.div`
  flex: ${(props) => props.weight}; // props로 받은 가중치(weight) 사용
  & + & {
    border-bottom : solid #000;
    margin-bottom : 0.5rem;
  }
  padding : 0 5px;
  border-radius : 5px;
  box-shadow : 0 0 5px 0 gray;
`;

export function SplitDetailScreen ({ children, topWeight,middleWeight, bottomWeight}) {
  const [top,middle, bottom] = children; 
  
  return (
    <DetailContainer>
      <DetailBox weight={topWeight}>{top}</DetailBox>
      <DetailBox weight={middleWeight}>{middle}</DetailBox>
      <DetailBox weight={bottomWeight}>{bottom}</DetailBox>
    </DetailContainer>
  );
};

