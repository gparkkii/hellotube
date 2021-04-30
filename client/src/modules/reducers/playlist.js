const { produce } = require('immer');

export const ADD_PLAYLIST_REQUEST = 'add_playlist_request';
export const ADD_PLAYLIST_SUCCESS = 'add_playlist_success';
export const ADD_PLAYLIST_FAILURE = 'add_playlist_failure';

export const DELETE_PLAYLIST_REQUEST = 'delete_playlist_request';
export const DELETE_PLAYLIST_SUCCESS = 'delete_playlist_success';
export const DELETE_PLAYLIST_FAILURE = 'delete_playlist_failure';

export const MY_PLAYLIST_REQUEST = 'my_playlist_request';
export const MY_PLAYLIST_SUCCESS = 'my_playlist_success';
export const MY_PLAYLIST_FAILURE = 'my_playlist_failure';

export const IS_PLAYLIST_REQUEST = 'is_playlist_request';
export const IS_PLAYLIST_SUCCESS = 'is_playlist_success';
export const IS_PLAYLIST_FAILURE = 'is_playlist_failure';

const initialState = {
  getPlaylistLoading: false,
  getPlaylistDone: false,
  getPlaylistError: false,

  addPlaylistLoading: false,
  addPlaylistDone: false,
  addPlaylistError: false,

  deletePlaylistLoading: false,
  deletePlaylistDone: false,
  deletePlaylistError: false,

  isPlaylistLoading: false,
  isPlaylistDone: false,
  isPlaylistError: false,

  myPlaylistLoading: false,
  myPlaylistDone: false,
  myPlaylistError: false,
  myPlaylists: {},
  playlistVideo: {},
  isPlaylist: false,
};

/// ////////////// playlits //////////////////

export const addPlaylist = data => {
  return {
    type: ADD_PLAYLIST_REQUEST,
    data,
  };
};

export const deletePlaylist = data => {
  return {
    type: DELETE_PLAYLIST_REQUEST,
    data,
  };
};

export const getIsPlaylist = data => {
  return {
    type: IS_PLAYLIST_REQUEST,
    data,
  };
};

export const getMyPlaylist = data => {
  return {
    type: MY_PLAYLIST_REQUEST,
    data,
  };
};

export default function playlistReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case ADD_PLAYLIST_REQUEST:
        draft.addPlaylistLoading = true;
        draft.addPlaylistError = null;
        draft.addPlaylistDone = false;
        break;
      case ADD_PLAYLIST_SUCCESS:
        draft.addPlaylistLoading = false;
        draft.addPlaylistDone = true;
        draft.isPlaylist = true;
        draft.myPlaylists.push(action.payload.result);
        break;
      case ADD_PLAYLIST_FAILURE:
        draft.addPlaylistLoading = false;
        draft.addPlaylistError = true;
        draft.error = action.error;
        break;

      case DELETE_PLAYLIST_REQUEST:
        draft.deletePlaylistLoading = true;
        draft.deletePlaylistError = null;
        draft.deletePlaylistDone = false;
        break;
      case DELETE_PLAYLIST_SUCCESS:
        draft.isPlaylist = false;
        draft.deletePlaylistLoading = false;
        draft.deletePlaylistDone = true;
        draft.myPlaylists = draft.myPlaylists.filter(
          v => v._id !== action.payload.result._id,
        );
        break;
      case DELETE_PLAYLIST_FAILURE:
        draft.deletePlaylistLoading = false;
        draft.deletePlaylistError = true;
        draft.error = action.error;
        break;

      case MY_PLAYLIST_REQUEST:
        draft.myPlaylistLoading = true;
        draft.myPlaylistError = null;
        draft.myPlaylistDone = false;
        break;
      case MY_PLAYLIST_SUCCESS:
        draft.myPlaylistLoading = false;
        draft.myPlaylistDone = true;
        draft.myPlaylists = action.payload.result;
        draft.playlistVideo = action.videos;
        break;
      case MY_PLAYLIST_FAILURE:
        draft.myPlaylistLoading = false;
        draft.myPlaylistError = true;
        draft.error = action.error;
        break;

      case IS_PLAYLIST_REQUEST:
        draft.isPlaylistLoading = true;
        draft.isPlaylistError = null;
        draft.isPlaylistDone = false;
        break;
      case IS_PLAYLIST_SUCCESS:
        draft.isPlaylistLoading = false;
        draft.isPlaylistDone = true;
        draft.isPlaylist = action.payload.result;
        break;
      case IS_PLAYLIST_FAILURE:
        draft.isPlaylistLoading = false;
        draft.isPlaylistError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
