

const INITIAL_STATE = {
    showVideoPlayer: false
}


const SHOW_VIDEO_PLAYER = "SHOW_VIDEO";

const HIDE_VIDEO_PLAYER = "HIDE_VIDEO"



const customReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SHOW_VIDEO_PLAYER:
            return {...state ,showVideoPlayer: true }
        case HIDE_VIDEO_PLAYER:
            return { ...state, showVideoPlayer: false }

        default: 
            return state
    }
}


export const showVideoModal  = (action) =>{
    return { type: SHOW_VIDEO_PLAYER }
    
    
}
export const hideVideoModal = (action) => {
    return { type: HIDE_VIDEO_PLAYER }


}

export default customReducer;