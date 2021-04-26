/* eslint-disable jsx-a11y/media-has-caption */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SideContainer } from 'styles/container/styles';
import styled from 'styled-components';
import Comment from './Comment';
import Subscribe from './Subscribe';
import Like from './Like';

const Content = ({ videoId }) => {
  const [Video, setVideo] = useState('');

  useEffect(() => {
    axios.post('/api/video/detail', { videoId }).then(response => {
      console.log(response);
      if (response.data.success) {
        setVideo(response.data.video);
      } else {
        alert('비디오 가져오는데 실패했습니다.');
      }
    });
  }, []);

  return (
    <VideoBox>
      <SideContainer>
        <video
          controls
          autoPlay
          loop
          controlsList="nodownload"
          src={Video.filePath}
          style={{ width: '100%' }}
          alt={Video.title}
        >
          <track
            src="sub_kr.vtt"
            kind="subtitles"
            srcLang="ko"
            label="Korean"
          />
          <track
            src="sub_en.vtt"
            kind="subtitles"
            srcLang="en"
            label="English"
          />
        </video>
        <strong>{Video.title}</strong>
        <Like Video={Video} />
        <Subscribe Video={Video} />
        <Comment />
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
