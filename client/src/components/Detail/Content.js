import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentVideos } from 'modules/reducers/video';
import { getAllDislikes, getAllLikes } from 'modules/reducers/like';
import { SideContainer } from 'styles/container';
import { media } from 'styles/media_query';
import styled from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import Subscribe from './Subscribe';
import Comment from './Comment';
import Dislike from './Dislike';
import Playlist from './Playlist';
import Like from './Like';
import DetailSide from './DetailSide';

const Content = ({ videoId }) => {
  const dispatch = useDispatch();
  const { status, Video, Likes, isAuth } = useSelector(state => ({
    status: state.video,
    Video: state.video.currentVideo,
    Likes: state.likes,
    isAuth: state.user.data.isAuth,
  }));
  const UserId = window.localStorage.getItem('userId');

  useEffect(() => {
    dispatch(getCurrentVideos({ videoId }));
    dispatch(getAllLikes({ videoId }));
    dispatch(getAllDislikes({ videoId }));
  }, [videoId, UserId]);

  return (
    <Container>
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
              <InfoBox>
                <span>
                  <p>
                    조회수 {Video.views}회{'  '} ･ {'  '}
                    <UpdateTime time={Video.updatedAt} />
                  </p>
                </span>
                <span>
                  <Like
                    videoId={videoId}
                    likes={Likes.likes}
                    userId={UserId}
                    isAuth={isAuth}
                  />
                  <Dislike
                    videoId={videoId}
                    dislikes={Likes.dislikes}
                    userId={UserId}
                    isAuth={isAuth}
                  />
                  <Playlist videoId={videoId} userId={UserId} isAuth={isAuth} />
                </span>
              </InfoBox>
              <Subscribe Video={Video} userId={UserId} isAuth={isAuth} />
              <Comment Video={Video} isAuth={isAuth} />
            </>
          )}
        </SideContainer>
      </VideoBox>
      <SideMenu>
        <DetailSide />
      </SideMenu>
    </Container>
  );
};

export default withRouter(Content);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  ${media.tablet`
    display: flex;
    flex-direction: column;
  `}
`;

const VideoBox = styled.div`
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

const SideMenu = styled.div`
  min-width: 360px;
  margin-left: 20px;
  ${media.tablet`
    margin-left: 0px;
    margin-top: 20px;
  `}
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.iconColor};
  border-bottom: ${({ theme }) => theme.borderColor};
  & span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    color: ${({ theme }) => theme.iconColor};
    & p {
      font-size: 15px;
      margin-right: 8px;
    }
    & svg {
      font-size: 20px;
    }
  }
`;
