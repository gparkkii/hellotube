import React from 'react';
import { useSelector } from 'react-redux';
import { WrapContainer } from 'styles/container';
import Footer from './Footer';
import Header from './Header';

const AppLayout = ({ children }) => {
  const isAuth = useSelector(state => state.user.data.isAuth);
  return (
    <>
      <Header />
      <WrapContainer isAuth={isAuth}>{children}</WrapContainer>
      <Footer />
    </>
  );
};

export default AppLayout;
