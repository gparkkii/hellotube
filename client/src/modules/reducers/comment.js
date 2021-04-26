const { produce } = require('immer');

export const GET_COMMENTS_REQUEST = 'get_comments_request';
export const GET_COMMENTS_SUCCESS = 'get_comments_success';
export const GET_COMMENTS_FAILURE = 'get_comments_failure';
export const SAVE_COMMENTS_REQUEST = 'save_comments_request';
export const SAVE_COMMENTS_SUCCESS = 'save_comments_success';
export const SAVE_COMMENTS_FAILURE = 'save_comments_failure';

const initialState = {
  getCommentLoading: false,
  getCommentDone: false,
  getCommentError: false,
  saveCommentLoading: false,
  saveCommentDone: false,
  saveCommentError: false,
  comments: {
    writer: {},
    videoId: {},
    commentTo: {},
    content: '',
  },
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
        draft.comments = action.payload;
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
        draft.comments = action.payload;
        break;
      case SAVE_COMMENTS_FAILURE:
        draft.saveCommentLoading = false;
        draft.saveCommentError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
