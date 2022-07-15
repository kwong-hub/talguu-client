import { Divider } from 'antd'
import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import './custom_player_style.css'
import LaughterPlayerModal from './LaughterPlayerModal'

import { showVideoModal } from '../../redux/reducers/custom.reducer'

const RenderLaughterVideos = ({
  dataSource,
  antIcon,
  fetchMoreData,
  hasMore,
  loading,
  type,
}) => {


  const history = useHistory()
  const [videoId, setVideoId]= useState('')

  const { showVideoPlayer } = useSelector((state) => state.showPlayer)
  const dispatch = useDispatch()


  const watchVideo = (video) => {
    
    dispatch(showVideoModal())
    document.body.style.overflow = 'hidden'
    setVideoId(video.id)
    // history.push({
    //   pathname: `/laughter/watch/${video.id}`
    // })
  }



  const renderVideos = () => {
    if (dataSource.length > 0) {
      return (
        <>
          {type === 'producerVideos' && (
            <>
              <p className="text-md text-gray-800 font-bold text-center py-3">
                Videos
              </p>

              <Divider
                style={{
                  marginTop: '-5px',
                  marginBottom: '15px',
                  background: '#D3D3D3',
                  height: '1px'
                }}
              />
            </>
          )}

          <div className={`flex flex-wrap items-center justify-center w-full lg:justify-center`}>
            {dataSource.map((video, index) => {
              return (
                // p-2 flex md:w-1/4 w-1/2 h-52 cursor-pointer laughter_video_thumbnail
                <div
                  className="laughter_video_thumb_style laughter_video_thumbnail"
                  key={index}
                  onClick={() => watchVideo(video)}
                >
                  <img src={video.main_gif} className="hover:scale-110  transform transition duration-1000 rounded-xl w-full h-full shadow-gray-900" alt="" />
                </div>
              )
            })}
          </div>
        </>
      )
    } else {
      if (!loading) {
        return (
          <div>
            <p className="text-red-500 text-md">There is no video available</p>
          </div>
        )
      }
    }
  }

  return (
    <div className="w-full">
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        className="scroll-style"
        loader={
          loading && (
            Array.from(new Array(2)).map((item, index) => {
              return (
                <div key={index} className="flex flex-wrap h-96 w-full justify-center md:justify-start my-3 items-center ">
                  <div className="video_skeleton rounded-xl md:h-96 md:w-56 w-40 h-48 m-2 "></div>
                  <div className="video_skeleton rounded-xl md:h-96 md:w-56 w-40 h-48 m-2 "></div>
                  <div className="video_skeleton rounded-xl md:h-96 md:w-56 w-40 h-48 m-2"></div>
                  <div className="video_skeleton rounded-xl md:h-96 md:w-56 w-40 h-48 m-2"></div>
                  <div className="video_skeleton rounded-xl md:h-96 md:w-56 w-40 h-48 m-2 hidden md:block"></div>
                </div>
              )
            })
          )
        }
        endMessage={
          <div className="w-full mb-14 mt-5 p-5 flex items-center justify-center">
            <p style={{ textAlign: 'center' }}>{''}</p>
          </div>
        }
      >
 
        {renderVideos()}

        {
          showVideoPlayer ?
          <LaughterPlayerModal  
            videoId={videoId}
          />
          :""
        }

      </InfiniteScroll>
    </div>
  )
}

export default RenderLaughterVideos
