import axios from 'axios';

const { produce } = require('immer');

/// ///////////// types //////////////////
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHECK_USER = 'check_user';
export const AUTH_USER = 'auth_user';

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: false,
  logoutLoading: false,
  logoutDone: false,
  logoutError: false,
  signupLoading: false,
  signupDone: false,
  signupError: false,
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

export const loginUser = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutUser = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const signupUser = data => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

export function checkUser(dataToSubmit) {
  const request = axios
    .post(`api/signup/checkEmail`, {
      email: dataToSubmit,
    })
    .then(response => response.data);
  return {
    type: CHECK_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get(`api/auth`).then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

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
        draft.loginDone = true;
        draft.data = action.payload;
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginError = true;
        draft.data.message = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutError = null;
        draft.logoutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.data = action.payload;
        draft.user = {};
        draft.profile = {};
        break;
      case LOG_OUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutError = true;
        draft.data.message = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signupLoading = true;
        draft.signupError = null;
        draft.signupDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signupLoading = false;
        draft.signupDone = true;
        draft.data = action.payload;
        break;
      case SIGN_UP_FAILURE:
        draft.signupLoading = false;
        draft.signupError = true;
        draft.data.message = action.error;
        break;
      case CHECK_USER:
        draft.data = action.payload;
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
