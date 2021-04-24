import { combineReducers } from 'redux';
import profileReducer from './profile';
import userReducer from './user';
import videoReducer from './video';

const rootReducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  video: videoReducer,
});

export default rootReducer;
