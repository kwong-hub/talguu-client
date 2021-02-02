import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { userConstants } from "../../_constants";
import { INCREMENT, INCREMENT_ASYNC } from "../types";

function* incrementAsync() {
  yield put({ type: INCREMENT, payload: 1 });
}

function* watchIncrement() {
  yield takeLatest(INCREMENT_ASYNC, incrementAsync);
}

function* loginSuccess(data) {
  yield put({ type: userConstants.LOGIN_SUCCESS, payload: data.payload });
}

function* loginFail() {
  yield put({ type: userConstants.LOGIN_FAILURE});
}
function* logout() {
  yield put({ type: userConstants.LOGOUT});
}
function* watchLogin() {
  yield takeLatest("LOGIN_ASYNC", loginSuccess);
  yield takeLatest("LOGIN_FAIL", loginFail);
  yield takeLatest(userConstants.LOGOUT_ASYNC, logout);
}



export { watchIncrement, watchLogin };
