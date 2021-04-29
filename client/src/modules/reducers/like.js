const { produce } = require('immer');

export const GET_LIKES_REQUEST = 'get_likes_request';
export const GET_LIKES_SUCCESS = 'get_likes_success';
export const GET_LIKES_FAILURE = 'get_likes_failure';

export const ADD_LIKE_REQUEST = 'add_like_request';
export const ADD_LIKE_SUCCESS = 'add_like_success';
export const ADD_LIKE_FAILURE = 'add_like_failure';

export const DELETE_LIKE_REQUEST = 'delete_like_request';
export const DELETE_LIKE_SUCCESS = 'delete_like_success';
export const DELETE_LIKE_FAILURE = 'delete_like_failure';

export const GET_DISLIKES_REQUEST = 'get_dislikes_request';
export const GET_DISLIKES_SUCCESS = 'get_dislikes_success';
export const GET_DISLIKES_FAILURE = 'get_dislikes_failure';

export const ADD_DISLIKE_REQUEST = 'add_dislike_request';
export const ADD_DISLIKE_SUCCESS = 'add_dislike_success';
export const ADD_DISLIKE_FAILURE = 'add_dislike_failure';

export const DELETE_DISLIKE_REQUEST = 'delete_dislike_request';
export const DELETE_DISLIKE_SUCCESS = 'delete_dislike_success';
export const DELETE_DISLIKE_FAILURE = 'delete_dislike_failure';

export const IS_LIKED_REQUEST = 'is_liked_request';
export const IS_LIKED_SUCCESS = 'is_liked_success';
export const IS_LIKED_FAILURE = 'is_liked_failure';

export const IS_DISLIKED_REQUEST = 'is_disliked_request';
export const IS_DISLIKED_SUCCESS = 'is_disliked_success';
export const IS_DISLIKED_FAILURE = 'is_disliked_failure';

const initialState = {
  getLikesLoading: false,
  getLikesError: false,
  getLikesDone: false,

  addLikeLoading: false,
  addLikeError: false,
  addLikeDone: false,

  deleteLikeLoading: false,
  deleteLikeError: false,
  deleteLikeDone: false,

  getDislikesLoading: false,
  getDislikesError: false,
  getDislikesDone: false,

  addDislikeLoading: false,
  addDislikeError: false,
  addDislikeDone: false,

  deleteDisikeLoading: false,
  deleteDisikeError: false,
  deleteDisikeDone: false,

  isLikedLoading: false,
  isLikedDone: false,
  isLikedError: false,

  isDislikedLoading: false,
  isDislikedError: false,
  isDislikedDone: false,

  likes: {},
  dislikes: {},
  isLiked: false,
  isDisliked: false,
};

/// ////////////// like //////////////////

export const getAllLikes = data => {
  return {
    type: GET_LIKES_REQUEST,
    data,
  };
};

export const addLike = data => {
  return {
    type: ADD_LIKE_REQUEST,
    data,
  };
};

export const deleteLike = data => {
  return {
    type: DELETE_LIKE_REQUEST,
    data,
  };
};

export const getAllDislikes = data => {
  return {
    type: GET_DISLIKES_REQUEST,
    data,
  };
};

export const addDislike = data => {
  return {
    type: ADD_DISLIKE_REQUEST,
    data,
  };
};

export const deleteDislike = data => {
  return {
    type: DELETE_DISLIKE_REQUEST,
    data,
  };
};

export const setisLike = data => {
  return {
    type: IS_LIKED_REQUEST,
    data,
  };
};

export const setisDislike = data => {
  return {
    type: IS_DISLIKED_REQUEST,
    data,
  };
};

export default function likeReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_LIKES_REQUEST:
        draft.getLikesLoading = true;
        draft.getLikesError = null;
        draft.getLikesDone = false;
        break;
      case GET_LIKES_SUCCESS: {
        draft.getLikesLoading = false;
        draft.getLikesDone = true;
        draft.likes = action.payload.likes;
        break;
      }
      case GET_LIKES_FAILURE:
        draft.getLikesLoading = false;
        draft.getLikesError = true;
        draft.error = action.error;
        break;

      case ADD_LIKE_REQUEST:
        draft.addLikeLoading = true;
        draft.addLikeError = null;
        draft.addLikeDone = false;
        break;
      case ADD_LIKE_SUCCESS:
        draft.isLiked = true;
        draft.addLikeLoading = false;
        draft.addLikeDone = true;
        draft.likes.push(action.payload.likeResult);
        if (action.payload.dislikeResult) {
          draft.dislikes = draft.dislikes.filter(
            v => v._id !== action.payload.dislikeResult._id,
          );
          draft.isDisliked = false;
        }
        break;
      case ADD_LIKE_FAILURE:
        draft.addLikeLoading = false;
        draft.addLikeError = true;
        draft.error = action.error;
        break;

      case DELETE_LIKE_REQUEST:
        draft.deleteLikeLoading = true;
        draft.deleteLikeError = null;
        draft.deleteLikeDone = false;
        break;
      case DELETE_LIKE_SUCCESS:
        draft.isLiked = false;
        draft.deleteLikeLoading = false;
        draft.deleteLikeDone = true;
        draft.likes = draft.likes.filter(
          v => v._id !== action.payload.result._id,
        );
        break;
      case DELETE_LIKE_FAILURE:
        draft.deleteLikeLoading = false;
        draft.deleteLikeError = true;
        draft.error = action.error;
        break;

      case GET_DISLIKES_REQUEST:
        draft.getDislikesLoading = true;
        draft.getDislikesError = null;
        draft.getDislikesDone = false;
        break;
      case GET_DISLIKES_SUCCESS:
        draft.getDislikesLoading = false;
        draft.getDislikesDone = true;
        draft.dislikes = action.payload.dislikes;
        break;
      case GET_DISLIKES_FAILURE:
        draft.getDislikesLoading = false;
        draft.getDislikesError = true;
        draft.error = action.error;
        break;

      case ADD_DISLIKE_REQUEST:
        draft.addDislikeLoading = true;
        draft.addDislikeError = null;
        draft.addDislikeDone = false;
        break;
      case ADD_DISLIKE_SUCCESS:
        draft.isDisliked = true;
        draft.addDislikeLoading = false;
        draft.addDislikeDone = true;
        draft.dislikes.push(action.payload.dislikeResult);
        if (action.payload.likeResult) {
          draft.likes = draft.likes.filter(
            v => v._id !== action.payload.likeResult._id,
          );
          draft.isLiked = false;
        }
        break;
      case ADD_DISLIKE_FAILURE:
        draft.addDislikeLoading = false;
        draft.addDislikeError = true;
        draft.error = action.error;
        break;

      case DELETE_DISLIKE_REQUEST:
        draft.deleteDisikeLoading = true;
        draft.deleteDisikeError = null;
        draft.deleteDisikeDone = false;
        break;
      case DELETE_DISLIKE_SUCCESS:
        draft.isDisliked = false;
        draft.deleteDisikeLoading = false;
        draft.deleteDisikeDone = true;
        draft.dislikes = draft.dislikes.filter(
          v => v._id !== action.payload.result._id,
        );
        break;
      case DELETE_DISLIKE_FAILURE:
        draft.deleteDisikeLoading = false;
        draft.deleteDisikeError = true;
        draft.error = action.error;
        break;
      case IS_LIKED_REQUEST:
        draft.isLikedLoading = true;
        draft.isLikedError = null;
        draft.isLikedDone = false;
        break;
      case IS_LIKED_SUCCESS:
        draft.isLikedLoading = false;
        draft.isLikedDone = true;
        draft.isLiked = action.payload.liked;
        break;
      case IS_LIKED_FAILURE:
        draft.isLikedLoading = false;
        draft.isLikedError = true;
        draft.error = action.error;
        break;
      case IS_DISLIKED_REQUEST:
        draft.isDislikedLoading = true;
        draft.isDislikedError = null;
        draft.isDislikedDone = false;
        break;
      case IS_DISLIKED_SUCCESS:
        draft.isDislikedLoading = false;
        draft.isDislikedDone = true;
        draft.isDisliked = action.payload.disliked;
        break;
      case IS_DISLIKED_FAILURE:
        draft.isDislikedLoading = false;
        draft.isDislikedError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
