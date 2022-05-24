
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




export const laughterService = {
    laughterVideos
}