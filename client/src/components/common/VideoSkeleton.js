import React from 'react';
import styled from 'styled-components';

const VideoSkeleton = () => {
  return (
    <VideoBox>
      <Thumbnail>
        <div>
          <img src="" alt="empty" />
        </div>
      </Thumbnail>
      <TitleBox>
        <Avatar />
        <Lines>
          <LongLine />
          <ShortLine />
        </Lines>
      </TitleBox>
    </VideoBox>
  );
};

export default VideoSkeleton;

const VideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 70%;
  background-color: #eaeaea;
  border-radius: 4px;
  & div {
    width: 100%;
    height: 70%;
  }
  & img {
    width: 100%;
    height: 100%;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background-color: #eaeaea;
  border-radius: 50px;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  & div {
    margin: 4px 0px;
  }
`;

const LongLine = styled.div`
  width: 240px;
  height: 16px;
  background-color: #eaeaea;
`;

const ShortLine = styled.div`
  width: 160px;
  height: 16px;
  background-color: #eaeaea;
`;
