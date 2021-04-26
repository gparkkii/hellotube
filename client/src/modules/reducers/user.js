/* eslint-disable consistent-return */
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGNUP_USER,
  CHECK_USER,
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_USER,
} from '../actions/types';

const { produce } = require('immer');

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: false,
  data: {
    isAuth: '',
    success: '',
    message: '',
    hashedEmail: '',
    error: '',
  },
  profile: {
    _id: '',
    name: '',
    email: '',
    password: '',
    nickname: '',
    userDescription: '',
    url: '',
    profileImage: '',
    profileImageType: '',
    hashedEmail: '',
  },
};

export default function userReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginError = null;
        draft.loginDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.data = action.payload;
        draft.loginDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = true;
        draft.data.message = action.error;
        break;
      case SIGNUP_USER:
        draft.data = action.payload;
        break;
      case CHECK_USER:
        draft.data = action.payload;
        break;
      case LOGIN_USER:
        draft.data = action.payload;
        break;
      case LOGOUT_USER:
        draft.data = action.payload;
        draft.profile = undefined;
        break;
      case AUTH_USER:
        draft.data.isAuth = action.payload.isAuth;
        draft.profile = action.payload.profile;
        break;
      default:
        return prevState;
    }
  });
}
