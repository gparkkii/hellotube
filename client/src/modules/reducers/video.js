/* eslint-disable consistent-return */
import { GET_VIDEOS } from '../actions/types';

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
    writer: {
      _id: '',
      name: '',
      email: '',
      hashedEmail: '',
      password: '',
      nickname: '',
      userDescription: '',
      url: '',
      profileImage: '',
      profileImageType: '',
    },
  },
};

export default function videoReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_VIDEOS:
        draft.success = action.payload.success;
        draft.videos = action.payload.videos;
        break;
      default:
        return prevState;
    }
  });
}
