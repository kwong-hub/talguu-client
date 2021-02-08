import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import accountReducer from "./accountReducer";
import videoReducer from "./video.reducer";
import errorReducer from "./errorReducer";
const rootReducer = combineReducers({
  authentication,
  account: accountReducer,
  video: videoReducer,
  error: errorReducer,
});

export default rootReducer;
