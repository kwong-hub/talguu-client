import axios from "./axiosDefault";
import { environment } from "../config/config";

async function getPaymentInfos(username) {
  try {
    const payment = await axios.get(`${environment}/payment/list/${username}`);
    return payment.data;
  } catch (error) {
    throw error;
  }
}

async function addDeposit(data) {
  try {
    const payment = await axios.post(`${environment}/payment/deposit`, data);
    return payment.data;
  } catch (error) {
    throw error;
  }
}

export const paymentService = {
  getPaymentInfos,
  addDeposit,
};
