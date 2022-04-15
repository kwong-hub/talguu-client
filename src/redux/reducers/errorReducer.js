import { ERROR_UNAUTHORIZED } from '../types'

const INITIAL_STATE = {
  authorized: true
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_UNAUTHORIZED:
      return { ...state, authorized: false }
    default:
      return state
  }
}

export default reducer
