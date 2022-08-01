import { Spin } from 'antd'
import React, { useEffect } from 'react'
import VideoPlayer from '../VideoPlayer'

const PreviewLaughter = ({
  playVideo,
  introVideoUrl,
  randomStr,
  handlePlayerReady,
  showOverlayText,
  loading,
  sendingData,
  showConfirmation
}) => {
  // steps to follow
  // 1. play a decorator video
  // 2. show text overlay upto 5 seconds
  // 3. then play video only
  // 4.


  // console.log("sendingData: ", sendingData)


  const renderPlayer = () => {
    const videoJsOptions = {
      videoId: "randomId123",
      autoplay: true,
      controls: true,
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
          <div className="sender_player_style " key={randomStr}>
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          {showOverlayText && !loading && (
            <div className="absolute mx-auto top-1/2 h-1/2 break-all overflow-hidden text-center w-full">
              <span className="animate-charcter text-center mx-auto break-all">
                {sendingData ? sendingData.msg : ''}
              </span>
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center">
      {showConfirmation ? "" : (
        <>
          <p className="text-sm font-bold mb-2 md:mb-1">Preview</p>

          <div className="ml-2">
            {playVideo && introVideoUrl ? (
              renderPlayer()
            ) : (
                <div className="w-screen h-96 mt-10 md:mb-14 mb-52 pt-44">
                <Spin size="large" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default PreviewLaughter
