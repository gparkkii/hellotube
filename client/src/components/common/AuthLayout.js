import React from 'react';
import { WrapContainer } from 'styles/container';

const AuthLayout = ({ children }) => {
  return (
    <>
      <WrapContainer>{children}</WrapContainer>
    </>
  );
};

export default AuthLayout;
