import { all, call, put, takeLatest } from "redux-saga/effects";
// import userService from "../../services/user.service";
import {
  CREATE_PRODUCER_ASYNC,
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_SUCCESS,
  CREATE_VIEWER_ASYNC,
  CREATE_VIEWER_FAILURE,
  CREATE_VIEWER_SUCCESS,
  GET_PAID_VIDEO_URL_ASYNC,
  GET_PAID_VIDEO_URL_FAILURE,
  GET_PAID_VIDEO_URL_SUCCESS,
  PURCHASE_VIDEO_ASYNC,
  PURCHASE_VIDEO_FAILURE,
  PURCHASE_VIDEO_SUCCESS,
  UPLOAD_ASYNC,
  VIDEO_FAILURE,
  VIDEO_READY,
  VIDEO_READY_ASYNC,
  VIDEO_SUCCESS,
  VIEWER_VIDEOS_ASYNC,
  VIEWER_VIDEOS_FAILURE,
  VIEWER_VIDEOS_SUCCESS,
} from "../types";
import { userConstants } from "../../_constants";
import { userService } from "../../_services/user.service";
import videoService from "../../_services/video.service";

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

function* videoUpload(action) {
  console.log("action", action);
  let video = yield call(videoService.addVideo, action.payload);
  // console.log(video);
  if (video && video.success) {
    yield put({ type: VIDEO_SUCCESS, payload: video.data });
  } else {
    yield put({ type: VIDEO_FAILURE, payload: video.messages });
  }
}

function* getViewerVideosAsync(action) {
  console.log("getting viewer videos...");
  let videos = yield call(videoService.getViewerVideos);
  if (videos) {
    yield put({ type: VIEWER_VIDEOS_SUCCESS, payload: videos });
  } else {
    yield put({ type: VIEWER_VIDEOS_FAILURE, payload: "Server Error" });
  }
}

function* getPaidVideoUrlAsync(action) {
  let video = yield call(videoService.getPaidVideoUrl, action.payload);

  if (video && video) {
    yield put({ type: GET_PAID_VIDEO_URL_SUCCESS, payload: video });
  } else {
    yield put({ type: GET_PAID_VIDEO_URL_FAILURE, payload: video });
  }
}

function* purchaseVideoAsync(action) {
  let video = yield call(videoService.purchaseVideo, action.payload);

  if (video && video) {
    yield put({ type: PURCHASE_VIDEO_SUCCESS, payload: video });
  } else {
    yield put({ type: PURCHASE_VIDEO_FAILURE, payload: video });
  }
}

function* videoOnReady(action) {
  yield put({ type: VIDEO_READY, payload: action.payload });
}

function* watchAll() {
  yield all([
    takeLatest(CREATE_PRODUCER_ASYNC, createUserAsync),
    takeLatest(CREATE_VIEWER_ASYNC, createViewerAsync),
    takeLatest("LOGIN_ASYNC", loginSuccess),
    takeLatest("LOGIN_FAIL", loginFail),
    takeLatest(userConstants.LOGOUT_ASYNC, logout),
    takeLatest(UPLOAD_ASYNC, videoUpload),
    takeLatest(VIDEO_READY_ASYNC, videoOnReady),
    takeLatest(VIEWER_VIDEOS_ASYNC, getViewerVideosAsync),
    takeLatest(GET_PAID_VIDEO_URL_ASYNC, getPaidVideoUrlAsync),
    takeLatest(PURCHASE_VIDEO_ASYNC, purchaseVideoAsync),
  ]);
}

export default watchAll;
