
// import { LAUGHTER_URL } from "../environment/config";
import axios from './axiosDefault'
import { environment } from '../environment/config'


const laughterVideos = async (page, pageSize) => {
    try {
        const response = await axios.get(`${environment}/video/laughter?page=${page}&pageSize=${pageSize}`)
        
        return response;
    } catch (error) {
        return error
    }
}

const introVideos = async (page, pageSize) => {
    try {
        const response = await axios.get(`${environment}/video/intro?page=${page}&pageSize=${pageSize}`)

        return response;
    } catch (error) {
        return error
    }
}

const getSingleLaughterVideo = async (videoId) => {
    try {
        const response = await axios.get(`${environment}/video/laughter/${videoId}`)
        return response;
    } catch (error) {
        return error
    }
}

const getLaughterVideoUrl = async (videoId) => {
    try {
        const response = await axios.get(`${environment}/video/laughter_video_url?videoId=${videoId}`)
        return response.data;
    } catch (error) {
        return error
    }
}


const getPublicLaughterVideoUrl = async (token,vdy) => {
    try {
        const response = await axios.get(`${environment}/video/lftr_url?tkn=${token}&vdy=${vdy}`)
        return response.data;
    } catch (error) {
        return error
    }
}

const getPreviewVideoUrl = async (body) => {
    try {
        const response = await axios.post(`${environment}/video/preview_laughter_url`, body)
        return response.data;
    } catch (error) {
        return error
    }
}

const getProducerLaughterVideos = async (producerId, page, pageSize) => {
    try {
        const response = await axios.get(`${environment}/video/laughter/${producerId}?page=${page}&pageSize=${pageSize}`)
        return response;
    } catch (error) {
        return error
    }
}


export const laughterService = {
    laughterVideos,
    getSingleLaughterVideo,
    getProducerLaughterVideos,
    getLaughterVideoUrl,
    introVideos,
    getPreviewVideoUrl,
    getPublicLaughterVideoUrl
}