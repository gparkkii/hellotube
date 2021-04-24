import axios from 'axios';
import { GET_VIDEOS } from './types';

export function getAllVideos() {
  const request = axios.get(`api/video/files`).then(response => response.data);
  return {
    type: GET_VIDEOS,
    payload: request,
  };
}
