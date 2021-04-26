import React from 'react';
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MarginBox } from 'styles/form/styles';
import AppLayout from 'components/common/AppLayout';
import Content from 'components/Detail/Content';

const Detail = ({ match }) => {
  const theme = createMuiTheme();
  const videoId = match.params.id;

  return (
    <AppLayout>
      <MarginBox margin="20px">
        <ThemeProvider theme={theme}>
          <Content videoId={videoId} />
        </ThemeProvider>
      </MarginBox>
    </AppLayout>
  );
};

export default withRouter(Detail);
