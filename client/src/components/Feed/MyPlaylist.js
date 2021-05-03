import EmptyStates from 'components/common/EmptyState';
import VideoCard from 'components/Main/VideoCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridContainer } from 'styles/container';
import { FeedHeader } from 'styles/typography';
import { getMyPlaylist } from '../../modules/reducers/playlist';

const MyPlaylist = () => {
  const dispatch = useDispatch();
  const UserId = window.localStorage.getItem('userId');
  const Playlists = useSelector(state => state.playlist);

  useEffect(() => {
    dispatch(getMyPlaylist({ userId: UserId }));
  }, [UserId]);
  return (
    <>
      <FeedHeader>
        <h2>내가 저장한 동영상</h2>
      </FeedHeader>
      {Playlists.playlistVideo.length === 0 && (
        <EmptyStates statement="나중에 볼 동영상을 저장해보세요!" />
      )}
      <GridContainer>
        {Playlists.myPlaylistDone &&
          Playlists.playlistVideo.map(video => {
            return <VideoCard key={video._id} video={video} />;
          })}
      </GridContainer>
    </>
  );
};

export default MyPlaylist;
