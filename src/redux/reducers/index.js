import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import accountReducer from "./accountReducer";
import videoReducer from "./video.reducer";
const rootReducer = combineReducers({
  authentication,
  account: accountReducer,
  video: videoReducer,
});

export default rootReducer;
