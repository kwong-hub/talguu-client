import { Spin } from 'antd'
import React from 'react'
import VideoPlayer from '../VideoPlayer'

import {FaPlay} from 'react-icons/fa'
import Loader from '../common/loader/Loader'

const PreviewLaughter = ({
  playVideo,
  introVideoUrl,
  randomStr,
  handlePlayerReady,
  showOverlayText,
  loading,
  sendingData,
  showConfirmation,
  textColor,
  handlePlayPause,
  isPlaying,
  isSettingVisible,
  textSize
}) => {
  
  
  const renderPlayer = () => {
    const videoJsOptions = {
      videoId: "randomId123",
      autoplay: true,
      controls: false,
      errorDisplay: false,
      aspectRatio: '9:16',
      responsive: true,
      fill: true,
      sources: [
        {
          src: introVideoUrl,
          type: "application/x-mpegURL"
        }
      ]
    }
    if (introVideoUrl) {
      return (
        <div className="w-full relative">
          <div div className = "w-screen h-screen md:w-72 md:mt-5"
          key = {
            randomStr
          } >
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          {showOverlayText && !loading && (
            <div className="absolute mx-auto top-1/3 h-1/2 break-words overflow-hidden text-center w-full md:w-72">
              <span className="font-black text-center mx-auto break-all"
                style={{
                  color: textColor,
                  fontFamily:'Josefin Sans',
                  fontSize: textSize + "px",
                }}>
                {sendingData ? sendingData.msg : ''}
              </span>
            </div>
          )}

   { isSettingVisible ? "" : <div
                        className="custom_play_button cursor-pointer"
                        onClick={handlePlayPause}
                    >
                        {!isPlaying && <FaPlay className="w-10 h-10 text-white" />}
                    </div>
                    }

        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center">
      {showConfirmation ? "" : (
        <>
          <div className="w-full">
            {playVideo && introVideoUrl ? (
              renderPlayer()
            ) : (
              <div div className = "w-screen h-96 mt-10 mb-52 pt-44 md:w-full md:flex items-center justify-center" >
                <Loader />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default PreviewLaughter
