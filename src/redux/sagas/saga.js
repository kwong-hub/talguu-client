import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { INCREMENT, INCREMENT_ASYNC } from "../types";

function* incrementAsync() {
  yield put({ type: INCREMENT, payload: 1 });
}

function* watchIncrement() {
  yield takeLatest(INCREMENT_ASYNC, incrementAsync);
}

export { watchIncrement };
