import {
  GET_PAID_VIDEO_URL_FAILURE,
  GET_PAID_VIDEO_URL_SUCCESS,
  GET_SAVED_VIDEOS_FAILURE,
  GET_SAVED_VIDEOS_SUCCESS,
  PAID_VIEWER_VIDEOS_FAILURE,
  PAID_VIEWER_VIDEOS_SUCCESS,
  PURCHASE_VIDEO_FAILURE,
  PURCHASE_VIDEO_SUCCESS,
  SAVE_LATER_RESET,
  SAVE_LATER_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_READY,
  VIDEO_SUCCESS,
  VIEWER_LIVE_FAILURE,
  VIEWER_LIVE_SUCCESS,
  VIEWER_VIDEOS_FAILURE,
  VIEWER_VIDEOS_SUCCESS,
} from "../types";

const INITIAL_STATE = {
  video: {},
  videoStatus: null,
  errMessages: null,
  viewerVideos: [],
  liveVideos: [],
  currentVideo: null,
  video_link: null,
  purchasedVideos: [],
  savedVideos: [],
  saveLaterStatus: null,
};

const reducer = (state = INITIAL_STATE, action) => {
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
    case VIEWER_LIVE_SUCCESS:
      return { ...state, liveVideos: action.payload };
    case VIEWER_LIVE_FAILURE:
      return { ...state, errMessages: action.payload };
    case GET_PAID_VIDEO_URL_SUCCESS:
      return { ...state, currentVideo: action.payload };
    case GET_PAID_VIDEO_URL_FAILURE:
      return { ...state, errMessages: action.payload };
    case PURCHASE_VIDEO_SUCCESS:
      // console.log(action);
      return { ...state, video_link: action.payload.video_link };
    case PURCHASE_VIDEO_FAILURE:
      return { ...state, errMessages: action.payload };
    case PAID_VIEWER_VIDEOS_SUCCESS:
      return { ...state, purchasedVideos: action.payload };
    case PAID_VIEWER_VIDEOS_FAILURE:
      return { ...state, errMessages: action.payload };
    case GET_SAVED_VIDEOS_SUCCESS:
      return { ...state, savedVideos: action.payload };
    case GET_SAVED_VIDEOS_FAILURE:
      return { ...state, errMessages: action.payload };
    case SAVE_LATER_SUCCESS:
      if (action.payload.added) return { ...state, saveLaterStatus: "SUCCESS_ADDED" };
      else if (action.payload.removed) return { ...state, saveLaterStatus: "SUCCESS_REMOVED" };
      else return state;
    case SAVE_LATER_RESET:
      return { ...state, saveLaterStatus: null };
    default:
      return state;
  }
};

export default reducer;
