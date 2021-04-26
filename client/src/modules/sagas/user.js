import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
} from '../actions/types';

function logInAPI(data) {
  return axios.post('/api/login', data).then(response => ({
    response,
  }));
}

function* logIn(action) {
  try {
    console.log('saga logIn');
    const { response } = yield call(logInAPI, action.data);
    if (response.data.success) {
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

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([fork(watchLogIn)]);
}
