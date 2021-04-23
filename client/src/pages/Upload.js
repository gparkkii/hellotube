import React from 'react';
import { FlexContainer } from 'styles/container/styles';
import AppLayout from 'components/common/AppLayout';
import Content from '../components/Upload/Content';

const Upload = () => {
  return (
    <AppLayout>
      <FlexContainer>
        <Content />
      </FlexContainer>
    </AppLayout>
  );
};

export default Upload;
