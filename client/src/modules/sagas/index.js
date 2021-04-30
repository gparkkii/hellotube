import { all, fork } from 'redux-saga/effects';
import commentSaga from './comment';
import userSaga from './user';
import videoSaga from './video';
import likeSaga from './like';
import subscribeSaga from './subscribe';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(videoSaga),
    fork(likeSaga),
    fork(commentSaga),
    fork(subscribeSaga),
  ]);
}
