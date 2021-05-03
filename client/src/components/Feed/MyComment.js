import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyComments } from 'modules/reducers/comment';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import VideoCard from 'components/Main/VideoCard';
import EmptyStates from 'components/common/EmptyState';

const MyComment = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Comments = useSelector(state => state.comment);

  useEffect(() => {
    dispatch(getMyComments(UserId));
  }, [UserId]);

  return (
    <>
      <FeedHeader>
        <h2>내가 댓글단 동영상</h2>
      </FeedHeader>
      {Comments.commentVideos.length === 0 && (
        <EmptyStates statement="동영상을 조회하고 댓글을 달아보세요!" />
      )}
      <GridContainer>
        {Comments.myCommentDone &&
          Comments.commentVideos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default MyComment;
