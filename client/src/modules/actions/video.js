import axios from 'axios';
import {
  GET_VIDEOS,
  GET_LIKES,
  GET_COMMENTS,
  GET_SUBSCRIBE,
  GET_VIDEOS_DETAIL,
  SAVE_COMMENTS,
} from './types';

/// ////////////// video //////////////////
export function getAllVideos() {
  const request = axios.get(`api/video/files`).then(response => response.data);
  return {
    type: GET_VIDEOS,
    payload: request,
  };
}

export function getDetailVideos(dataToSubmit) {
  const request = axios
    .post(`api/video/detail`, dataToSubmit)
    .then(response => response.data);
  return {
    type: GET_VIDEOS_DETAIL,
    payload: request,
  };
}

/// ////////////// comment //////////////////
export function getAllComments(dataToSubmit) {
  const request = axios
    .post(`api/comment/files`, dataToSubmit)
    .then(response => response.data);
  return {
    type: GET_COMMENTS,
    payload: request,
  };
}

export function saveComments(dataToSubmit) {
  const request = axios
    .post(`api/comment/save`, dataToSubmit)
    .then(response => response.data);
  return {
    type: SAVE_COMMENTS,
    payload: request,
  };
}

/// ////////////// like //////////////////
export function getAllLikes(dataToSubmit) {
  const request = axios
    .post(`api/like/files`, dataToSubmit)
    .then(response => response.data);
  return {
    type: GET_LIKES,
    payload: request,
  };
}

/// ////////////// subscribe //////////////////
export function getAllSubscribe(dataToSubmit) {
  const request = axios
    .post(`api/subscribe/files`, dataToSubmit)
    .then(response => response.data);
  return {
    type: GET_SUBSCRIBE,
    payload: request,
  };
}
