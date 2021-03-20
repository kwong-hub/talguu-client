import { call, put } from 'redux-saga/effects'
import videoService from '../../_services/video.service'
import {
  GET_PAID_VIDEO_URL_FAILURE,
  GET_PAID_VIDEO_URL_SUCCESS,
  GET_SAVED_VIDEOS_FAILURE,
  GET_SAVED_VIDEOS_SUCCESS,
  PAID_VIEWER_VIDEOS_FAILURE,
  PAID_VIEWER_VIDEOS_SUCCESS,
  PURCHASE_VIDEO_FAILURE,
  PURCHASE_VIDEO_SUCCESS,
  SAVE_LATER_FAILURE,
  SAVE_LATER_SUCCESS,
  VIDEO_FAILURE,
  VIDEO_READY,
  VIDEO_SUCCESS,
  VIEWER_LIVE_FAILURE,
  VIEWER_LIVE_SUCCESS,
  VIEWER_VIDEOS_FAILURE,
  VIEWER_VIDEOS_SUCCESS
} from '../types'

function* videoUpload(action) {
  const video = yield call(videoService.addVideo, action.payload)
  if (video && video.success) {
    yield put({ type: VIDEO_SUCCESS, payload: video.data })
  } else {
    yield put({ type: VIDEO_FAILURE, payload: video.messages })
  }
}

function* videoOnReady(action) {
  yield put({ type: VIDEO_READY, payload: action.payload })
}

function* getViewerVideosAsync(action) {
  const res = yield call(videoService.getViewerVideos, action.payload)
  if (res.success) {
    yield put({ type: VIEWER_VIDEOS_SUCCESS, payload: res.data })
  } else {
    yield put({ type: VIEWER_VIDEOS_FAILURE, payload: 'Server Error' })
  }
}

function* getViewerLiveVideos(action) {
  const res = yield call(videoService.getViewerLiveVideos)
  if (res.success) {
    yield put({ type: VIEWER_LIVE_SUCCESS, payload: res.data })
  } else {
    yield put({ type: VIEWER_LIVE_FAILURE, payload: 'Server Error' })
  }
}

function* getPaidVideoUrlAsync(action) {
  const video = yield call(videoService.getPaidVideoUrl, action.payload)

  if (video && video) {
    yield put({ type: GET_PAID_VIDEO_URL_SUCCESS, payload: video })
  } else {
    yield put({ type: GET_PAID_VIDEO_URL_FAILURE, payload: video })
  }
}

function* getSavedVideosAsync(action) {
  const res = yield call(videoService.getSavedUserVideos)
  if (res.success) {
    yield put({ type: GET_SAVED_VIDEOS_SUCCESS, payload: res.data })
  } else {
    yield put({ type: GET_SAVED_VIDEOS_FAILURE, payload: 'Server error' })
  }
}

function* purchaseVideoAsync(action) {
  const res = yield call(videoService.purchaseVideo, action.payload)

  if (res && res.video_link) {
    yield put({ type: PURCHASE_VIDEO_SUCCESS, payload: res })
  } else {
    yield put({ type: PURCHASE_VIDEO_FAILURE, payload: res.message })
  }
}

function* saveLaterVideoAsync(action) {
  const res = yield call(videoService.saveVideoLater, action.payload)

  if (res && res.success) {
    yield put({ type: SAVE_LATER_SUCCESS, payload: res.video })
  } else {
    yield put({ type: SAVE_LATER_FAILURE, payload: res.video })
  }
}

function* getPaidUserVideosAsync(action) {
  const res = yield call(videoService.getPaidUserVideos)
  if (res.success) {
    yield put({ type: PAID_VIEWER_VIDEOS_SUCCESS, payload: res.data })
  } else {
    yield put({ type: PAID_VIEWER_VIDEOS_FAILURE, payload: 'Server error' })
  }
}

export default {
  videoUpload,
  videoOnReady,
  getViewerVideosAsync,
  getViewerLiveVideos,
  getPaidVideoUrlAsync,
  getSavedVideosAsync,
  purchaseVideoAsync,
  saveLaterVideoAsync,
  getPaidUserVideosAsync
}
