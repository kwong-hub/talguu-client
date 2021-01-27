import axios from "axios";

import  { enviroment } from "../config/config";

axios.create({
  baseURL: enviroment,
  headers: {
    "Content-type": "application/json"
  }
});


export default {
  addVideo: async function (body, onUploadProgress) {
    try {
     return  await axios.post(
        `${enviroment}/video`,
        body,
        onUploadProgress
      );
      // return user.data;
    } catch (error) {
      throw error;
    }
  },
};
