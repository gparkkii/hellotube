import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  ADD_PLAYLIST_REQUEST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_FAILURE,
  DELETE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAILURE,
  MY_PLAYLIST_REQUEST,
  MY_PLAYLIST_SUCCESS,
  MY_PLAYLIST_FAILURE,
  IS_PLAYLIST_REQUEST,
  IS_PLAYLIST_SUCCESS,
  IS_PLAYLIST_FAILURE,
} from '../reducers/playlist';

function addPlaylistAPI(data) {
  return axios
    .post('/api/playlist/save', data)
    .then(response => ({ response }));
}

function* addPlaylist(action) {
  try {
    const { response } = yield call(addPlaylistAPI, action.data);
    if (response.data.success) {
      yield put({
        type: ADD_PLAYLIST_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_PLAYLIST_FAILURE,
      error: err,
    });
  }
}

function deletePlaylistAPI(data) {
  return axios
    .post('/api/playlist/delete', data)
    .then(response => ({ response }));
}

function* deletePlaylist(action) {
  try {
    const { response } = yield call(deletePlaylistAPI, action.data);
    if (response.data.success) {
      yield put({
        type: DELETE_PLAYLIST_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_PLAYLIST_FAILURE,
      error: err,
    });
  }
}

function isPlaylistAPI(data) {
  return axios
    .post('/api/playlist/saved', data)
    .then(response => ({ response }));
}

function* isPlaylist(action) {
  try {
    const { response } = yield call(isPlaylistAPI, action.data);
    if (response.data.success) {
      yield put({
        type: IS_PLAYLIST_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_PLAYLIST_FAILURE,
      error: err,
    });
  }
}

function myPlaylistAPI(data) {
  return axios
    .post('/api/playlist/user', data)
    .then(response => ({ response }));
}

function* myPlaylist(action) {
  try {
    const { response } = yield call(myPlaylistAPI, action.data);
    const videos = [];
    if (response.data.success) {
      response.data.result.map(playlist => {
        return videos.push(playlist.videoId);
      });
      yield put({
        type: MY_PLAYLIST_SUCCESS,
        payload: response.data,
        videos,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_PLAYLIST_FAILURE,
      error: err,
    });
  }
}

function* watchAddPlaylist() {
  yield takeLatest(ADD_PLAYLIST_REQUEST, addPlaylist);
}

function* watchDeletePlaylist() {
  yield takeLatest(DELETE_PLAYLIST_REQUEST, deletePlaylist);
}

function* watchIsPlaylist() {
  yield takeLatest(IS_PLAYLIST_REQUEST, isPlaylist);
}

function* watchMyPlaylist() {
  yield takeLatest(MY_PLAYLIST_REQUEST, myPlaylist);
}

export default function* playlistSaga() {
  yield all([
    fork(watchAddPlaylist),
    fork(watchDeletePlaylist),
    fork(watchIsPlaylist),
    fork(watchMyPlaylist),
  ]);
}
