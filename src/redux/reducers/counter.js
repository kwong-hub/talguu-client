import { INCREMENT } from "../types";

const INITIAL_STATE = {
  count: 10,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return { count: state.count + 1 };
    default:
      return state;
  }
};
