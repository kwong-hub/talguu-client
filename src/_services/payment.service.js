import axios from "./axiosDefault";

import { environment } from "../config/config";
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
  getPaymentInfos: async (username) => {
    try {
      const payment = await axios.get(
        `${environment}/payment/list/${username}`
      );
      return payment.data;
    } catch (error) {
      throw error;
    }
  },
  getBalance: async () => {
    try {
      const payment = await axios.get(`${environment}/payment/balance`);
      return payment.data;
    } catch (error) {
      throw error;
    }
  },
  addDeposit: async (data) => {
    try {
      const payment = await axios.post(`${environment}/payment/deposit`, data);
      return payment.data;
    } catch (error) {
      throw error;
    }
  },
};
