import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data).then(response => ({
    response,
  }));
}

function* login(action) {
  try {
    const { response } = yield call(logInAPI, action.data);
    if (response.data.success) {
      window.localStorage.setItem('userId', response.data.userId);
      yield put({
        type: LOG_IN_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: LOG_IN_FAILURE,
        error: response.data.message,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err,
    });
  }
}

function logoutAPI() {
  return axios.get('/api/logout').then(response => ({ response }));
}

function* logout() {
  try {
    const { response } = yield call(logoutAPI);
    if (response.data.success) {
      yield put({
        type: LOG_OUT_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: LOG_OUT_FAILURE,
        error: response.data.message,
      });
    }
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/api/signUp', data).then(response => ({ response }));
}

function* signUp(action) {
  try {
    const { response } = yield call(signUpAPI, action.data);
    if (response.data.success) {
      yield put({
        type: SIGN_UP_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: SIGN_UP_FAILURE,
        error: response.data.message,
      });
    }
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignUp)]);
}
