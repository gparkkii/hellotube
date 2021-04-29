import AppLayout from 'components/common/AppLayout';
import Explore from 'components/Feed/Explore';
import MyBookmark from 'components/Feed/MyBookmark';
import MyComment from 'components/Feed/MyComment';
import MyFavorite from 'components/Feed/MyFavorite';
import MyVideo from 'components/Feed/MyVideo';
import Subscribe from 'components/Feed/Subscribe';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { MarginBox } from 'styles/form';

const Feed = ({ match }) => {
  return (
    <>
      <AppLayout>
        <MarginBox margin="20px">
          <Route exact path={`${match.path}`} component={Explore} />
          <Route path={`${match.path}/explore`} component={Explore} />
          <Route path={`${match.path}/subscribe`} component={Subscribe} />
          <Route path={`${match.path}/myvideo`} component={MyVideo} />
          <Route path={`${match.path}/mycomment`} component={MyComment} />
          <Route path={`${match.path}/myfavorite`} component={MyFavorite} />
          <Route path={`${match.path}/mybookmark`} component={MyBookmark} />
        </MarginBox>
      </AppLayout>
    </>
  );
};

export default withRouter(Feed);
