import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentVideos } from 'modules/reducers/video';
import { SideContainer } from 'styles/container';
import styled from 'styled-components';
import Comment from './Comment';
import Subscribe from './Subscribe';
import Like from './Like';

const Content = ({ videoId }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.video);
  const Video = useSelector(state => state.video.currentVideo);

  useEffect(() => {
    dispatch(getCurrentVideos({ videoId }));
  }, []);

  return (
    <VideoBox>
      <SideContainer>
        {status.currentVideoDone && (
          <>
            <video
              controls
              autoPlay
              loop
              controlsList="nodownload"
              src={Video.filePath}
              style={{ width: '100%' }}
              alt={Video.title}
            >
              <track kind="captions" />
            </video>
            <strong>{Video.title}</strong>
            <Like Video={Video} />
            <Subscribe Video={Video} />
            <Comment Video={Video} />
          </>
        )}
      </SideContainer>
      <div>side menu</div>
    </VideoBox>
  );
};

export default withRouter(Content);

const VideoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  & video {
    margin-bottom: 24px;
  }
  & strong {
    font-size: 18px;
    font-weight: 600;
    margin-left: 8px;
    line-height: 18px;
  }
  & p {
    margin-left: 8px;
  }
`;
