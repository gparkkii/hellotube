const { produce } = require('immer');

export const GET_VIDEOS_REQUEST = 'get_videos_request';
export const GET_VIDEOS_SUCCESS = 'get_videos_success';
export const GET_VIDEOS_FAILURE = 'get_videos_failure';
export const CURRENT_VIDEO_REQUEST = 'current_video_request';
export const CURRENT_VIDEO_SUCCESS = 'current_video_success';
export const CURRENT_VIDEO_FAILURE = 'current_video_failure';
export const MY_VIDEOS_REQUEST = 'my_videos_request';
export const MY_VIDEOS_SUCCESS = 'my_videos_success';
export const MY_VIDEOS_FAILURE = 'my_videos_failure';

const initialState = {
  error: '',
  getVideoLoading: false,
  getVideoDone: false,
  getVideoError: false,
  currentVideoLoading: false,
  currentVideoDone: false,
  currentVideoError: false,
  myVideosLoading: false,
  myVideosDone: false,
  myVideosError: false,
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
  myVideos: {},
};

export const getAllVideos = () => {
  return {
    type: GET_VIDEOS_REQUEST,
  };
};

export const getCurrentVideos = data => {
  return {
    type: CURRENT_VIDEO_REQUEST,
    data,
  };
};

export const getMyVideos = data => {
  return {
    type: MY_VIDEOS_REQUEST,
    data,
  };
};

export default function videoReducer(prevState = initialState, action) {
  return produce(prevState, draft => {
    switch (action.type) {
      case GET_VIDEOS_REQUEST:
        draft.getVideoLoading = true;
        draft.getVideoError = null;
        draft.getVideoDone = false;
        break;
      case GET_VIDEOS_SUCCESS:
        draft.getVideoLoading = false;
        draft.getVideoDone = true;
        draft.videos = action.payload.videos;
        break;
      case GET_VIDEOS_FAILURE:
        draft.getVideoLoading = false;
        draft.getVideoError = true;
        draft.error = action.error;
        break;
      case CURRENT_VIDEO_REQUEST:
        draft.currentVideoLoading = true;
        draft.currentVideoError = null;
        draft.currentVideoDone = false;
        break;
      case CURRENT_VIDEO_SUCCESS:
        draft.currentVideoLoading = false;
        draft.currentVideoDone = true;
        draft.currentVideo = action.payload.video;
        break;
      case CURRENT_VIDEO_FAILURE:
        draft.currentVideoLoading = false;
        draft.currentVideoError = true;
        draft.error = action.error;
        break;
      case MY_VIDEOS_REQUEST:
        draft.myVideosLoading = true;
        draft.myVideosError = null;
        draft.myVideosDone = false;
        break;
      case MY_VIDEOS_SUCCESS:
        draft.myVideosLoading = false;
        draft.myVideosDone = true;
        draft.myVideos = action.payload.videos;
        break;
      case MY_VIDEOS_FAILURE:
        draft.myVideosLoading = false;
        draft.myVideosError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
