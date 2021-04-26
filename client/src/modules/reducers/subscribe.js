import axios from 'axios';

const { produce } = require('immer');

export const GET_SUBSCRIBE = 'get_subscribe';

const initialState = {
  subscribe: {},
};

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

export default function subscribeReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_SUBSCRIBE:
        draft.getSubscribeSuccess = action.payload.success;
        draft.subscribe = action.payload.subscribe;
        break;
      default:
        return prevState;
    }
  });
}
