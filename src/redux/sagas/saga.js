import axios from "axios";
import { all, call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import userService from "../../services/user.service";
import {
  CREATE_USER_ASYNC,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  INCREMENT,
  INCREMENT_ASYNC,
} from "../types";

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

function* watchAll() {
  yield all([
    takeLatest(CREATE_USER_ASYNC, createUserAsync),
    takeLatest(INCREMENT_ASYNC, incrementAsync),
  ]);
}

export default watchAll;
