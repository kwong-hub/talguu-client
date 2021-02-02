import { UPLOAD_VIDEO, STREAM_VIDEO } from "../types";

const INITIAL_STATE = {
  videos: [],
  currentStream: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPLOAD_VIDEO:
      return { videos: [action.payload, ...state.videos] };
    case STREAM_VIDEO:
      return { ...state, currentStream: action.payload };
    default:
      return state;
  }
};
