
import React, {useEffect, useState} from 'react'

import VideoPlayer from '../VideoPlayer'

import { FaPlay } from 'react-icons/fa'

import { AiFillMessage } from 'react-icons/ai'
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import Loader from '../common/loader/Loader'
import { Slider, Input } from 'antd';

import {AiOutlineFontSize} from 'react-icons/ai'

import {IoIosColorFilter} from 'react-icons/io'

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
    setSpecialMessage,
    textColor,
    handlePlayPause,
    isPlaying,
    handleSettingModal,
    isSettingVisible,
    textSize,
    back,
    dataLoading,
    setTextColor,
    setTextSize,
    setPage
}) => {

    
  const [showMessage, setShowMessage] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [showTextSize, setShowTextSize] = useState(false)


  const {TextArea} = Input


    useEffect(() => {
        // console.log("showOverlayText: ", showOverlayText)
    }, [showOverlayText, showMessage])


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

  const onChange = (value) => {
    setTextSize(value)
  };

  const dotClicked = (data) => {
    setPage(data)
  }

  const renderDots = () => {
    const dots = generateArray()
    return (
      <div className="flex items-center justify-center mt-2">
        {dots.slice(0, 10).map((data, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-3xl mt-4 my-3 mx-1 md:mt-2 md:my-2 md:w-3 md:cursor-pointer md:h-3 ${page === data ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => dotClicked(data)}
          >
          </div>
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
        loop: true,
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
            <div className="w-full h-full flex flex-col relative">
              <div 
                key={randomStr} 
                className="absolute w-screen h-screen top-0 bottom-0 md:w-72 md:mt-5"
                onClick={handlePlayPause}
                >
                    <VideoPlayer
                      options={videoJsOptions}
                      onReady={handlePlayerReady}
                      handlePlayPause={handlePlayPause}
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
                        className="custom_play_button md:cursor-pointer mt-14 md:mt-0 pt-20 pb-20"
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
     <div className="w-screen h-screen md:w-72">

        {
            dataLoading ? (
                 <div div className = "w-screen h-96 mt-10 mb-52 pt-44 md:w-full md:flex items-center justify-center">
                    <Loader />
              </div>
            ) :
            
        <div className="w-full h-full">
          {renderPlayer()}
            <div className="fixed bottom-3 md:bottom-20 md:left-1/3 md:w-72 md:ml-20 w-full flex items-center justify-center">
                {!dataLoading && dataSource.length > 0 && renderDots()}
            </div>
        
            <div 
                className="z-10 fixed top-3 px-3 right-0 md:absolute md:w-72 md:left-1/3 md:top-7 md:ml-20 w-full flex items-center justify-between bg-transparent"
                onClick={handleSettingModal}
                >
                <BsFillArrowLeftCircleFill className="w-7 h-7 text-blue-500 cursor-pointer" onClick={back} />
                {/* <AiFillMessage className="text-blue-500 w-7 h-7 md:cursor-pointer" onClick={handleSettingModal} /> */}
            </div>

          <div className="w-full h-52 p-3 fixed bottom-14 md:bottom-36 z-50 md:w-72">
            <div className="w-full h-20 flex items-center justify-between p-2 gap-2 text-white">
               {
                showMessage ? 
                <TextArea
                  maxLength={70}
                  className='w-80 md:w-52 p-3 box-border rounded-xl bg-transparent text-white'
                  value={specialMessage}
                  onChange={(e) => setSpecialMessage(e.target.value)}
                  rows={2}
                  placeholder="your message..."
              />: ""
               }
              <AiFillMessage 
                className="text-white w-7 h-7 md:cursor-pointer absolute right-6" 
                onClick={() => setShowMessage((prev) => !prev)}
                />
            </div>
            <div className="w-full h-14 flex items-center justify-between p-2 gap-2 text-white">
               {
                showColor ? 
                <input
                  className='w-80 md:w-52 h-8 rounded-xl outline-none'
                  type='color'
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}  
                /> : ""
               }
              <IoIosColorFilter 
                className="text-white w-7 h-7 md:cursor-pointer absolute right-6"
                onClick={() => setShowColor((prev) => !prev)}
                />
            </div>
            <div className="w-full h-14 flex items-center justify-between p-2 gap-2 text-white">
                 {
                  showTextSize ? 
                   <Slider 
                    defaultValue={textSize} 
                    tooltipVisible
                    onChange={onChange}
                    style={{width: '83%'}}
                 />: ""
                 }
              <AiOutlineFontSize 
                className="w-7 h-7 text-white absolute right-6 md:cursor-pointer" 
                onClick={() => setShowTextSize((prev) => !prev)}
                />
            </div>
          </div>

       </div>           

        }
     
    </div>
  )
}

export default TestDecorator