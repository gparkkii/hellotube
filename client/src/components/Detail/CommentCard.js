import React from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import UpdateTime from 'library/utils/UpdateTime';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbUp, ThumbDown } from '@material-ui/icons';

const CommentCard = ({ comment }) => {
  console.log(comment);
  return (
    <CardBox>
      <UserAvatar profileData={comment.writer} width="40px" fontSize="14px" />
      <CommentText>
        <div>
          <span>
            <p>{comment.writer.nickname}</p>
            <p>
              <UpdateTime time={comment.updatedAt} />
            </p>
          </span>
          <Text>{comment.content}</Text>
        </div>
        <IconBox>
          <Icons>
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
          </Icons>
          <Tooltip title="답글 달기">
            <button type="button">답글달기</button>
          </Tooltip>
        </IconBox>
      </CommentText>
    </CardBox>
  );
};

export default CommentCard;

const CardBox = styled.div`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const CommentText = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  margin-left: 12px;
  & span {
    font-size: 14px;
    & p:nth-child(1) {
      font-weight: 600;
    }
    & p:nth-child(2) {
      color: ${({ theme }) => theme.iconColor};
    }
  }
`;

const Text = styled.p`
  margin-top: 2px;
  font-size: 15px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between !important;
  width: 100%;
  margin-top: 4px;
  margin-left: -4px;
  & button {
    font-size: 13px;
    text-decoration: underline;
  }
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  & span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    color: ${({ theme }) => theme.iconColor};
    & p {
      font-size: 14px;
      font-weight: 400 !important;
    }
    & svg {
      font-size: 18px;
      color: ${({ theme }) => theme.iconColor};
    }
  }
`;
