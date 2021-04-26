import axios from 'axios';
import {
  SIGN_UP_REQUEST,
  CHECK_USER,
  LOG_IN_REQUEST,
  LOGOUT_USER,
  AUTH_USER,
} from './types';

export const loginUser = data => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

// export function loginUser(dataToSubmit) {
//   const request = axios
//     .post(`api/login`, dataToSubmit)
//     .then(response => response.data);
//   return {
//     type: LOGIN_USER,
//     payload: request,
//   };
// }

export function logoutUser() {
  const request = axios.get(`api/logout`).then(response => response.data);
  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export const signupUser = data => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

// export function signupUser(dataToSubmit) {
//   const request = axios
//     .post(`api/signup`, dataToSubmit)
//     .then(response => response.data);
//   return {
//     type: SIGNUP_USER,
//     payload: request,
//   };
// }

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
