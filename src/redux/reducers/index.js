import { combineReducers } from 'redux'

import accountReducer from './accountReducer'
import { authentication } from './authentication.reducer'
import errorReducer from './errorReducer'
import paymentReducer from './paymentReducer'
import videoReducer from './video.reducer'
import customReducer from './custom.reducer'

const rootReducer = combineReducers({
  authentication,
  account: accountReducer,
  video: videoReducer,
  error: errorReducer,
  payment: paymentReducer,
  showPlayer: customReducer
})

export default rootReducer
