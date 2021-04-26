/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SmsOutlined } from '@material-ui/icons';
import CommentCard from './CommentCard';

const CommentReply = ({ Comments, Video, ParentComment }) => {
  const [CommentNumber, setCommentNumber] = useState(0);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    Comments.map(comment => {
      if (comment.commentTo === ParentComment) {
        commentNumber += 1;
      }
    });
    setCommentNumber(commentNumber);
  }, [Comments, ParentComment]);

  const renderReplyComment = parentId =>
    Comments.map(comment => {
      console.log(parentId);
      console.log(comment);
      return (
        comment.commentTo === parentId && (
          <React.Fragment key={comment._id}>
            <div>
              <CommentCard Comment={comment} Video={Video} />
              <CommentReply
                Comments={Comments}
                ParentComment={comment.writer._id}
                Video={Video}
              />
            </div>
          </React.Fragment>
        )
      );
    });

  return (
    <ReplyBox>
      {CommentNumber > 0 && (
        <CommentButton
          type="button"
          onClick={e => {
            e.preventDefault();
            setisOpen(!isOpen);
          }}
        >
          <SmsOutlined />
          <p>{CommentNumber} 개의 댓글 보기</p>
        </CommentButton>
      )}
      {isOpen && renderReplyComment(ParentComment)}
    </ReplyBox>
  );
};

export default CommentReply;

const ReplyBox = styled.div`
  font-size: 14px;
  margin-left: 62px;
  margin-top: -10px;
`;

const CommentButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  & p {
    color: #065fd4;
  }
  & svg {
    font-size: 16px;
    color: #065fd4;
  }
`;
