import { all, call, put, takeLatest } from "redux-saga/effects";
import userService from "../../services/user.service";
import {
  CREATE_PRODUCER_ASYNC,
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_SUCCESS,
  CREATE_VIEWER_ASYNC,
  CREATE_VIEWER_FAILURE,
  CREATE_VIEWER_SUCCESS,
} from "../types";
import { userConstants } from "../../_constants";

function* createUserAsync(action) {
  let user = yield call(userService.createProducer, action.payload);
  if (user && user.success) {
    yield put({ type: CREATE_PRODUCER_SUCCESS, payload: user.user });
  } else {
    yield put({ type: CREATE_PRODUCER_FAILURE, payload: user.messages });
  }
}

function* createViewerAsync(action) {
  let user = yield call(userService.createViewer, action.payload);
  if (user && user.success) {
    yield put({ type: CREATE_VIEWER_SUCCESS, payload: user.user });
  } else {
    yield put({ type: CREATE_VIEWER_FAILURE, payload: user.messages });
  }
}

function* loginSuccess(data) {
  yield put({ type: userConstants.LOGIN_SUCCESS, payload: data.payload });
}

function* loginFail() {
  yield put({ type: userConstants.LOGIN_FAILURE });
}
function* logout() {
  yield put({ type: userConstants.LOGOUT });
}

function* watchAll() {
  yield all([
    takeLatest(CREATE_PRODUCER_ASYNC, createUserAsync),
    takeLatest(CREATE_VIEWER_ASYNC, createViewerAsync),
    takeLatest("LOGIN_ASYNC", loginSuccess),
    takeLatest("LOGIN_FAIL", loginFail),
    takeLatest(userConstants.LOGOUT_ASYNC, logout),
  ]);
}

export default watchAll;
