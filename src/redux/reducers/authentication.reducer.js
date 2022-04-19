import { userConstants } from '../../_constants'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      }
    case userConstants.LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        loggedIn: true,
        user: action.payload
      }
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false
      }
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: {}
      }
    default:
      return state
  }
}
