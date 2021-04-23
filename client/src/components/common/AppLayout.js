import React from 'react';
import { WrapContainer } from 'styles/container/styles';
import Footer from './Footer';
import Header from './Header';

const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <WrapContainer>{children}</WrapContainer>
      <Footer />
    </>
  );
};

export default AppLayout;
