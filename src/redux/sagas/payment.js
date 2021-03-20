import { call, put } from 'redux-saga/effects'
import {
  ADD_PAYMENT_INFO_FAILURE,
  ADD_PAYMENT_INFO_SUCCESS,
  GET_USER_PAYMENT_INFOS_FAILURE,
  GET_USER_PAYMENT_INFOS_SUCCESS
} from '../types'
import paymentService from '../../_services/payment.service'

function* addPaymentInfoAsync(action) {
  const res = yield call(paymentService.addPaymentInfo, action.payload)

  if (res.success) {
    yield put({ type: ADD_PAYMENT_INFO_SUCCESS, payload: res.payment_info })
  } else {
    yield put({
      type: ADD_PAYMENT_INFO_FAILURE,
      payload: 'Can not create payment information. Try again.'
    })
  }
}

function* getPaymentInfoAsync(action) {
  const res = yield call(paymentService.getUserPaymentInfos, action.payload)

  if (res.success) {
    yield put({ type: GET_USER_PAYMENT_INFOS_SUCCESS, payload: res.payment_infos })
  } else {
    yield put({ type: GET_USER_PAYMENT_INFOS_FAILURE, payload: 'Server error' })
  }
}

export default {
  addPaymentInfoAsync,
  getPaymentInfoAsync
}
