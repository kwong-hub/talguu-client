import { ERROR_UNAUTHORIZED } from "../types";

const INITIAL_STATE = {
  authorized: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_UNAUTHORIZED:
      return { ...state, authorized: false };
    default:
      return state;
  }
};
