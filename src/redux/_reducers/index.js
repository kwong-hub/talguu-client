import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import counterReducer from "./counter";
import videoReducer from "./videoReducer";

const rootReducer = combineReducers({
  counterReducer,
  videoReducer,
  authentication,
  registration,
});

export default rootReducer;