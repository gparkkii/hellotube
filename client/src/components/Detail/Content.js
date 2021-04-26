/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import { SideContainer } from 'styles/container/styles';
import { IconButton } from '@material-ui/core';
import { ThumbUp, ThumbDown, PermMedia } from '@material-ui/icons';
import UserAvatar from 'components/common/UserAvatar';

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
        <InfoBox>
          <span>
            <p>조회수 {Video.views}회 </p>
            <p>
              {' '}
              ･ <UpdateTime time={Video.updatedAt} />
            </p>
          </span>
          <span>
            <IconButton>
              <ThumbUp />
              좋아요
            </IconButton>
            <IconButton>
              <ThumbDown />
              싫어요
            </IconButton>
            <IconButton>
              <PermMedia />
              저장
            </IconButton>
          </span>
        </InfoBox>
        <div>
          <AvatarBox subscribed>
            <div>
              <UserAvatar
                profileData={Video.writer}
                width="40px"
                fontSize="14px"
              />
              <p>{Video.writer?.nickname}</p>
            </div>
            <button type="button">구독중</button>
          </AvatarBox>
          <Description>{Video.description}</Description>
        </div>
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

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 8px;
  color: ${({ theme }) => theme.iconColor};
  border-bottom: ${({ theme }) => theme.borderColor};
  & span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    & button {
      font-size: 14px;
      color: ${({ theme }) => theme.iconColor};
      & svg {
        font-size: 20px;
        margin-right: 8px;
      }
    }
  }
`;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px 8px;
  padding-top: 20px;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & p {
    font-size: 14px;
    font-weight: 500;
    color: #4b7ac7;
  }
  & button {
    width: 72px;
    height: 40px;
    border-radius: 4px;
    font-size: 13px;
    background-color: #db2b25;
    color: #fff;
  }
  ${props =>
    props.subscribed &&
    css`
      & button {
        color: ${({ theme }) => theme.iconColor};
        background-color: ${({ theme }) => theme.buttonColor};
      }
    `}
`;

const Description = styled.div`
  margin-left: 54px;
  font-size: 14px;
  margin-top: 4px;
  color: ${({ theme }) => theme.textColor};
`;
