/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridContainer } from 'styles/container/styles';
import { getAllVideos } from 'modules/actions/video';
import VideoCard from './VideoCard';

const Content = () => {
  const dispatch = useDispatch();
  const Video = useSelector(state => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  return (
    <>
      <GridContainer>
        {Video?.success &&
          Video.videos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default Content;
