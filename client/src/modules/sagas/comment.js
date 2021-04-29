import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  SAVE_COMMENTS_REQUEST,
  SAVE_COMMENTS_SUCCESS,
  SAVE_COMMENTS_FAILURE,
  MY_COMMENTS_REQUEST,
  MY_COMMENTS_SUCCESS,
  MY_COMMENTS_FAILURE,
} from '../reducers/comment';

function getCommentAPI(data) {
  return axios
    .post('/api/comment/files', { videoId: data })
    .then(response => ({ response }));
}

function* getComments(action) {
  try {
    const { response } = yield call(getCommentAPI, action.data);
    if (response.data.success) {
      yield put({
        type: GET_COMMENTS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function saveCommentAPI(data) {
  return axios.post('/api/comment/save', data).then(response => ({ response }));
}

function* saveComment(action) {
  try {
    const { response } = yield call(saveCommentAPI, action.data);
    if (response.data.success) {
      yield put({
        type: SAVE_COMMENTS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: SAVE_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function myCommentsAPI(data) {
  return axios
    .post('/api/comment/user', { writer: data })
    .then(response => ({ response }));
}

function* myComments(action) {
  try {
    const { response } = yield call(myCommentsAPI, action.data);
    const videos = [];
    if (response.data.success) {
      response.data.comments.map(comment => {
        return videos.push(comment.videoId);
      });
      yield put({
        type: MY_COMMENTS_SUCCESS,
        payload: response.data,
        videos,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_COMMENTS_FAILURE,
      error: err,
    });
  }
}

function* watchAllComments() {
  yield takeLatest(GET_COMMENTS_REQUEST, getComments);
}

function* watchSaveComment() {
  yield takeLatest(SAVE_COMMENTS_REQUEST, saveComment);
}

function* watchMyComments() {
  yield takeLatest(MY_COMMENTS_REQUEST, myComments);
}

export default function* commentSaga() {
  yield all([
    fork(watchAllComments),
    fork(watchSaveComment),
    fork(watchMyComments),
  ]);
}
