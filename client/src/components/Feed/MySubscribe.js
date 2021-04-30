import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mySubscribe } from 'modules/reducers/subscribe';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import VideoCard from 'components/Main/VideoCard';

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
        <h2>내가 구독한 유튜버 영상</h2>
      </FeedHeader>
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
