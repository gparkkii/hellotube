import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mySubscribe } from 'modules/reducers/subscribe';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import styled from 'styled-components';
import VideoCard from 'components/Main/VideoCard';
import UserAvatar from 'components/common/UserAvatar';

const MySubscribe = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Subscribed = useSelector(state => state.subscribe);

  useEffect(() => {
    dispatch(mySubscribe({ subscribeFrom: UserId }));
  }, [UserId]);

  return (
    <>
      <FeedHeader>
        <h2>내가 구독한 유튜버</h2>
      </FeedHeader>
      <AvatarBox>
        {Subscribed.mySubscribeDone &&
          Subscribed.subscribeTo.map(user => {
            return (
              <span key={user._id}>
                <UserAvatar profileData={user} width="68px" fontSize="20px" />
                <p>{user.nickname}</p>
              </span>
            );
          })}
      </AvatarBox>
      <GridContainer>
        {Subscribed.mySubscribeDone &&
          Subscribed.mySubscribes.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default MySubscribe;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
  padding-bottom: 20px;
  overflow-x: scroll;
  & span {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px;
    & p {
      margin-top: 8px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
