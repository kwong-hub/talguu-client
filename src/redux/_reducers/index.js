import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import videoReducer from "./videoReducer";
import account from "./accountReducer";

const rootReducer = combineReducers({
  videoReducer,
  authentication,
  registration,
  account,
});

export default rootReducer;
