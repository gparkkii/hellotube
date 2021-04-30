import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideos } from 'modules/reducers/video';
import SideVideo from './SideVideo';

const DetailSide = () => {
  const dispatch = useDispatch();
  const Video = useSelector(state => state.video);

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);

  return (
    <>
      {Video.getVideoDone &&
        Video.videos.map(video => {
          return <SideVideo key={video._id} video={video} />;
        })}
    </>
  );
};

export default DetailSide;
