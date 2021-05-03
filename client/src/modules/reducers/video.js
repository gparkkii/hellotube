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

export const TRENDING_VIDEOS_REQUEST = 'trending_videos_request';
export const TRENDING_VIDEOS_SUCCESS = 'trending_videos_success';
export const TRENDING_VIDEOS_FAILURE = 'trending_videos_failure';

export const EXPLORE_VIDEOS_REQUEST = 'explore_videos_request';
export const EXPLORE_VIDEOS_SUCCESS = 'explore_videos_success';
export const EXPLORE_VIDEOS_FAILURE = 'explore_videos_failure';

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

  trendingVideosLoading: false,
  trendingVideosDone: false,
  trendingVideosError: false,

  exploreVideosLoading: false,
  exploreVideosDone: false,
  exploreVideosError: false,

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
  currentVideo: [],
  trendingVideos: [],
  exploreVideos: [],
  myVideos: [],
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

export const getTrendingVideos = () => {
  return {
    type: TRENDING_VIDEOS_REQUEST,
  };
};

export const getExploreVideos = data => {
  return {
    type: EXPLORE_VIDEOS_REQUEST,
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
        draft.trendingVideosDone = false;
        draft.exploreVideosDone = false;
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
      case TRENDING_VIDEOS_REQUEST:
        draft.trendingVideosLoading = true;
        draft.trendingVideosError = null;
        draft.trendingVideosDone = false;
        break;
      case TRENDING_VIDEOS_SUCCESS:
        draft.trendingVideosLoading = false;
        draft.trendingVideosDone = true;
        draft.exploreVideosDone = false;
        draft.getVideoDone = false;
        draft.trendingVideos = action.payload.videos;
        break;
      case TRENDING_VIDEOS_FAILURE:
        draft.trendingVideosLoading = false;
        draft.trendingVideossError = true;
        draft.error = action.error;
        break;
      case EXPLORE_VIDEOS_REQUEST:
        draft.exploreVideosLoading = true;
        draft.exploreVideosError = null;
        draft.exploreVideosDone = false;
        break;
      case EXPLORE_VIDEOS_SUCCESS:
        draft.exploreVideosLoading = false;
        draft.exploreVideosDone = true;
        draft.trendingVideosDone = false;
        draft.getVideoDone = false;
        draft.exploreVideos = action.payload.videos;
        break;
      case EXPLORE_VIDEOS_FAILURE:
        draft.exploreVideosLoading = false;
        draft.exploreVideosError = true;
        draft.error = action.error;
        break;
      default:
        return prevState;
    }
  });
}
