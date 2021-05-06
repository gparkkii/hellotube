import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GridContainer } from 'styles/container';
import { getAllVideos } from 'modules/reducers/video';
import EmptyStates from 'components/common/EmptyState';
import VideoSkeleton from 'components/common/VideoSkeleton';
import VideoCard from './VideoCard';

const Content = () => {
  const dispatch = useDispatch();
  const Video = useSelector(state => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  return (
    <>
      {Video.videos.length === 0 && (
        <EmptyStates statement="동영상을 업로드 해주세요" />
      )}
      <GridContainer>
        {/* {Video.getVideoDone &&
          Video.videos.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })} */}
        {/* {Video.getVideoLoading &&} */}
        {Array(12)
          .fill(' ')
          .map(index => (
            <VideoSkeleton key={index} />
          ))}
      </GridContainer>
    </>
  );
};

export default withRouter(Content);
