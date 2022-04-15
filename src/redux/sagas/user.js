import { call, put } from 'redux-saga/effects'
import { userConstants } from '../../_constants'
import { userService } from '../../_services/user.service'
import {
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_SUCCESS,
  CREATE_VIEWER_FAILURE,
  CREATE_VIEWER_SUCCESS,
  GET_USER_PROFILE,
  LOGOUT
} from '../types'

function* logout(action) {
  yield call(userService.logout, action.payload)
  yield put({ type: LOGOUT })
}

function* loginFail() {
  yield put({ type: userConstants.LOGIN_FAILURE })
}

function* loginSuccess(data) {
  yield put({ type: userConstants.LOGIN_SUCCESS, payload: data.payload })
}

function* createViewerAsync(action) {
  const user = yield call(userService.createViewer, action.payload)
  if (user && user.success) {
    yield put({ type: CREATE_VIEWER_SUCCESS, payload: user.user })
  } else {
    yield put({ type: CREATE_VIEWER_FAILURE, payload: user.messages })
  }
}

function* createUserAsync(action) {
  const user = yield call(userService.createProducer, action.payload)
  if (user && user.success) {
    yield put({ type: CREATE_PRODUCER_SUCCESS, payload: user.user })
  } else {
    yield put({ type: CREATE_PRODUCER_FAILURE, payload: user.messages })
  }
}

function* getUserProfileInfo(action) {
  const res = yield call(userService.getUserProfile, action.payload)
  if (res.success) {
    yield put({
      type: GET_USER_PROFILE,
      payload: { company: res.producer ? res.producer : res.viewer, user: res.user }
    })
  }
}

export default {
  logout,
  loginFail,
  loginSuccess,
  createViewerAsync,
  createUserAsync,
  getUserProfileInfo
}
