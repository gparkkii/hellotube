import React, { useState } from 'react';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import UpdateTime from 'library/utils/UpdateTime';
import { Tooltip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

const CommentCard = ({ Comment, Video }) => {
  const [OpenReply, setOpenReply] = useState(false);
  const isAuth = useSelector(state => state.user.data.isAuth);

  return (
    <>
      <CardBox>
        <UserAvatar profileData={Comment.writer} width="40px" fontSize="14px" />
        <CommentText>
          <div>
            <span>
              <p>{Comment.writer.nickname}</p>
              <p>
                <UpdateTime time={Comment.updatedAt} />
              </p>
            </span>
            <Text>{Comment.content}</Text>
          </div>
          <IconBox>
            <Tooltip title="답글 달기">
              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  if (!isAuth) {
                    alert('로그인이 필요한 동작입니다.');
                  } else {
                    setOpenReply(!OpenReply);
                  }
                }}
              >
                답글 달기
              </button>
            </Tooltip>
          </IconBox>
          {OpenReply && <CommentForm Video={Video} Comment={Comment} />}
        </CommentText>
      </CardBox>
    </>
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
  width: 100%;
  margin-top: 4px;
  margin-left: 4px;
  & button {
    font-size: 13px;
  }
`;
