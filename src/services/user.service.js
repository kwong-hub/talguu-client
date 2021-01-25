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
};
