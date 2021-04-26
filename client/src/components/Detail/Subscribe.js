import React from 'react';
import styled, { css } from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import { Tooltip } from '@material-ui/core';

const Subscribe = ({ Video }) => {
  return (
    <div>
      <AvatarBox subscribed>
        <div>
          <UserAvatar profileData={Video.writer} width="40px" fontSize="14px" />
          <p>{Video.writer?.nickname}</p>
        </div>
        <Tooltip title="구독 버튼">
          <button type="button">구독중</button>
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
