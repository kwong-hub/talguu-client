import { userConstants } from '../_constants'
import { history } from '../_helpers'
import { userService } from '../_services/user.service'

function login(username, password) {
  return (dispatch) => {
    userService.login(username, password).then(
      (user) => {
        dispatch(success(user))
        history.push('/')
      },
      (error) => {
        dispatch(failure(error.toString()))
      }
    )
  }

  // function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error }
  }
}

function logout() {
  userService.logout()
  return { type: userConstants.LOGOUT_ASYNC }
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user))

    userService.register(user).then(
      (user) => {
        dispatch(success())
        history.push('/login')
        // dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()))
        // dispatch(alertActions.error(error.toString()));
      }
    )
  }

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user }
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user }
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error }
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request())

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    )
  }

  function request() {
    return { type: userConstants.GETALL_REQUEST }
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users }
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error }
  }
}

export const userActions = {
  login,
  logout,
  register,
  getAll
}
