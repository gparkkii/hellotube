import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import VideoDuration from 'library/utils/VideoDuration';
import UserAvatar from '../common/UserAvatar';

const VideoCard = ({ video }) => {
  return (
    <>
      <Link to={`/watch/${video._id}`}>
        <ImgBox>
          <img src={video.thumbnail} alt={video.thumbnail} />
          <Duration>
            <span>
              <VideoDuration duration={video.fileDuration} />
            </span>
          </Duration>
        </ImgBox>
        <TitleBox>
          <Title>
            <UserAvatar
              profileData={video.writer}
              width="40px"
              fontSize="14px"
            />
            <span>
              <strong>{video.title}</strong>
              <p>{video.description}</p>
            </span>
          </Title>
          <InfoBox>
            <p>{video.writer.nickname}</p>
            <div>
              <p>조회수 {video.views}회 </p>
              <p>
                {' '}
                ･ <UpdateTime time={video.updatedAt} />
              </p>
            </div>
          </InfoBox>
        </TitleBox>
      </Link>
    </>
  );
};

export default withRouter(VideoCard);

const ImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 70%;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;

const Duration = styled.div`
  bottom: 8px;
  right: 8px;
  position: absolute;
  margin: 4px;
  color: #fff;
  background-color: rgba(17, 17, 17, 0.8);
  opacity: 0.8;
  padding: 2px 6px;
  border-radius: 2px;
  letter-spacing: 0.5px;
  font-size: 14px;
  font-weight: 500;
`;

const TitleBox = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 12px;
  margin-left: 10px;
  & span {
    margin-left: 10px;
    & strong {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.15px;
    }
    & p {
      font-size: 15px;
    }
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 60px;
  margin-top: 4px;
  font-size: 13px;
  color: #4b7ac7;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 8px;
    color: #757575;
  }
`;
