import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveComments } from 'modules/reducers/comment';
import { useForm } from 'react-hook-form';
import { Create } from '@material-ui/icons';
import { Tooltip, IconButton } from '@material-ui/core';
import { ErrorMessage } from 'styles/typography';
import styled from 'styled-components';
import UserAvatar from 'components/common/UserAvatar';

const CommentForm = ({ Video, Comment }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.profile);

  const onSubmit = useCallback(
    data => {
      const variables = {
        content: data.comment,
        writer: userData._id,
        videoId: Video._id,
        commentTo: `${Comment ? Comment.writer._id : Video.writer._id}`,
      };
      if (variables.writer === variables.commentTo) {
        alert('본인의 댓글에 댓글을 달 수 없습니다.');
      } else {
        dispatch(saveComments(variables));
        reset();
      }
    },
    [userData, Video],
  );

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
      </StyledForm>
      {errors.comment && <ErrorMessage>{errors.comment.message}</ErrorMessage>}
    </>
  );
};

export default CommentForm;

const StyledForm = styled.form`
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
