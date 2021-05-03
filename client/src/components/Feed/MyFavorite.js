import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyLikes } from 'modules/reducers/like';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import VideoCard from 'components/Main/VideoCard';
import EmptyStates from 'components/common/EmptyState';

const MyFavorite = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Likes = useSelector(state => state.likes);

  useEffect(() => {
    dispatch(getMyLikes(UserId));
  }, [UserId]);

  return (
    <>
      <FeedHeader>
        <h2>내가 좋아요한 영상</h2>
      </FeedHeader>
      {Likes.likeVideos.length === 0 && (
        <EmptyStates statement="맘에드는 동영상에 좋아요를 눌러보세요!" />
      )}
      <GridContainer>
        {Likes.myLikesDone &&
          Likes.likeVideos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default MyFavorite;
