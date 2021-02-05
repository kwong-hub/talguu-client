import axios from "axios";
import { environment } from "../config/config";

export default {
  getUser: async function () {
    try {
      const user = await axios.get(`${environment}/user`);
      return user.data;
    } catch (error) {
      throw error;
    }
  },
  login: async function (data) {
    try {
      const user = await axios.post(`${environment}/account/login`, data);
      return user.data;
    } catch (error) {
      throw error;
    }
  },

  createProducer: async function (data) {
    try {
      const user = await axios.post(`${environment}/account/producer_sign_up`, data);
      return user.data;
    } catch (error) {
      throw error;
    }
  },

  createViewer: async function (data) {
    try {
      const user = await axios.post(`${environment}/account/viewer_sign_up`, data);
      return user.data;
    } catch (error) {
      throw error;
    }
  },
};
