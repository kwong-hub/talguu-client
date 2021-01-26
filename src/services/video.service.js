import axios from "axios";
import { enviroment } from "../config/config";

export default {
  addVideo: async function (body) {
    try {
      const user = await axios.post(`${enviroment}/user`,body);
      return user.data;
    } catch (error) {
      throw error;
    }
  },
};
