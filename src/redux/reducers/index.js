import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import accountReducer from "./accountReducer";
import videoReducer from "./video.reducer";
import errorReducer from "./errorReducer";
import paymentReducer from "./paymentReducer";
const rootReducer = combineReducers({
  authentication,
  account: accountReducer,
  video: videoReducer,
  error: errorReducer,
  payment: paymentReducer,
});

export default rootReducer;
