import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyVideos } from 'modules/reducers/video';
import { GridContainer } from 'styles/container';
import VideoCard from 'components/Main/VideoCard';

const MyVideo = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Videos = useSelector(state => state.video);

  useEffect(() => {
    dispatch(getMyVideos(UserId));
  }, [UserId]);

  return (
    <GridContainer>
      {Videos.myVideosDone &&
        Videos.myVideos.map(video => {
          return <VideoCard key={video._id} video={video} />;
        })}
    </GridContainer>
  );
};

export default MyVideo;
