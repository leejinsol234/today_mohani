//화면 분할 레이아웃 설정
import "./App.css";
import styled, {css} from "styled-components";
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

  ${(props) =>
    props.highlight &&
    css`
      background-color: #e5f3f3; // 2번째 Box에 배경색상 추가
      min-width : 200px;
    `}

    ${(props) => 
    props.right &&
  css`
      min-width : 240px;
  `}
`;


const SplitScreen = ({ children, leftWeight,middleWeight, rightWeight}) => {
  const [left,middle, right] = children; 
  
  return (
    <Container>
      <Box weight={leftWeight}>{left}</Box>
      <Box weight={middleWeight} highlight="true">{middle}</Box>
      <Box weight={rightWeight} right="true">{right}</Box>
    </Container>
  );
};

export default SplitScreen;
//상세일정 분할
const DetailContainer = styled.div`
  height : 100%;
  display : flex;
  flex-direction: column;
  gap : 10px;
`;

// flex: ${(props) => props.height}; // props로 받은 가중치(weight) 사용
const DetailBox = styled.div`
    border-bottom : solid #000;
    margin-bottom : 0.5rem;
  padding : 5px 5px;
  border-radius : 5px;
  box-shadow : 0 0 5px 0 gray;
  
`;

export function SplitDetailScreen ({ children, topHeight,middleHeight, bottomHeight}) {
  const [top, middle, bottom] = children; 
  
  return (
    <DetailContainer>
      <DetailBox height={topHeight}>{top}</DetailBox>
      <DetailBox height={middleHeight}>{middle}</DetailBox>
      <DetailBox height={bottomHeight}>{bottom}</DetailBox>
    </DetailContainer>
  );
};

