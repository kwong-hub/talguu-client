import {
  ADD_PAYMENT_INFO_SUCCESS,
  ADD_PAYMENT_INFO_FAILURE,
  GET_USER_PAYMENT_INFOS_SUCCESS,
  GET_USER_PAYMENT_INFOS_FAILURE,
} from "../types";

const INITIAL_STATE = {
  paymentInfos: [],
  paymentInfo: null,
  addPaymentInfoStatus: null,
  getPaymentInfosStatus: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PAYMENT_INFO_SUCCESS:
      return { ...state, addPaymentInfoStatus: "SUCCESS", paymentInfo: action.payload };
    case ADD_PAYMENT_INFO_FAILURE:
      return { ...state, addPaymentInfoStatus: "ERROR" };
    case GET_USER_PAYMENT_INFOS_SUCCESS:
      return { ...state, getPaymentInfosStatus: "SUCCESS", paymentInfos: action.payload };
    case GET_USER_PAYMENT_INFOS_FAILURE:
      return { ...state, getPaymentInfosStatus: "FAILURE" };
    default:
      return state;
  }
};
