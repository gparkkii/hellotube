/* eslint-disable consistent-return */
import {
  GET_VIDEOS,
  GET_VIDEOS_DETAIL,
  GET_COMMENTS,
  GET_LIKES,
  GET_SUBSCRIBE,
} from '../actions/types';

const { produce } = require('immer');

const initialState = {
  success: false,
  videos: {
    views: 0,
    _id: '',
    title: '',
    description: '',
    category: '',
    privacy: '',
    createdAt: '',
    updatedAt: '',
    thumbnail: '',
    filePath: '',
    fileDuration: '',
    writer: {},
  },
  currentVideo: {},
  comments: {
    writer: {},
    videoId: {},
    videoUser: {},
    content: '',
  },
  likes: {},
  subscribe: {},
};

export default function videoReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_VIDEOS:
        draft.success = action.payload.success;
        draft.videos = action.payload.videos;
        break;
      case GET_COMMENTS:
        draft.success = action.payload.success;
        draft.comments = action.payload.comments;
        break;
      case GET_LIKES:
        draft.success = action.payload.success;
        draft.likes = action.payload.likes;
        break;
      case GET_SUBSCRIBE:
        draft.success = action.payload.success;
        draft.subscribe = action.payload.subscribe;
        break;
      case GET_VIDEOS_DETAIL:
        draft.success = action.payload.success;
        draft.currentVideo = action.payload.video;
        break;
      default:
        return prevState;
    }
  });
}
