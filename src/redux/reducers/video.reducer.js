import {
  GET_PAID_VIDEO_URL_FAILURE,
  GET_PAID_VIDEO_URL_SUCCESS,
  PURCHASE_VIDEO_FAILURE,
  PURCHASE_VIDEO_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_READY,
  VIDEO_SUCCESS,
  VIEWER_VIDEOS_FAILURE,
  VIEWER_VIDEOS_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  video: {},
  videoStatus: null,
  errMessages: null,
  viewerVideos: [],
  currentVideo: null,
  video_link: null,
};

export default (state = INITIAL_STATE, action) => {
  // console.log("action-red", action);
  switch (action.type) {
    case VIDEO_READY:
      return { ...state, video: action.payload, videoStatus: "READY" };
    case VIDEO_SUCCESS:
      return { ...state, user: action.payload, videoStatus: "SUCCESSFUL" };
    case VIDEO_FAILURE:
      return { ...state, errMessages: action.payload, videoStatus: "FAILED" };
    case VIEWER_VIDEOS_SUCCESS:
      return { ...state, viewerVideos: action.payload };
    case VIEWER_VIDEOS_FAILURE:
      return { ...state, errMessages: action.payload };
    case GET_PAID_VIDEO_URL_SUCCESS:
      return { ...state, currentVideo: action.payload };
    case GET_PAID_VIDEO_URL_FAILURE:
      return { ...state, errMessages: action.payload };
    case PURCHASE_VIDEO_SUCCESS:
      return { ...state, video_link: action.video_link };
    case PURCHASE_VIDEO_FAILURE:
      return { ...state, errMessages: action.payload };
    default:
      return state;
  }
};
