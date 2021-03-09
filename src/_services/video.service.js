import axiosOr from "axios";

import { environment } from "../config/config";
import axios from "./axiosDefault";

import { checkResponse } from "./errorHandler";

export default {
  addVideo: async function (body, onUploadProgress) {
    try {
      return await axios.post(`${environment}/video`, body, onUploadProgress);
      // return user.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  getVideos: async function (pagination) {
    try {
      const video = await axios.get(
        `${environment}/video?current=${pagination.current}&pageSize=${pagination.pageSize}`
      );
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  getProdVideoById: async function (id) {
    try {
      const video = await axios.get(`${environment}/video/${id}`);
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  deleteVideo: async function (id) {
    try {
      const video = await axios.delete(`${environment}/video/${id}`);
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  updateVideo: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video`, body);
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  createStreamKey: async function (body) {
    try {
      const video = await axios.post(`${environment}/video/stream`, {
        ...body,
      });
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  endStream: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video/end/stream`, {
        stream_key: body,
      });
      return video.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  addThumbnail: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/thumbnail`, body);
      return thumb.data;
    } catch (error) {
      return checkResponse(error);
    }
  },
  addTrailer: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/trailer`, body);
      return thumb.data;
    } catch (error) {
      return checkResponse(error);
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
      return checkResponse(error);
      // throw { error, success: false };
    }
  },

  getViewerLiveVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/live/user`);
      return { data: videos.data, success: true };
    } catch (error) {
      return checkResponse(error);
    }
  },

  getPaidVideoUrl: async function (videoId) {
    try {
      const videos = await axios.get(`${environment}/video/purchase_video_url?videoId=${videoId}`);
      return videos.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  purchaseVideo: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/purchase`, {
        videoId,
      });
      return res.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  getPaidUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/purchased_videos`);
      return { data: videos.data, success: true };
    } catch (error) {
      return checkResponse(error);
    }
  },

  getSavedUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/saved_videos`);
      return { data: videos.data, success: true };
    } catch (error) {
      return checkResponse(error);
    }
  },

  saveVideoLater: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/save_later`, {
        videoId,
      });
      return res.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  getUploadUrl: async function (body) {
    try {
      const res = await axios.post(`${environment}/video/get_upload_url`, body);
      return res.data.data;
    } catch (error) {
      return checkResponse(error);
    }
  },

  uploadVideoToS3: async function (signedRequest, file, options) {
    try {
      const res = await axiosOr.put(signedRequest, file, options);
      return res;
    } catch (error) {
      return checkResponse(error);
    }
  },
};
