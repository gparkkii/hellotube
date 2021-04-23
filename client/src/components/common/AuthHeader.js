import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from 'assets/logo.png';

const AuthHeader = () => {
  return (
    <StyledHeader>
      <NavLink to="/">
        <img src={logo} alt="logo" />
        <p>HelloTube</p>
      </NavLink>
    </StyledHeader>
  );
};

export default AuthHeader;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    & img {
      width: 24px;
      margin-right: 4px;
    }
    & p {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;
