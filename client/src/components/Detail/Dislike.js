import React, { useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addDislike, deleteDislike } from 'modules/reducers/like';

const Dislike = ({ videoId, userId, dislikes }) => {
  const dispatch = useDispatch();
  const isDisliked = useSelector(state => state.likes.isDisliked);

  const onClickDislike = useCallback(() => {
    if (isDisliked) {
      dispatch(deleteDislike({ videoId, userId }));
    } else {
      dispatch(addDislike({ videoId, userId }));
    }
  }, [videoId, userId, isDisliked]);
  return (
    <span>
      <Tooltip title="싫어요">
        <IconButton onClick={onClickDislike}>
          <ThumbDown />
        </IconButton>
      </Tooltip>
      <p>{dislikes?.length}</p>
    </span>
  );
};

export default Dislike;
