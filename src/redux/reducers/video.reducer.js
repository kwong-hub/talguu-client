import {  VIDEO_FAILURE, VIDEO_READY, VIDEO_SUCCESS } from "../types";

const INITIAL_STATE = {
  video: {},
  videoStatus: null,
  errMessages: null,
};

export default (state = INITIAL_STATE, action) => {
    console.log('action-red', action)
  switch (action.type) {
    case VIDEO_READY:
        return { ...state, video: action.payload, videoStatus: "READY" };
    case VIDEO_SUCCESS:
      return { ...state, user: action.payload, videoStatus: "SUCCESSFUL" };
    case VIDEO_FAILURE:
      return { ...state, errMessages: action.payload, videoStatus: "FAILED" };
    default:
      return state;
  }
};
