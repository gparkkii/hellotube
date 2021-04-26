import React from 'react';
import styled from 'styled-components';
import UpdateTime from 'library/utils/UpdateTime';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbUp, ThumbDown, PermMedia } from '@material-ui/icons';

const Like = ({ Video }) => {
  return (
    <InfoBox>
      <span>
        <p>조회수 {Video.views}회 </p>
        <p>
          {' '}
          ･ <UpdateTime time={Video.updatedAt} />
        </p>
      </span>
      <span>
        <span>
          <Tooltip title="좋아요">
            <IconButton>
              <ThumbUp />
            </IconButton>
          </Tooltip>
          좋아요
        </span>
        <span>
          <Tooltip title="싫어요">
            <IconButton>
              <ThumbDown />
            </IconButton>
          </Tooltip>
          싫어요
        </span>
        <span>
          <Tooltip title="저장">
            <IconButton>
              <PermMedia />
            </IconButton>
          </Tooltip>
          저장
        </span>
      </span>
    </InfoBox>
  );
};

export default Like;

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
      }
    }
  }
`;
