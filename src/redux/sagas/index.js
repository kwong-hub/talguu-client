import { all, takeLatest } from 'redux-saga/effects'
import { userConstants } from '../../_constants'
import {
  ADD_PAYMENT_INFO_ASYNC,
  CREATE_PRODUCER_ASYNC,
  CREATE_VIEWER_ASYNC,
  GET_PAID_VIDEO_URL_ASYNC,
  GET_SAVED_VIDEOS_ASYNC,
  GET_USER_PAYMENT_INFOS_ASYNC,
  GET_USER_PROFILE_ASYNC,
  PAID_VIEWER_VIDEOS_ASYNC,
  PURCHASE_VIDEO_ASYNC,
  SAVE_LATER_ASYNC,
  UPLOAD_ASYNC,
  VIDEO_READY_ASYNC,
  VIEWER_LIVE_ASYNC,
  VIEWER_VIDEOS_ASYNC
} from '../types'
import paymentSaga from './payment'
import userSaga from './user'
import videoSaga from './video'

function* watchAll() {
  yield all([
    takeLatest(CREATE_PRODUCER_ASYNC, userSaga.createUserAsync),
    takeLatest(CREATE_VIEWER_ASYNC, userSaga.createViewerAsync),
    takeLatest(userConstants.LOGIN_ASYNC, userSaga.loginSuccess),
    takeLatest(userConstants.LOGIN_FAIL, userSaga.loginFail),
    takeLatest(userConstants.LOGOUT_ASYNC, userSaga.logout),
    takeLatest(GET_USER_PROFILE_ASYNC, userSaga.getUserProfileInfo),
    takeLatest(UPLOAD_ASYNC, videoSaga.videoUpload),
    takeLatest(VIDEO_READY_ASYNC, videoSaga.videoOnReady),
    takeLatest(VIEWER_VIDEOS_ASYNC, videoSaga.getViewerVideosAsync),
    takeLatest(VIEWER_LIVE_ASYNC, videoSaga.getViewerLiveVideos),
    takeLatest(GET_PAID_VIDEO_URL_ASYNC, videoSaga.getPaidVideoUrlAsync),
    takeLatest(GET_SAVED_VIDEOS_ASYNC, videoSaga.getSavedVideosAsync),
    takeLatest(PURCHASE_VIDEO_ASYNC, videoSaga.purchaseVideoAsync),
    takeLatest(SAVE_LATER_ASYNC, videoSaga.saveLaterVideoAsync),
    takeLatest(PAID_VIEWER_VIDEOS_ASYNC, videoSaga.getPaidUserVideosAsync),
    takeLatest(ADD_PAYMENT_INFO_ASYNC, paymentSaga.addPaymentInfoAsync),
    takeLatest(GET_USER_PAYMENT_INFOS_ASYNC, paymentSaga.getPaymentInfoAsync)
  ])
}

export default watchAll
