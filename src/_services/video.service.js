import axios from "./axiosDefault";

import { environment } from "../config/config";

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
      const video = await axios.patch(`${environment}/video`, body);
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

  getViewerVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/user`);
      console.log(videos.data);
      return { data: videos.data, success: true };
    } catch (error) {
      throw { error, success: false };
    }
  },

  getPaidVideoUrl: async function (videoId) {
    try {
      const videos = await axios.get(`${environment}/video/purchase_video_url?videoId=${videoId}`);
      return videos.data;
    } catch (error) {
      throw error;
    }
  },

  purchaseVideo: async function (videoId) {
    try {
      const thumb = await axios.post(`${environment}/video/purchase`, { videoId });
      return thumb.data;
    } catch (error) {
      throw error;
    }
  },
};
