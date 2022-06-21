import { Spin } from 'antd'
import React, { useEffect } from 'react'
import VideoPlayer from '../VideoPlayer'

const PreviewLaughter = ({
  playVideo,
  currentVideo,
  decoratorVideo,
  randomStr,
  handlePlayerReady,
  showOverlayText,
  loading,
  sendingData
}) => {
  // steps to follow
  // 1. play a decorator video
  // 2. show text overlay upto 5 seconds
  // 3. then play video only
  // 4.

  useEffect(() => {
    console.log('showOverlayText: ', showOverlayText)
  }, [showOverlayText])

  const renderPlayer = () => {
    const videoJsOptions = {
      videoId: decoratorVideo.id,
      autoplay: true,
      controls: true,
      errorDisplay: false,
      aspectRatio: '9:16',
      responsive: true,
      fill: true,
      sources: [
        {
          src: decoratorVideo.video_link,
          type: decoratorVideo.video_type
        }
      ]
    }
    if (decoratorVideo) {
      return (
        <div className="sender_player_container">
          <div className="sender_player_style" key={randomStr}>
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
          </div>

          {showOverlayText && !loading && (
            <div className="overlay_text_style">
              <h1 className="text-white">
                  {
                    sendingData ? sendingData.message : 'Hello there!'
                  }
              </h1>
            </div>
          )}
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full h-full items-center">
      <p className="text-sm font-bold mb-5">Preview</p>

      <div className="ml-2 sender_player_style">
        {playVideo && decoratorVideo ? (
          renderPlayer()
        ) : (
          <div className="w-screen mx-auto mt-40">
            <Spin size="middle">
              <Spin size="large" />
            </Spin>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviewLaughter
