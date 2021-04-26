import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Create } from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';
import { ErrorMessage } from 'styles/typography/styles';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';
import CommentCard from './CommentCard';

const Comment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const Comments = useSelector(state => state.video.Comments);
  const userData = useSelector(state => state.user.profile);

  const onSubmit = useCallback(data => {
    console.log(data);
  }, []);

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
      {Comments && <CommentCard />}
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0px;
  border-top: ${({ theme }) => theme.borderColor};
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
    width: calc(100% - 120px);
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
