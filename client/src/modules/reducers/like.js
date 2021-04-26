import axios from 'axios';

const { produce } = require('immer');

export const GET_LIKES = 'get_likes';

const initialState = {
  likes: {},
};

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

export default function likeReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_LIKES:
        draft.getLikesSuccess = action.payload.success;
        draft.likes = action.payload.likes;
        break;
      default:
        return prevState;
    }
  });
}
