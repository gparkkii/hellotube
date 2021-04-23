import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FlexContainer } from 'styles/container/styles';
import styled from 'styled-components';
import logo from 'assets/logo.png';
import Stepper from 'components/SignUp/Stepper';
import AuthLayout from 'components/common/AuthLayout';

const SignUp = () => {
  return (
    <AuthLayout>
      <FlexContainer>
        <StyledHeader>
          <NavLink to="/">
            <img src={logo} alt="logo" />
            <p>HelloTube</p>
          </NavLink>
        </StyledHeader>
        <Stepper />
      </FlexContainer>
    </AuthLayout>
  );
};

export default withRouter(SignUp);

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
