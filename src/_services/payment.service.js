import axios from "./axiosDefault";

import { environment } from "../config/config";
import { authHeader } from "../_helpers";

export default {
  addPaymentInfo: async (payload) => {
    try {
      let res = await axios.post(`${environment}/payment/create`, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getUserPaymentInfos: async (payload) => {
    try {
      let res = await axios.get(`${environment}/payment/list/${payload}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
