import axios from "./axiosDefault";

import { environment } from "../config/config";
import { authHeader } from "../_helpers";

export default {
  addVideo: async function (body, onUploadProgress) {
    try {
      return await axios.post(`${environment}/video`, body, onUploadProgress);
      // return user.data;
    } catch (error) {
      throw error;
    }
  },
  getVideos: async function (pagination) {
    try {
      const video = await axios.get(
        `${environment}/video?current=${pagination.current}&pageSize=${pagination.pageSize}`
      );
      return video.data;
    } catch (error) {
      throw error;
    }
  },
  getProdVideoById: async function (id) {
    try {
      const video = await axios.get(
        `${environment}/video/${id}`
      );
      return video.data;
    } catch (error) {
      throw error;
    }
  },
  deleteVideo: async function (id) {
    try {
      const video = await axios.delete(`${environment}/video/${id}`);
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

  createStreamKey: async function (body) {
    try {
      const video = await axios.post(`${environment}/video/stream`, {
        ...body,
      });
      return video.data;
    } catch (error) {
      throw error;
    }
  },
  endStream: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video/end/stream`, {
        stream_key: body,
      });
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
  addTrailer: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/trailer`, body);
      return thumb.data;
    } catch (error) {
      throw error;
    }
  },

  getViewerVideos: async function (query) {
    try {
      const videos = await axios.get(
        `${environment}/video/user` + (query.q ? `?q=${query.q}` : "")
      );
      // console.log(videos.data);
      return { data: videos.data, success: true };
    } catch (error) {
      throw { error, success: false };
    }
  },

  getViewerLiveVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/live/user`);
      return { data: videos.data, success: true };
    } catch (error) {
      throw { error, success: false };
    }
  },

  getPaidVideoUrl: async function (videoId) {
    try {
      const videos = await axios.get(
        `${environment}/video/purchase_video_url?videoId=${videoId}`
      );
      return videos.data;
    } catch (error) {
      throw error;
    }
  },

  purchaseVideo: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/purchase`, {
        videoId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  getPaidUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/purchased_videos`);
      return { data: videos.data, success: true };
    } catch (error) {
      throw { error, success: false };
    }
  },

  getSavedUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/saved_videos`);
      return { data: videos.data, success: true };
    } catch (error) {
      throw { error, success: false };
    }
  },

  saveVideoLater: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/save_later`, {
        videoId,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
};
