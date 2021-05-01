import React, { useCallback, useEffect } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { PermMedia } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPlaylist,
  deletePlaylist,
  getIsPlaylist,
} from 'modules/reducers/playlist';
import { InfoIcons } from 'styles/form';

const Playlist = ({ videoId, userId, isAuth }) => {
  const dispatch = useDispatch();
  const isPlaylist = useSelector(state => state.playlist.isPlaylist);

  useEffect(() => {
    if (isAuth) {
      dispatch(getIsPlaylist({ videoId, userId }));
    }
  }, [userId, videoId]);

  const onSaveList = useCallback(() => {
    if (!isAuth) {
      alert('로그인이 필요한 동작입니다.');
    } else if (isPlaylist) {
      dispatch(deletePlaylist({ videoId, userId }));
    } else {
      dispatch(addPlaylist({ videoId, userId }));
    }
  }, [userId, videoId, isPlaylist]);

  return (
    <InfoIcons isActive={isPlaylist}>
      <span>
        <Tooltip title="저장">
          <IconButton onClick={onSaveList}>
            <PermMedia />
          </IconButton>
        </Tooltip>
        <p>저장</p>
      </span>
    </InfoIcons>
  );
};

export default Playlist;
