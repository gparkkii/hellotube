import React, { useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import { Tooltip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubscribe,
  deleteSubscribe,
  getAllSubscribe,
} from 'modules/reducers/subscribe';

const Subscribe = ({ Video, userId, isAuth }) => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector(state => state.subscribe.isSubscribe);
  const Subscriber = useSelector(state => state.subscribe.subscriber);

  useEffect(() => {
    dispatch(getAllSubscribe({ subscribeTo: Video.writer._id }));
  }, [userId]);

  const onSubscribe = useCallback(() => {
    if (!isAuth) {
      alert('로그인이 필요한 동작입니다.');
    } else if (Video.writer._id === userId) {
      alert('본인의 계정은 구독할 수 없습니다.');
    } else if (isSubscribed) {
      dispatch(
        deleteSubscribe({
          subscribeTo: Video.writer._id,
          subscribeFrom: userId,
        }),
      );
    } else {
      dispatch(
        addSubscribe({ subscribeTo: Video.writer._id, subscribeFrom: userId }),
      );
    }
  }, [isSubscribed, userId, Video]);

  return (
    <div>
      <AvatarBox subscribed={isSubscribed}>
        <div>
          <UserAvatar profileData={Video.writer} width="40px" fontSize="14px" />
          <span>
            <p>{Video.writer?.nickname}</p>
            <SubscriberNumber>구독자 {Subscriber?.length}명</SubscriberNumber>
          </span>
        </div>
        <Tooltip title="구독 버튼">
          <button type="button" onClick={onSubscribe}>
            {isSubscribed ? '구독중' : '구독'}
          </button>
        </Tooltip>
      </AvatarBox>
      <Description>{Video.description}</Description>
    </div>
  );
};

export default Subscribe;

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

const SubscriberNumber = styled.p`
  font-size: 12px !important;
  font-weight: 500 !important;
  color: ${({ theme }) => theme.textColor} !important;
`;
