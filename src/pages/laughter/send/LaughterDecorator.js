import { Spin } from 'antd'
import React from 'react'
import VideoPlayer from '../VideoPlayer'

const LaughterDecorator = ({
    handlers,
    loading,
    dataSource,
    randomStr,
    handlePlayerReady

}) => {
  return (
      <div className=''>
          <p className='text-sm font-bold mb-5'>Select Intro Videos</p>

          <div className='flex flex-col w-full h-full items-center' {...handlers}>
              {/* replace carousel here */}

              {

                  loading ? (<div className="w-screen mx-auto mt-40">
                      <Spin size="middle">
                          <Spin size="large" />
                      </Spin>
                  </div>) :
                      dataSource.length > 0 ?
                          dataSource.map((video, index) => {

                              let videoJsOptions = {
                                  videoId: video.id,
                                  autoplay: false,
                                  controls: true,
                                  errorDisplay: false,
                                  poster: video?.thumbnial?.includes('talguu-vout1')
                                      ? video?.thumbnial
                                      : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
                                  aspectRatio: '9:16',
                                  responsive: true,
                                  fill: true,
                                  sources: [
                                      {
                                          src: video.video_link,
                                          type: video.video_type
                                      }
                                  ]
                              }
                              return (
                                  <div key={randomStr}
                                      className='sender_player_style'>

                                      <VideoPlayer
                                          options={videoJsOptions}
                                          onReady={handlePlayerReady}
                                      />
                                  </div>
                              )
                          })
                          :

                          (
                              <p>There are no more videos</p>
                          )
              }

          </div>

      </div>
  )
}

export default LaughterDecorator