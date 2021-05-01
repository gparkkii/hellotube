import React, { useCallback, useEffect } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { ThumbDown } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addDislike, deleteDislike, setisDislike } from 'modules/reducers/like';
import { InfoIcons } from 'styles/form';

const Dislike = ({ videoId, userId, dislikes, isAuth }) => {
  const dispatch = useDispatch();
  const isDisliked = useSelector(state => state.likes.isDisliked);

  useEffect(() => {
    if (isAuth) {
      dispatch(setisDislike({ videoId, userId }));
    }
  }, [userId]);

  const onClickDislike = useCallback(() => {
    if (!isAuth) {
      alert('로그인이 필요한 동작입니다.');
    } else if (isDisliked) {
      dispatch(deleteDislike({ videoId, userId }));
    } else {
      dispatch(addDislike({ videoId, userId }));
    }
  }, [videoId, userId, isDisliked]);
  return (
    <InfoIcons isActive={isDisliked}>
      <Tooltip title="싫어요">
        <IconButton onClick={onClickDislike}>
          <ThumbDown />
        </IconButton>
      </Tooltip>
      <p>{dislikes?.length}</p>
    </InfoIcons>
  );
};

export default Dislike;
