/* eslint-disable array-callback-return */
import React, { useEffect, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbUp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, deleteLike, setisLike } from 'modules/reducers/like';
import { InfoIcons } from 'styles/form';

const Like = ({ videoId, userId, likes, isAuth }) => {
  const dispatch = useDispatch();
  const isLiked = useSelector(state => state.likes.isLiked);

  useEffect(() => {
    if (isAuth) {
      dispatch(setisLike({ videoId, userId }));
    }
  }, [userId]);

  const onClickLike = useCallback(() => {
    if (!isAuth) {
      alert('로그인이 필요한 동작입니다.');
    } else if (isLiked) {
      dispatch(deleteLike({ videoId, userId }));
    } else {
      dispatch(addLike({ videoId, userId }));
    }
  }, [likes, videoId, userId, isLiked]);

  return (
    <InfoIcons isActive={isLiked}>
      <Tooltip title="좋아요">
        <IconButton onClick={onClickLike}>
          <ThumbUp />
        </IconButton>
      </Tooltip>
      <p>{likes?.length}</p>
    </InfoIcons>
  );
};

export default Like;
