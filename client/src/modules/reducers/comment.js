const { produce } = require('immer');

export const GET_COMMENTS_REQUEST = 'get_comments_request';
export const GET_COMMENTS_SUCCESS = 'get_comments_success';
export const GET_COMMENTS_FAILURE = 'get_comments_failure';
export const SAVE_COMMENTS_REQUEST = 'save_comments_request';
export const SAVE_COMMENTS_SUCCESS = 'save_comments_success';
export const SAVE_COMMENTS_FAILURE = 'save_comments_failure';
export const MY_COMMENTS_REQUEST = 'my_comments_request';
export const MY_COMMENTS_SUCCESS = 'my_comments_success';
export const MY_COMMENTS_FAILURE = 'my_comments_failure';

const initialState = {
  getCommentLoading: false,
  getCommentDone: false,
  getCommentError: false,
  saveCommentLoading: false,
  saveCommentDone: false,
  saveCommentError: false,
  myCommentLoading: false,
  myCommentError: false,
  myCommentDone: false,
  comments: [
    {
      writer: {},
      videoId: {},
      commentTo: {},
      content: '',
    },
  ],
  myComments: [],
  commentVideos: [],
};

/// ////////////// comment //////////////////
export const getAllComments = data => {
  return {
    type: GET_COMMENTS_REQUEST,
    data,
  };
};

export const saveComments = data => {
  return {
    type: SAVE_COMMENTS_REQUEST,
    data,
  };
};

export const getMyComments = data => {
  return {
    type: MY_COMMENTS_REQUEST,
    data,
  };
};

export default function commentReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_COMMENTS_REQUEST:
        draft.getCommentLoading = true;
        draft.getCommentError = null;
        draft.getCommentDone = false;
        break;
      case GET_COMMENTS_SUCCESS:
        draft.getCommentLoading = false;
        draft.getCommentDone = true;
        draft.comments = action.payload.comments;
        break;
      case GET_COMMENTS_FAILURE:
        draft.getCommentLoading = false;
        draft.getCommentError = true;
        draft.error = action.error;
        break;
      case SAVE_COMMENTS_REQUEST:
        draft.saveCommentLoading = true;
        draft.saveCommentError = null;
        draft.saveCommentDone = false;
        break;
      case SAVE_COMMENTS_SUCCESS:
        draft.saveCommentLoading = false;
        draft.saveCommentDone = true;
        draft.comments.unshift(action.payload.result[0]);
        break;
      case SAVE_COMMENTS_FAILURE:
        draft.saveCommentLoading = false;
        draft.saveCommentError = true;
        draft.error = action.error;
        break;
      case MY_COMMENTS_REQUEST:
        draft.myCommentLoading = true;
        draft.myCommentError = null;
        draft.myCommentDone = false;
        break;
      case MY_COMMENTS_SUCCESS:
        draft.myCommentLoading = false;
        draft.myCommentDone = true;
        draft.myComments = action.payload.comments;
        draft.commentVideos = action.videos;
        break;
      case MY_COMMENTS_FAILURE:
        draft.myCommentLoading = false;
        draft.myCommentError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
