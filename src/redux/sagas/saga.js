import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import userService from "../../services/user.service";
import {
  CREATE_PRODUCER_ASYNC,
  CREATE_PRODUCER_FAILURE,
  CREATE_PRODUCER_SUCCESS,
  CREATE_VIEWER_ASYNC,
  CREATE_VIEWER_FAILURE,
  CREATE_VIEWER_SUCCESS,
  VIEWER_LIVE_SUCCESS,
  VIEWER_LIVE_FAILURE,
  VIEWER_LIVE_ASYNC,
  // ERROR_UNAUTHORIZED,
  GET_PAID_VIDEO_URL_ASYNC,
  GET_PAID_VIDEO_URL_FAILURE,
  GET_PAID_VIDEO_URL_SUCCESS,
  PAID_VIEWER_VIDEOS_ASYNC,
  PAID_VIEWER_VIDEOS_FAILURE,
  PAID_VIEWER_VIDEOS_SUCCESS,
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
  ADD_PAYMENT_INFO_ASYNC,
  ADD_PAYMENT_INFO_SUCCESS,
  ADD_PAYMENT_INFO_FAILURE,
  GET_USER_PAYMENT_INFOS_ASYNC,
  GET_USER_PAYMENT_INFOS_SUCCESS,
  GET_USER_PAYMENT_INFOS_FAILURE,
  SAVE_LATER_ASYNC,
  SAVE_LATER_SUCCESS,
  SAVE_LATER_FAILURE,
  GET_SAVED_VIDEOS_ASYNC,
  GET_SAVED_VIDEOS_SUCCESS,
  GET_SAVED_VIDEOS_FAILURE,
} from "../types";
import { userConstants } from "../../_constants";
import { userService } from "../../_services/user.service";
import videoService from "../../_services/video.service";
import paymentService from "../../_services/payment.service";

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
  // console.log("action", action);
  let video = yield call(videoService.addVideo, action.payload);
  // console.log(video);
  if (video && video.success) {
    yield put({ type: VIDEO_SUCCESS, payload: video.data });
  } else {
    yield put({ type: VIDEO_FAILURE, payload: video.messages });
  }
}

function* getViewerVideosAsync(action) {
  let res = yield call(videoService.getViewerVideos, action.payload);
  if (res.success) {
    yield put({ type: VIEWER_VIDEOS_SUCCESS, payload: res.data });
  } else {
    yield put({ type: VIEWER_VIDEOS_FAILURE, payload: "Server Error" });
  }
}

function* getViewerLiveVideos(action) {
  let res = yield call(videoService.getViewerLiveVideos);
  if (res.success) {
    yield put({ type: VIEWER_LIVE_SUCCESS, payload: res.data });
  } else {
    yield put({ type: VIEWER_LIVE_FAILURE, payload: "Server Error" });
  }
}

function* getPaidVideoUrlAsync(action) {
  // console.log(action);
  let video = yield call(videoService.getPaidVideoUrl, action.payload);

  if (video && video) {
    yield put({ type: GET_PAID_VIDEO_URL_SUCCESS, payload: video });
  } else {
    yield put({ type: GET_PAID_VIDEO_URL_FAILURE, payload: video });
  }
}

function* purchaseVideoAsync(action) {
  let res = yield call(videoService.purchaseVideo, action.payload);

  console.log("from saga", res);
  if (res && res.video_link) {
    yield put({ type: PURCHASE_VIDEO_SUCCESS, payload: res });
  } else {
    yield put({ type: PURCHASE_VIDEO_FAILURE, payload: res.message });
  }
}

function* saveLaterVideoAsync(action) {
  let res = yield call(videoService.saveVideoLater, action.payload);

  if (res && res.success) {
    yield put({ type: SAVE_LATER_SUCCESS, payload: res.video });
  } else {
    yield put({ type: SAVE_LATER_FAILURE, payload: res.video });
  }
}

function* getPaidUserVideosAsync(action) {
  let res = yield call(videoService.getPaidUserVideos);
  if (res.success) {
    yield put({ type: PAID_VIEWER_VIDEOS_SUCCESS, payload: res.data });
  } else {
    yield put({ type: PAID_VIEWER_VIDEOS_FAILURE, payload: "Server error" });
  }
}

function* getSavedVideosAsync(action) {
  let res = yield call(videoService.getSavedUserVideos);
  if (res.success) {
    yield put({ type: GET_SAVED_VIDEOS_SUCCESS, payload: res.data });
  } else {
    yield put({ type: GET_SAVED_VIDEOS_FAILURE, payload: "Server error" });
  }
}

function* addPaymentInfoAsync(action) {
  let res = yield call(paymentService.addPaymentInfo, action.payload);

  if (res.success) {
    yield put({ type: ADD_PAYMENT_INFO_SUCCESS, payload: res.payment_info });
  } else {
    yield put({
      type: ADD_PAYMENT_INFO_FAILURE,
      payload: "Can not create payment information. Try again.",
    });
  }
}

function* getPaymentInfoAsync(action) {
  let res = yield call(paymentService.getUserPaymentInfos, action.payload);

  if (res.success) {
    yield put({ type: GET_USER_PAYMENT_INFOS_SUCCESS, payload: res.payment_infos });
  } else {
    yield put({ type: GET_USER_PAYMENT_INFOS_FAILURE, payload: "Server error" });
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
    takeLatest(VIEWER_LIVE_ASYNC, getViewerLiveVideos),
    takeLatest(GET_PAID_VIDEO_URL_ASYNC, getPaidVideoUrlAsync),
    takeLatest(GET_SAVED_VIDEOS_ASYNC, getSavedVideosAsync),
    takeLatest(PURCHASE_VIDEO_ASYNC, purchaseVideoAsync),
    takeLatest(SAVE_LATER_ASYNC, saveLaterVideoAsync),
    takeLatest(PAID_VIEWER_VIDEOS_ASYNC, getPaidUserVideosAsync),
    takeLatest(ADD_PAYMENT_INFO_ASYNC, addPaymentInfoAsync),
    takeLatest(GET_USER_PAYMENT_INFOS_ASYNC, getPaymentInfoAsync),
  ]);
}

export default watchAll;
