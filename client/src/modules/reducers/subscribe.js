const { produce } = require('immer');

export const GET_SUBSCRIBE_REQUEST = 'get_subscribe_request';
export const GET_SUBSCRIBE_SUCCESS = 'get_subscribe_success';
export const GET_SUBSCRIBE_FAILURE = 'get_subscribe_failure';

export const ADD_SUBSCRIBE_REQUEST = 'add_subscribe_request';
export const ADD_SUBSCRIBE_SUCCESS = 'add_subscribe_success';
export const ADD_SUBSCRIBE_FAILURE = 'add_subscribe_failure';

export const DELETE_SUBSCRIBE_REQUEST = 'delete_subscribe_request';
export const DELETE_SUBSCRIBE_SUCCESS = 'delete_subscribe_success';
export const DELETE_SUBSCRIBE_FAILURE = 'delete_subscribe_failure';

export const MY_SUBSCRIBE_REQUEST = 'my_subscribe_request';
export const MY_SUBSCRIBE_SUCCESS = 'my_subscribe_success';
export const MY_SUBSCRIBE_FAILURE = 'my_subscribe_failure';

export const IS_SUBSCRIBE_REQUEST = 'is_subscribe_request';
export const IS_SUBSCRIBE_SUCCESS = 'is_subscribe_success';
export const IS_SUBSCRIBE_FAILURE = 'is_subscribe_failure';

const initialState = {
  getSubscribeLoading: false,
  getSubscribeDone: false,
  getSubscribeError: false,

  addSubscribeLoading: false,
  addSubscribeDone: false,
  addSubscribeError: false,

  deleteSubscribeLoading: false,
  deleteSubscribeDone: false,
  deleteSubscribeError: false,

  isSubscribeLoading: false,
  isSubscribeDone: false,
  isSubscribeError: false,

  mySubscribeLoading: false,
  mySubscribeDone: false,
  mySubscribeError: false,
  mySubscribes: [],
  subscriber: [],
  subscribeTo: [],
  isSubscribe: false,
};

/// ////////////// subscribe //////////////////

export const getAllSubscribe = data => {
  return {
    type: GET_SUBSCRIBE_REQUEST,
    data,
  };
};

export const addSubscribe = data => {
  return {
    type: ADD_SUBSCRIBE_REQUEST,
    data,
  };
};

export const deleteSubscribe = data => {
  return {
    type: DELETE_SUBSCRIBE_REQUEST,
    data,
  };
};

export const isSubscribe = data => {
  return {
    type: IS_SUBSCRIBE_REQUEST,
    data,
  };
};

export const mySubscribe = data => {
  return {
    type: MY_SUBSCRIBE_REQUEST,
    data,
  };
};

export default function subscribeReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_SUBSCRIBE_REQUEST:
        draft.getSubscribeLoading = true;
        draft.getSubscribeError = null;
        draft.getSubscribeDone = false;
        break;
      case GET_SUBSCRIBE_SUCCESS:
        draft.getSubscribeLoading = false;
        draft.getSubscribeDone = true;
        draft.subscriber = action.payload.result;
        break;
      case GET_SUBSCRIBE_FAILURE:
        draft.getSubscribeLoading = false;
        draft.getSubscribeError = true;
        draft.error = action.error;
        break;

      case ADD_SUBSCRIBE_REQUEST:
        draft.addSubscribeLoading = true;
        draft.addSubscribeError = null;
        draft.addSubscribeDone = false;
        break;
      case ADD_SUBSCRIBE_SUCCESS:
        draft.addSubscribeLoading = false;
        draft.addSubscribeDone = true;
        draft.isSubscribe = true;
        draft.subscriber.push(action.payload.result);
        break;
      case ADD_SUBSCRIBE_FAILURE:
        draft.addSubscribeLoading = false;
        draft.addSubscribeError = true;
        draft.error = action.error;
        break;

      case DELETE_SUBSCRIBE_REQUEST:
        draft.deleteSubscribeLoading = true;
        draft.deleteSubscribeError = null;
        draft.deleteSubscribeDone = false;
        break;
      case DELETE_SUBSCRIBE_SUCCESS:
        draft.isSubscribe = false;
        draft.deleteSubscribeLoading = false;
        draft.deleteSubscribeDone = true;
        draft.subscriber = draft.subscriber.filter(
          v => v._id !== action.payload.result._id,
        );
        break;
      case DELETE_SUBSCRIBE_FAILURE:
        draft.deleteSubscribeLoading = false;
        draft.deleteSubscribeError = true;
        draft.error = action.error;
        break;

      case MY_SUBSCRIBE_REQUEST:
        draft.mySubscribeLoading = true;
        draft.mySubscribeError = null;
        draft.mySubscribeDone = false;
        break;
      case MY_SUBSCRIBE_SUCCESS:
        draft.mySubscribeLoading = false;
        draft.mySubscribeDone = true;
        draft.mySubscribes = action.payload.result;
        draft.subscribeTo = action.payload.subscribeTo;
        break;
      case MY_SUBSCRIBE_FAILURE:
        draft.mySubscribeLoading = false;
        draft.mySubscribeError = true;
        draft.error = action.error;
        break;

      case IS_SUBSCRIBE_REQUEST:
        draft.isSubscribeLoading = true;
        draft.isSubscribeError = null;
        draft.isSubscribeDone = false;
        break;
      case IS_SUBSCRIBE_SUCCESS:
        draft.isSubscribeLoading = false;
        draft.isSubscribeDone = true;
        draft.isSubscribe = action.payload.result;
        break;
      case IS_SUBSCRIBE_FAILURE:
        draft.isSubscribeLoading = false;
        draft.isSubscribeError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
