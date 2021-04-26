/* eslint-disable consistent-return */
import {
  GET_VIDEOS,
  GET_VIDEOS_DETAIL,
  GET_COMMENTS,
  GET_LIKES,
  GET_SUBSCRIBE,
  SAVE_COMMENTS,
} from '../actions/types';

const { produce } = require('immer');

const initialState = {
  getVideoSuccess: false,
  getCommentsSuccess: false,
  getLikesSuccess: false,
  getSubscribeSuccess: false,
  videoDetailSuccess: false,
  saveCommentsSuccess: false,
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
    // writer: {},
    // videoId: {},
    // commentTo: {},
    // content: '',
  },
  likes: {},
  subscribe: {},
};

export default function videoReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_VIDEOS:
        draft.getVideoSuccess = action.payload.success;
        draft.videos = action.payload.videos;
        break;
      case GET_COMMENTS:
        draft.getCommentsSuccess = action.payload.success;
        draft.comments = action.payload.comments;
        break;
      case GET_LIKES:
        draft.getLikesSuccess = action.payload.success;
        draft.likes = action.payload.likes;
        break;
      case GET_SUBSCRIBE:
        draft.getSubscribeSuccess = action.payload.success;
        draft.subscribe = action.payload.subscribe;
        break;
      case GET_VIDEOS_DETAIL:
        draft.videoDetailSuccess = action.payload.success;
        draft.currentVideo = action.payload.video;
        break;
      case SAVE_COMMENTS:
        draft.saveCommentsSuccess = action.payload.success;
        draft.comments = action.payload.comments;
        break;
      default:
        return prevState;
    }
  });
}
