/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveComments } from 'modules/actions/video';
import { useForm } from 'react-hook-form';
import { Create } from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';
import { ErrorMessage } from 'styles/typography/styles';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import CommentCard from './CommentCard';

const Comment = ({ Video }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const dispatch = useDispatch();
  const Comments = useSelector(state => state.video.comments);
  const userData = useSelector(state => state.user.profile);

  const onSubmit = useCallback(
    data => {
      const variables = {
        content: data.comment,
        writer: userData._id,
        videoId: Video._id,
        commentTo: Video.writer._id,
      };
      dispatch(saveComments(variables));
    },
    [userData, Video, Comments],
  );

  return (
    <CommentBox>
      <h2>댓글 {Comments ? Comments.length : 0}개</h2>
      {userData && (
        <CommentForm onSubmit={handleSubmit(onSubmit)}>
          <UserAvatar profileData={userData} width="40px" fontSize="14px" />
          <textarea
            id="comment"
            name="comment"
            className={errors.comment ? 'errorUnderline' : null}
            placeholder="댓글을 입력해주세요"
            {...register('comment', {
              maxLength: {
                value: 100,
                message: '댓글을 100자 이내로 적어주세요',
              },
            })}
          />
          <Tooltip title="댓글 입력">
            <IconButton type="submit">
              <Create />
            </IconButton>
          </Tooltip>
        </CommentForm>
      )}
      {errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}
      {Comments.length > 0 &&
        Comments.map(comment => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 40px;
  border-top: ${({ theme }) => theme.borderColor};
  border-bottom: ${({ theme }) => theme.borderColor};
  & h2 {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  margin-left: 10px;
  & textarea {
    width: calc(100% - 112px);
    height: 30px;
    padding: 0px 14px;
    margin-left: 14px;
    background-color: transparent;
    color: ${({ theme }) => theme.textColor};
    border-bottom: ${({ theme }) => theme.borderColor};
    &:hover {
      border-bottom: 1px solid ${({ theme }) => theme.textColor};
    }
    &:focus {
      border-bottom: 2px solid ${({ theme }) => theme.textColor};
    }
  }
`;
