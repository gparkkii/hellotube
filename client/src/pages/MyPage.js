import React from 'react';
import AppLayout from 'components/common/AppLayout';
import Content from 'components/MyPage/Content';
import { MarginBox } from 'styles/form';

const MyPage = () => {
  return (
    <AppLayout>
      <MarginBox margin="20px">
        <Content />
      </MarginBox>
    </AppLayout>
  );
};

export default MyPage;
