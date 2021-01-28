import axios from "axios";
import { enviroment } from "../config/config";

export default {
  getUser: async function () {
    try {
      const user = await axios.get(`${enviroment}/user`);
      return user.data;
    } catch (error) {
      throw error;
    }
  },
  login: async function (data) {
    try {
      const user = await axios.post(`${enviroment}/account/login`,data);
      return user.data;
    } catch (error) {
      throw error;
    }
  },

};
