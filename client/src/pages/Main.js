import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from 'assets/logo.png';

import { FlexContainer } from 'styles/container/styles';
import AppLayout from 'components/common/AppLayout';
import Loading from 'components/common/Loading';
import Content from 'components/Main/Content';

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2300);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AppLayout>
          <Content />
        </AppLayout>
      )}
    </>
  );
};

export default Main;
