import React, { useState, useEffect } from 'react';
import AppLayout from 'components/common/AppLayout';
import Loading from 'components/common/Loading';
import Content from 'components/Main/Content';
import { MarginBox } from 'styles/form/styles';

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
          <MarginBox margin="20px">
            <Content />
          </MarginBox>
        </AppLayout>
      )}
    </>
  );
};

export default Main;
