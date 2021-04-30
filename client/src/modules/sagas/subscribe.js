import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBE_FAILURE,
  ADD_SUBSCRIBE_REQUEST,
  ADD_SUBSCRIBE_SUCCESS,
  ADD_SUBSCRIBE_FAILURE,
  DELETE_SUBSCRIBE_REQUEST,
  DELETE_SUBSCRIBE_SUCCESS,
  DELETE_SUBSCRIBE_FAILURE,
  MY_SUBSCRIBE_REQUEST,
  MY_SUBSCRIBE_SUCCESS,
  MY_SUBSCRIBE_FAILURE,
  IS_SUBSCRIBE_REQUEST,
  IS_SUBSCRIBE_SUCCESS,
  IS_SUBSCRIBE_FAILURE,
} from '../reducers/subscribe';

function getSubscribeAPI(data) {
  return axios
    .post('/api/subscribe/files', data)
    .then(response => ({ response }));
}

function* getSubscribe(action) {
  try {
    const { response } = yield call(getSubscribeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: GET_SUBSCRIBE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_SUBSCRIBE_FAILURE,
      error: err,
    });
  }
}

function addSubscribeAPI(data) {
  return axios.post('/api/subscribe', data).then(response => ({ response }));
}

function* addSubscribe(action) {
  try {
    const { response } = yield call(addSubscribeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: ADD_SUBSCRIBE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SUBSCRIBE_FAILURE,
      error: err,
    });
  }
}

function deleteSubscribeAPI(data) {
  return axios
    .post('/api/subscribe/delete', data)
    .then(response => ({ response }));
}

function* deleteSubscribe(action) {
  try {
    const { response } = yield call(deleteSubscribeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: DELETE_SUBSCRIBE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_SUBSCRIBE_FAILURE,
      error: err,
    });
  }
}

function isSubscribeAPI(data) {
  return axios
    .post('/api/subscribe/subscribed', data)
    .then(response => ({ response }));
}

function* isSubscribe(action) {
  try {
    const { response } = yield call(isSubscribeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: IS_SUBSCRIBE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_SUBSCRIBE_FAILURE,
      error: err,
    });
  }
}

function mySubscribeAPI(data) {
  return axios
    .post('/api/subscribe/user', data)
    .then(response => ({ response }));
}

function* mySubscribe(action) {
  try {
    const { response } = yield call(mySubscribeAPI, action.data);
    if (response.data.success) {
      yield put({
        type: MY_SUBSCRIBE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: MY_SUBSCRIBE_FAILURE,
      error: err,
    });
  }
}

function* watchGetSubscribe() {
  yield takeLatest(GET_SUBSCRIBE_REQUEST, getSubscribe);
}

function* watchAddSubscribe() {
  yield takeLatest(ADD_SUBSCRIBE_REQUEST, addSubscribe);
}

function* watchDeleteSubscribe() {
  yield takeLatest(DELETE_SUBSCRIBE_REQUEST, deleteSubscribe);
}

function* watchIsSubscribe() {
  yield takeLatest(IS_SUBSCRIBE_REQUEST, isSubscribe);
}

function* watchMySubscribe() {
  yield takeLatest(MY_SUBSCRIBE_REQUEST, mySubscribe);
}

export default function* subscribeSaga() {
  yield all([
    fork(watchGetSubscribe),
    fork(watchAddSubscribe),
    fork(watchDeleteSubscribe),
    fork(watchIsSubscribe),
    fork(watchMySubscribe),
  ]);
}
