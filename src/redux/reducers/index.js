import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import accountReducer from './accountReducer';

const rootReducer = combineReducers({
  authentication,
  account: accountReducer,
});

export default rootReducer;