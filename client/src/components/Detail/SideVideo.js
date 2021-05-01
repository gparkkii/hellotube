import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import VideoDuration from 'library/utils/VideoDuration';

const SideVideo = ({ video }) => {
  return (
    <>
      <Link to={`/watch/${video._id}`}>
        <VideoBox>
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
              <span>
                <strong>{video.title}</strong>
              </span>
            </Title>
            <p>{video.writer.nickname}</p>
            <InfoBox>
              <div>
                <p>조회수 {video.views}회 </p>
                <p>
                  ･ <UpdateTime time={video.updatedAt} />
                </p>
              </div>
            </InfoBox>
          </TitleBox>
        </VideoBox>
      </Link>
    </>
  );
};

export default withRouter(SideVideo);

const VideoBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImgBox = styled.div`
  position: relative;
  width: 180px;
  height: 100%;
  margin-right: 8px;
  & img {
    width: 100%;
    height: 100%;
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
  width: 60%;
  display: flex;
  flex-direction: column;
  & p {
    font-size: 13px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  & span {
    & strong {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.15px;
    }
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 13px;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: #757575;
  }
`;
