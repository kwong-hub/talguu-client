import { all, call, put, takeLatest } from "redux-saga/effects";
import userService from "../../services/user.service";
import {
  CREATE_USER_ASYNC,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  INCREMENT,
  INCREMENT_ASYNC,
} from "../types";
import { userConstants } from "../../_constants";

function* incrementAsync() {
  yield put({ type: INCREMENT, payload: 1 });
}

function* createUserAsync(action) {
  // console.log(action);
  let user = yield call(userService.createProducer, action.payload);
  // console.log(user);
  if (user && user.success) {
    yield put({ type: CREATE_USER_SUCCESS, payload: user.user });
  } else {
    yield put({ type: CREATE_USER_FAILURE, payload: user.messages });
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
    takeLatest(CREATE_USER_ASYNC, createUserAsync),
    takeLatest(INCREMENT_ASYNC, incrementAsync),
    takeLatest("LOGIN_ASYNC", loginSuccess),
    takeLatest("LOGIN_FAIL", loginFail),
    takeLatest(userConstants.LOGOUT_ASYNC, logout),
  ]);
}

export default watchAll;
