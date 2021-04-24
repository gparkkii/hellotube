import React, { useState, useEffect } from 'react';
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
