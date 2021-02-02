import { CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from "../types";

const INITIAL_STATE = {
  user: {},
  createUserStatus: null,
  errMessages: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return { ...state, user: action.payload, createUserStatus: "SUCCESSFUL" };
    case CREATE_USER_FAILURE:
      return { ...state, errMessages: action.payload, createUserStatus: "FAILED" };
    default:
      return state;
  }
};
