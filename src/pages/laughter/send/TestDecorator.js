
import React, {useEffect} from 'react'

import VideoPlayer from '../VideoPlayer'

import { FaPlay } from 'react-icons/fa'

import { AiFillMessage } from 'react-icons/ai'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Loader from '../common/loader/Loader'

const TestDecorator = ({
    handlers,
    loading,
    dataSource,
    randomStr,
    handlePlayerReady,
    totalDecorators,
    page,
    decoratorVideo,
    showOverlayText,
    specialMessage,
    textColor,
    handlePlayPause,
    isPlaying,
    handleSettingModal,
    isSettingVisible,
    textSize,
    back,
    dataLoading
}) => {

    
    useEffect(() => {
        // console.log("showOverlayText: ", showOverlayText)
    }, [showOverlayText])


    const generateArray = () => {
    let totalDec = totalDecorators + 1;
    if (totalDec > 0) {
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
        controls: false,
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

          { dataSource.length > 0 ? (
            <div className="flex flex-col">
            <div 
                key={randomStr} 
                className="w-screen h-screen md:w-72 md:mt-5"
                onClick={handlePlayPause}
                >
                    <VideoPlayer
                      options={videoJsOptions}
                      onReady={handlePlayerReady}
                      className="rounded-2xl"
                    />
                  </div>

                {
                  showOverlayText  ? (
                  <div className="absolute mx-auto top-1/3 h-1/2 break-words overflow-hidden text-center w-full md:w-72">
                    <span className="font-black text-center mx-auto break-words"
                      style={{
                        color: textColor,
                        fontFamily:'Josefin Sans',
                        fontSize: textSize + "px",
                      }}>
                      {specialMessage ? specialMessage : ''}
                    </span>
                  </div>
                  ): ""}

                    {
                        isSettingVisible ? "" : <div
                        className="custom_play_button cursor-pointer"
                        onClick={handlePlayPause}
                    >
                        {!isPlaying && <FaPlay className="w-10 h-10 text-white" />}
                    </div>
                    }
            </div>
          
          ) : (
            <p>There are no more intro videos</p>
          )}
        </div>
      )
    }
  }
  return (
     <div className="w-full md:w-72">

        {
            dataLoading ? (
                 <div div className = "w-screen h-96 mt-10 mb-52 pt-44 md:w-full md:flex items-center justify-center">
                    <Loader />
              </div>
            ) :
            
        <div className="w-full">

        {renderPlayer()}

            <div className="fixed bottom-12 md:bottom-20 md:left-1/3 md:w-72 md:ml-20 w-full flex items-center justify-center">
                {!dataLoading && dataSource.length > 0 && renderDots()}
            </div>
        
            <div 
                className="z-10 fixed top-3 px-3 right-0 md:absolute md:w-72 md:left-1/3 md:top-7 md:ml-20 w-full flex items-center justify-between bg-transparent"
                onClick={handleSettingModal}
                >
                <BsFillArrowLeftCircleFill className="w-7 h-7 text-blue-500 cursor-pointer" onClick={back} />
                <AiFillMessage className="text-blue-500 w-7 h-7 cursor-pointer" onClick={handleSettingModal} />
            </div>
            </div>           

        }
     
    </div>
  )
}

export default TestDecorator