import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyVideos } from 'modules/reducers/video';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import VideoCard from 'components/Main/VideoCard';
import EmptyStates from 'components/common/EmptyState';

const MyVideo = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Videos = useSelector(state => state.video);

  useEffect(() => {
    dispatch(getMyVideos(UserId));
  }, [UserId]);

  return (
    <>
      <FeedHeader>
        <h2>내 동영상</h2>
      </FeedHeader>
      {Videos.myVideos.length === 0 && (
        <EmptyStates statement="동영상을 업로드 해주세요" />
      )}
      <GridContainer>
        {Videos.myVideosDone &&
          Videos.myVideos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default MyVideo;
