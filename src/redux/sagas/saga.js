import { all, call, put, takeLatest } from "redux-saga/effects";
// import userService from "../../services/user.service";
import {
  CREATE_USER_ASYNC,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  INCREMENT,
  INCREMENT_ASYNC,
  UPLOAD_ASYNC,
  VIDEO_FAILURE,
  VIDEO_READY,
  VIDEO_READY_ASYNC,
  VIDEO_SUCCESS,
} from "../types";
import { userConstants } from "../../_constants";
import { userService } from "../../_services/user.service";
import videoService from "../../_services/video.service";

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

function* videoUpload(action) {
  console.log('action', action)
  let video = yield call(videoService.addVideo, action.payload);
  // console.log(video);
  if (video && video.success) {
    yield put({ type:VIDEO_SUCCESS, payload: video.data });
  } else {
    yield put({ type: VIDEO_FAILURE, payload: video.messages });
  }
}


function* videoOnReady(action) {
  yield put({ type: VIDEO_READY, payload: action.payload });
}

function* watchAll() {
  yield all([
    takeLatest(CREATE_USER_ASYNC, createUserAsync),
    takeLatest(INCREMENT_ASYNC, incrementAsync),
    takeLatest("LOGIN_ASYNC", loginSuccess),
    takeLatest("LOGIN_FAIL", loginFail),
    takeLatest(userConstants.LOGOUT_ASYNC, logout),
    takeLatest(UPLOAD_ASYNC, videoUpload),
    takeLatest(VIDEO_READY_ASYNC, videoOnReady),
  ]);
}

export default watchAll;
