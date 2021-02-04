import axios from "axios";

import { environment } from "../config/config";

// axios.create({
//   baseURL: environment,
//   headers: {
//     "Content-type": "application/json",
//   },
// });

export default {
  addVideo: async function (body, onUploadProgress) {
    try {
      return await axios.post(`${environment}/video`, body, onUploadProgress);
      // return user.data;
    } catch (error) {
      throw error;
    }
  },
  getVideos: async function () {
    try {
      const video = await axios.get(`${environment}/video`);
      return video.data;
    } catch (error) {
      throw error;
    }
  },
  updateVideo: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video`,body);
      return video.data;
    } catch (error) {
      throw error;
    }
  },

  addThumbnail: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/thumbnail`, body);
      return thumb.data;
    } catch (error) {
      throw error;
    }
  },
};
