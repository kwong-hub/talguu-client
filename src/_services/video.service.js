import { environment } from '../environment/config'
import axios from './axiosDefault'

import { checkResponse } from './errorHandler'

const videoService = {
  addVideo: async function (body) {
    try {
      return await axios.post(`${environment}/video`, body)
      // return user.data;
    } catch (error) {
      return checkResponse(error)
    }
  },
  getVideos: async function (pagination) {
    try {
      const video = await axios.get(
        `${environment}/video?current=${pagination.current}&pageSize=${pagination.pageSize}&type=${pagination.type}`
      )
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  getLiveRecVideos: async function (pagination) {
    try {
      const video = await axios.get(
        `${environment}/video?current=${pagination.current}&pageSize=${pagination.pageSize}`
      )
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  getProdVideoById: async function (id) {
    try {
      const video = await axios.get(`${environment}/video/${id}`)
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  deleteVideo: async function (id) {
    try {
      const video = await axios.delete(`${environment}/video/${id}`)
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  togglePublishVideo: async function (id) {
    try {
      const video = await axios.patch(`${environment}/video/publish/${id}`)
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  updateVideo: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video`, body)
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  createStreamKey: async function (body) {
    try {
      const video = await axios.post(`${environment}/video/stream`, {
        ...body
      })
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  endStream: async function (body) {
    try {
      const video = await axios.patch(`${environment}/video/end/stream`, {
        stream_key: body
      })
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  editStream: async function (body) {
    try {
      const video = await axios.put(`${environment}/video/edit/stream`, body)
      return video.data
    } catch (error) {
      console.log(error)
      return checkResponse(error)
    }
  },

  getStreamed: async function () {
    try {
      const video = await axios.get(`${environment}/video/stream`)
      return video.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  addThumbnail: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/thumbnail`, body)
      return thumb.data
    } catch (error) {
      return checkResponse(error)
    }
  },
  addTrailer: async function (body) {
    try {
      const thumb = await axios.post(`${environment}/video/trailer`, body)
      return thumb.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  getViewerVideos: async function (query) {
    try {
      const videos = await axios.get(
        `${environment}/video/user` + (query.q ? `?q=${query.q}` : '')
      )
      return { data: videos.data, success: true }
    } catch (error) {
      return checkResponse(error)
      // throw { error, success: false };
    }
  },

  getViewerLiveVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/live/user`)
      return { data: videos.data, success: true }
    } catch (error) {
      return checkResponse(error)
    }
  },

  getPaidVideoUrl: async function (videoId) {
    try {
      const videos = await axios.get(
        `${environment}/video/purchase_video_url?videoId=${videoId}`
      )
      return videos.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  purchaseVideo: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/purchase`, {
        videoId
      })
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  getPaidUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/purchased_videos`)
      return { data: videos.data, success: true }
    } catch (error) {
      return checkResponse(error)
    }
  },

  getSavedUserVideos: async function () {
    try {
      const videos = await axios.get(`${environment}/video/saved_videos`)
      return { data: videos.data, success: true }
    } catch (error) {
      return checkResponse(error)
    }
  },

  saveVideoLater: async function (videoId) {
    try {
      const res = await axios.post(`${environment}/video/save_later`, {
        videoId
      })
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  getUploadUrl: async function (body) {
    try {
      const res = await axios.post(`${environment}/video/get_upload_url`, body)
      return res.data.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  uploadVideoToS3: async function (url, formData, config) {
    const instance = axios.create()
    try {
      const res = await instance.post(url, formData, config)
      return res
    } catch (error) {
      console.log(error)
      return checkResponse(error)
    }
  },

  likeDislikeVideo: async function (likeObject) {
    try {
      const res = await axios.post(
        `${environment}/video/like_dislike`,
        likeObject
      )
      return res
    } catch (error) {
      return checkResponse(error)
    }
  },

  addComment: async function (commentObject) {
    try {
      const res = await axios.post(
        `${environment}/video/comments`,
        commentObject
      )
      return res
    } catch (error) {
      return checkResponse(error)
    }
  },

  commentVideo: async function (commentObject) {
    try {
      const res = await axios.post(
        `${environment}/video/like_dislike`,
        commentObject
      )
      return res
    } catch (error) {
      return checkResponse(error)
    }
  },

  incrementVideoView: async function (viewObject) {
    try {
      const res = await axios.post(`${environment}/video/view`, viewObject)
      return res
    } catch (error) {
      return checkResponse(error)
    }
  },

  generateInvitationLink: async function (body) {
    try {
      const res = await axios.post(
        `${environment}/video/conference/invations`,
        body
      )
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  },

  getConferenceRoom: async function (body) {
    try {
      const res = await axios.get(
        `${environment}/video/conference?token=${body.token}&passcode=${body.passcode}`,
        body
      )
      return res.data
    } catch (error) {
      return checkResponse(error)
    }
  }

}

export default videoService
