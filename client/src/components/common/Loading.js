import React from 'react';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import { FlexContainer } from 'styles/container';
import { bounce } from 'styles/keyframes';

const Loading = () => {
  return (
    <FlexContainer>
      <LoadingBox>
        <MainTitle>
          <LogoImg src={logo} alt="webpack" />
          <br /> HelloTube
        </MainTitle>
      </LoadingBox>
      <Footer
        href="https://github.com/gparkkii/create-my-app"
        target="_blank"
        rel="noreferrer noopener"
      >
        <p>© gparkkii : HelloTube created by gparkkii</p>
      </Footer>
    </FlexContainer>
  );
};

export default Loading;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-name: ${bounce};
  animation-iteration-count: infinite;
  margin-top: 80px;
`;

const MainTitle = styled.h2`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
`;

const Footer = styled.a`
  font-size: 14px;
  color: #757575;
  margin-top: 15px;
`;

const LogoImg = styled.img`
  width: 108px;
  margin-bottom: -25px;
`;
