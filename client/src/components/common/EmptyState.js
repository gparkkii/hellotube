import React from 'react';
import styled from 'styled-components';
import emptystate from 'assets/emptystate.png';

const EmptyStates = ({ statement }) => {
  return (
    <EmptyBox>
      <img src={emptystate} alt="emptystate" />
      아직 데이터가 존재하지 않습니다.
      <br /> {statement}
    </EmptyBox>
  );
};

export default EmptyStates;

const EmptyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: ${({ theme }) => theme.borderColor};
  padding: 120px 0px;
  border-radius: 20px;
  font-size: 16px;
  & img {
    width: 148px;
    margin-bottom: 20px;
  }
`;
