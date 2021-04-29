import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_LIKES_REQUEST,
  GET_LIKES_SUCCESS,
  GET_LIKES_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  DELETE_LIKE_REQUEST,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_FAILURE,
  GET_DISLIKES_REQUEST,
  GET_DISLIKES_SUCCESS,
  GET_DISLIKES_FAILURE,
  ADD_DISLIKE_REQUEST,
  ADD_DISLIKE_SUCCESS,
  ADD_DISLIKE_FAILURE,
  DELETE_DISLIKE_REQUEST,
  DELETE_DISLIKE_SUCCESS,
  DELETE_DISLIKE_FAILURE,
  IS_LIKED_REQUEST,
  IS_LIKED_SUCCESS,
  IS_LIKED_FAILURE,
  IS_DISLIKED_REQUEST,
  IS_DISLIKED_SUCCESS,
  IS_DISLIKED_FAILURE,
} from '../reducers/like';

function getLikesAPI(data) {
  return axios.post('/api/like/files', data).then(response => ({ response }));
}

function* getLikes(action) {
  try {
    const { response } = yield call(getLikesAPI, action.data);
    if (response.data.success) {
      yield put({
        type: GET_LIKES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_LIKES_FAILURE,
      error: err,
    });
  }
}

function addLikeAPI(data) {
  return axios.post('/api/like/add', data).then(response => ({ response }));
}

function* addLike(action) {
  try {
    const { response } = yield call(addLikeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: ADD_LIKE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_LIKE_FAILURE,
      error: err,
    });
  }
}

function deleteLikeAPI(data) {
  return axios.post('/api/like/delete', data).then(response => ({ response }));
}

function* deleteLike(action) {
  try {
    const { response } = yield call(deleteLikeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: DELETE_LIKE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_LIKE_FAILURE,
      error: err,
    });
  }
}

function getDislikesAPI(data) {
  return axios
    .post('/api/like/files/dislikes', data)
    .then(response => ({ response }));
}

function* getDislikes(action) {
  try {
    const { response } = yield call(getDislikesAPI, action.data);
    if (response.data.success) {
      yield put({
        type: GET_DISLIKES_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_DISLIKES_FAILURE,
      error: err,
    });
  }
}

function addDislikeAPI(data) {
  return axios
    .post('/api/like/add/dislike', data)
    .then(response => ({ response }));
}

function* addDislike(action) {
  try {
    const { response } = yield call(addDislikeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: ADD_DISLIKE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_DISLIKE_FAILURE,
      error: err,
    });
  }
}

function deleteDislikeAPI(data) {
  return axios
    .post('/api/like/delete/dislike', data)
    .then(response => ({ response }));
}

function* deleteDislike(action) {
  try {
    const { response } = yield call(deleteDislikeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: DELETE_DISLIKE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_DISLIKE_FAILURE,
      error: err,
    });
  }
}

function isLikedAPI(data) {
  return axios.post('/api/like/liked', data).then(response => ({ response }));
}

function* isLiked(action) {
  try {
    const { response } = yield call(isLikedAPI, action.data);
    if (response.data.success) {
      yield put({
        type: IS_LIKED_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_LIKED_FAILURE,
      error: err,
    });
  }
}

function isDislikedAPI(data) {
  return axios
    .post('/api/like/disliked', data)
    .then(response => ({ response }));
}

function* isDisliked(action) {
  try {
    const { response } = yield call(isDislikedAPI, action.data);
    if (response.data.success) {
      yield put({
        type: IS_DISLIKED_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_DISLIKED_FAILURE,
      error: err,
    });
  }
}

function* watchAllLikes() {
  yield takeLatest(GET_LIKES_REQUEST, getLikes);
}

function* watchAddLike() {
  yield takeLatest(ADD_LIKE_REQUEST, addLike);
}

function* watchDeleteLike() {
  yield takeLatest(DELETE_LIKE_REQUEST, deleteLike);
}

function* watchAllDislikes() {
  yield takeLatest(GET_DISLIKES_REQUEST, getDislikes);
}

function* watchAddDislike() {
  yield takeLatest(ADD_DISLIKE_REQUEST, addDislike);
}

function* watchDeleteDislike() {
  yield takeLatest(DELETE_DISLIKE_REQUEST, deleteDislike);
}

function* watchIsLiked() {
  yield takeLatest(IS_LIKED_REQUEST, isLiked);
}

function* watchIsDisliked() {
  yield takeLatest(IS_DISLIKED_REQUEST, isDisliked);
}

export default function* likeSaga() {
  yield all([
    fork(watchAllLikes),
    fork(watchAddLike),
    fork(watchDeleteLike),

    fork(watchAllDislikes),
    fork(watchAddDislike),
    fork(watchDeleteDislike),

    fork(watchIsLiked),
    fork(watchIsDisliked),
  ]);
}
