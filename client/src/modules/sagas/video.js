import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_VIDEOS_REQUEST,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE,
  CURRENT_VIDEO_REQUEST,
  CURRENT_VIDEO_SUCCESS,
  CURRENT_VIDEO_FAILURE,
  MY_VIDEOS_REQUEST,
  MY_VIDEOS_SUCCESS,
  MY_VIDEOS_FAILURE,
  TRENDING_VIDEOS_REQUEST,
  TRENDING_VIDEOS_SUCCESS,
  TRENDING_VIDEOS_FAILURE,
  EXPLORE_VIDEOS_REQUEST,
  EXPLORE_VIDEOS_SUCCESS,
  EXPLORE_VIDEOS_FAILURE,
} from '../reducers/video';

function getVideoAPI() {
  return axios.get('/api/video/files').then(response => ({ response }));
}

function* getVideos() {
  try {
    const { response } = yield call(getVideoAPI);
    if (response.data.success) {
      yield put({
        type: GET_VIDEOS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_VIDEOS_FAILURE,
      error: err,
    });
  }
}

function currentVideoAPI(data) {
  return axios.post('/api/video/detail', data).then(response => ({ response }));
}

function* currentVideo(action) {
  try {
    const { response } = yield call(currentVideoAPI, action.data);
    if (response.data.success) {
      yield put({
        type: CURRENT_VIDEO_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    yield put({
      type: CURRENT_VIDEO_FAILURE,
      error: err,
    });
  }
}

function myVideosAPI(data) {
  return axios
    .post('/api/video/user', { writer: data })
    .then(response => ({ response }));
}

function* myVideos(action) {
  try {
    const { response } = yield call(myVideosAPI, action.data);
    if (response.data.success) {
      yield put({
        type: MY_VIDEOS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_VIDEOS_FAILURE,
      error: err,
    });
  }
}

function trendingVideosAPI() {
  return axios
    .get('/api/video/files/trending')
    .then(response => ({ response }));
}

function* trendingVideos() {
  try {
    const { response } = yield call(trendingVideosAPI);
    if (response.data.success) {
      yield put({
        type: TRENDING_VIDEOS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: TRENDING_VIDEOS_FAILURE,
      error: err,
    });
  }
}

function exploreVideosAPI(data) {
  return axios
    .post('/api/video/files/explore', { category: data })
    .then(response => ({ response }));
}

function* exploreVideos(action) {
  try {
    const { response } = yield call(exploreVideosAPI, action.data);
    if (response.data.success) {
      yield put({
        type: EXPLORE_VIDEOS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: EXPLORE_VIDEOS_FAILURE,
      error: err,
    });
  }
}

function* watchAllVideos() {
  yield takeLatest(GET_VIDEOS_REQUEST, getVideos);
}

function* watchCurrentVideo() {
  yield takeLatest(CURRENT_VIDEO_REQUEST, currentVideo);
}

function* watchMyVideo() {
  yield takeLatest(MY_VIDEOS_REQUEST, myVideos);
}

function* watchTrendingVideos() {
  yield takeLatest(TRENDING_VIDEOS_REQUEST, trendingVideos);
}

function* watchExploreVideos() {
  yield takeLatest(EXPLORE_VIDEOS_REQUEST, exploreVideos);
}

export default function* videoSaga() {
  yield all([
    fork(watchAllVideos),
    fork(watchCurrentVideo),
    fork(watchMyVideo),
    fork(watchTrendingVideos),
    fork(watchExploreVideos),
  ]);
}
