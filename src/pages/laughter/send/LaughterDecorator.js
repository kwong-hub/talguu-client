import { Spin } from 'antd'
import React from 'react'
import VideoPlayer from '../VideoPlayer'

const LaughterDecorator = ({
  handlers,
  loading,
  dataSource,
  randomStr,
  handlePlayerReady,
  totalDecorators,
  page,
  decoratorVideo,
  showOverlayText,
  sendingData,
  textColor,
}) => {
  const generateArray = () => {
    let totalDec = totalDecorators + 1
    if (totalDecorators > 0) {
      let array = []

      for (let index = 1; index < totalDec; index++) {
        array.push(index)
      }
      return array
    }
  }

  const renderDots = () => {
    const dots = generateArray()
    return (
      <div className="flex items-center justify-center mt-2">
        {dots.slice(0, 10).map((data, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-3xl mt-4 my-3 mx-1 md:mt-2 md:my-2 md:w-3  md:h-3 ${page === data ? 'bg-blue-500' : 'bg-gray-300'
              } `}
          ></div>
        ))}
        <div className="flex items-center justify-center gap-2 text-xl  ml-1 ">
          {dots.length > 8 ? <span className="text-2xl md:text-sm text-black font-bold">. . .</span> : ""}
          {dots.length > 8 ? <span className="text-sm md:text-md text-blue-800 font-bold"> {dots.length}</span> : ""}
        </div>
      </div>
    )
  }

  const renderPlayer = () => {
    if (decoratorVideo) {
      let videoJsOptions = {
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

      return (
        <div className="flex flex-col w-full h-full items-center" {...handlers}>
          {/* replace carousel here */}

          {loading ? (
            <div className="w-screen h-96 mt-60 mb-14">
                <Spin size="large" />
            </div>
          ) : dataSource.length > 0 ? (
           <div className="w-full relative">
              <div key={randomStr} className="sender_player_style">
                    <VideoPlayer
                      options={videoJsOptions}
                      onReady={handlePlayerReady}
                      className="rounded-2xl"
                    />
                  </div>
                  {
                  showOverlayText && !loading && (
                  <div className="absolute mx-auto top-1/2 h-1/2 break-all overflow-hidden text-center w-full">
                    <span className="text-4xl font-black text-center mx-auto break-all"
                      style={{
                        color: textColor,
                        fontFamily:'Josefin Sans',
                      }}>
                      {sendingData ? sendingData.msg : 'Hello There'}
                    </span>
                  </div>
                  )}
           </div>
          ) : (
            <p>There are no more intro videos</p>
          )}
        </div>
      )
    }
  }

  return (
    <div className="w-full md:w-72 mx-auto">
      <p className="text-sm font-bold mb-2 md:mb-2">Select Intro Videos</p>

      {renderPlayer()}

      <div className="w-full flex items-center justify-center">
        {!loading && dataSource.length > 0 && renderDots()}
      </div>
    </div>
  )
}


export default LaughterDecorator
