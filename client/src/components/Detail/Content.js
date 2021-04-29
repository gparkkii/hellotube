import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentVideos } from 'modules/reducers/video';
import {
  getAllDislikes,
  getAllLikes,
  setisDislike,
  setisLike,
} from 'modules/reducers/like';
import { SideContainer } from 'styles/container';
import styled from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import Subscribe from './Subscribe';
import Comment from './Comment';
import Dislike from './Dislike';
import Playlist from './Playlist';
import Like from './Like';

const Content = ({ videoId }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.video);
  const Video = useSelector(state => state.video.currentVideo);
  const Likes = useSelector(state => state.likes);
  const UserId = window.localStorage.getItem('userId');

  useEffect(() => {
    dispatch(getCurrentVideos({ videoId }));
    dispatch(getAllLikes({ videoId }));
    dispatch(getAllDislikes({ videoId }));
    dispatch(setisLike({ videoId, userId: UserId }));
    dispatch(setisDislike({ videoId, userId: UserId }));
  }, [videoId, UserId]);

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
            <InfoBox>
              <span>
                <p>조회수 {Video.views}회 </p>
                <p>
                  {' '}
                  ･ <UpdateTime time={Video.updatedAt} />
                </p>
              </span>
              <span>
                <Like videoId={videoId} likes={Likes.likes} userId={UserId} />
                <Dislike
                  videoId={videoId}
                  dislikes={Likes.dislikes}
                  userId={UserId}
                />
                <Playlist videoId={videoId} />
              </span>
            </InfoBox>
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
