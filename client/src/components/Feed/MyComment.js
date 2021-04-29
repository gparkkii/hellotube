import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyComments } from 'modules/reducers/comment';
import { GridContainer } from 'styles/container';
import VideoCard from 'components/Main/VideoCard';

const MyComment = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Comments = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getMyComments(UserId));
  }, [UserId]);

  return (
    <GridContainer>
      {Comments.myCommentDone &&
        Comments.commentVideos.map(video => {
          return <VideoCard key={video._id} video={video} />;
        })}
    </GridContainer>
  );
};

export default MyComment;
