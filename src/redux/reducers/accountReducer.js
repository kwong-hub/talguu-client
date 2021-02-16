import {
  CREATE_PRODUCER_SUCCESS,
  CREATE_PRODUCER_FAILURE,
  CREATE_VIEWER_FAILURE,
  CREATE_VIEWER_SUCCESS,
  CREATE_PRODUCER_RESET,
  CREATE_VIEWER_RESET,
} from "../types";

const INITIAL_STATE = {
  user: {},
  createUserStatus: null,
  errMessages: null,
  createViewerStatus: null,
  viewerErrMessages: null,
  viewerUser: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_PRODUCER_SUCCESS:
      return { ...state, user: action.payload, createUserStatus: "SUCCESSFUL" };
    case CREATE_PRODUCER_FAILURE:
      return { ...state, errMessages: action.payload, createUserStatus: "FAILED" };
    case CREATE_VIEWER_SUCCESS:
      return { ...state, viewerUser: action.payload, createViewerStatus: "SUCCESSFUL" };
    case CREATE_VIEWER_FAILURE:
      return { ...state, viewerErrMessages: action.payload, createViewerStatus: "FAILED" };
    case CREATE_VIEWER_RESET:
      return { ...state, createViewerStatus: null };
    case CREATE_PRODUCER_RESET:
      return { ...state, createUserStatus: null };
    default:
      return state;
  }
};
