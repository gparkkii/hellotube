import { combineReducers } from 'redux';
import commentReducer from './comment';
import likeReducer from './like';
import playlistReducer from './playlist';
import profileReducer from './profile';
import subscribeReducer from './subscribe';
import userReducer from './user';
import videoReducer from './video';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  video: videoReducer,
  comment: commentReducer,
  likes: likeReducer,
  subscribe: subscribeReducer,
  playlist: playlistReducer,
});

export default rootReducer;
