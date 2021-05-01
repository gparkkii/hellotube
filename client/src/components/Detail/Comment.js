import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments } from 'modules/reducers/comment';
import styled from 'styled-components';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import CommentReply from './CommentReply';

const Comment = ({ Video, isAuth }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.comment);
  const Comments = useSelector(state => state.comment.comments);

  useEffect(() => {
    dispatch(getAllComments(Video._id));
  }, []);

  return (
    <CommentBox>
      <h2>댓글 {(status.getCommentDone && Comments.length) || 0}개</h2>
      {isAuth && <CommentForm Video={Video} />}
      {status.getCommentDone &&
        Comments?.map(comment => {
          return (
            !comment.commentTo && (
              <React.Fragment key={comment._id}>
                <CommentCard Comment={comment} Video={Video} isAuth={isAuth} />
                <CommentReply
                  Comments={Comments}
                  ParentComment={comment._id}
                  Video={Video}
                />
              </React.Fragment>
            )
          );
        })}
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 20px 0px;
  border-top: ${({ theme }) => theme.borderColor};
  border-bottom: ${({ theme }) => theme.borderColor};
  & h2 {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
  }
`;
