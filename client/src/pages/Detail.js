import React from 'react';
import { MarginBox } from 'styles/form/styles';
import AppLayout from 'components/common/AppLayout';
import Content from 'components/Detail/Content';
import { withRouter } from 'react-router-dom';

const Detail = ({ match }) => {
  const videoId = match.params.id;
  console.log(match);
  return (
    <AppLayout>
      <MarginBox margin="20px">
        <Content videoId={videoId} />
      </MarginBox>
    </AppLayout>
  );
};

export default withRouter(Detail);
