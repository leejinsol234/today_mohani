import React from "react";
import styled, { css } from "styled-components";

const Line = styled.div`
width: 100%;
border-bottom: 1px solid #111;
margin: 10px 0;
text-align: center;

${(props) =>
 props.hasText &&
   css`
    line-height: 0.1em;
`}
`;

const Span = styled.span`
background: #fff;
padding: 0 10px;
`;

function HorizonLine({ hasText,text }){
  return (
    <Line hasText={hasText}>
      {hasText ? <Span>{text}</Span> : <Span />}  
    </Line>
  );
};

export default HorizonLine;