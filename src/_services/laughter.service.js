
import { LAUGHTER_URL } from "../environment/config";
import axios from './axiosDefault'


const laughterVideos = async (page, pageSize) => {
    try {
        const response = await axios.get(`${LAUGHTER_URL}/videos/?page=${page}&pageSize=${pageSize}`)
        return response;
    } catch (error) {
        return error
    }
}




export const laughterService = {
    laughterVideos
}