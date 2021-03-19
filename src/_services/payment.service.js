import { environment } from '../config/config'
import axios from './axiosDefault'
import { checkResponse } from './errorHandler'

const videoService = {
  addPaymentInfo: async(payload) => {
    try {
      const res = await axios.post(`${environment}/payment/create`, payload)
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  getUserPaymentInfos: async(payload) => {
    try {
      const res = await axios.get(`${environment}/payment/list/${payload}`)
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  getPaymentInfos: async(username) => {
    try {
      const payment = await axios.get(`${environment}/payment/list/${username}`)
      return payment.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  getBalance: async() => {
    try {
      const payment = await axios.get(`${environment}/payment/balance`)
      return payment.data
    } catch (error) {
      return checkResponse(error)
      // throw error;
    }
  },
  addDeposit: async(data) => {
    try {
      const payment = await axios.post(`${environment}/payment/deposit`, data)
      return payment.data
    } catch (error) {
      return checkResponse(error)
    }
  }
}

export default videoService
