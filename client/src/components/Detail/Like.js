/* eslint-disable array-callback-return */
import React, { useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deleteLike } from 'modules/reducers/like';

const Like = ({ videoId, userId, likes }) => {
  const dispatch = useDispatch();
  const isLiked = useSelector(state => state.likes.isLiked);

  const onClickLike = useCallback(() => {
    console.log(isLiked);
    if (isLiked) {
      dispatch(deleteLike({ videoId, userId }));
    } else {
      dispatch(addLike({ videoId, userId }));
    }
  }, [likes, videoId, userId, isLiked]);

  return (
    <span>
      <Tooltip title="좋아요">
        <IconButton onClick={onClickLike}>
          <ThumbUp />
        </IconButton>
      </Tooltip>
      <p>{likes?.length}</p>
    </span>
  );
};

export default Like;
