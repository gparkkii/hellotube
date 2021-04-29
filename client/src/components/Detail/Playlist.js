import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { PermMedia } from '@material-ui/icons';

const Playlist = () => {
  return (
    <span>
      <Tooltip title="저장">
        <IconButton>
          <PermMedia />
        </IconButton>
      </Tooltip>
      저장
    </span>
  );
};

export default Playlist;
