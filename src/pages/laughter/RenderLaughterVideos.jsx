import { Divider, Spin } from 'antd'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { useHistory } from 'react-router-dom'

import './custom_player_style.css'

const RenderLaughterVideos = ({
  dataSource,
  antIcon,
  fetchMoreData,
  hasMore,
  loading,
  type,
  page,
  pageSize
}) => {
  const history = useHistory()

  const watchVideo = (video) => {
    history.push({
      pathname: `/laughter/watch/${video.id}`,
      state: { laughter_page_offset: page, page_limit: pageSize },
      search: `laughter_page_offset=${page}&page_limit=${pageSize}`
    })
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

          <div className="flex flex-wrap items-center justify-center w-full lg:justify-start">
            {dataSource.map((video, index) => {
              return (
                // p-2 flex md:w-1/4 w-1/2 h-52 cursor-pointer laughter_video_thumbnail
                <div
                  className="laughter_video_thumb_style laughter_video_thumbnail"
                  key={index}
                  onClick={() => watchVideo(video)}
                >
                  <img src={video.main_gif} className="w-full h-full" alt="" />
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
    <div className="md:px-3 lg:px-3 w-full">
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        className="scroll-style"
        loader={
          loading && (
            Array.from(new Array(2)).map((item, index) => {
              return (
                <div key={index} className="flex flex-wrap">
                  <div className="video_skeleton mx-3 ml-2"></div>
                  <div className="video_skeleton mx-3"></div>
                  <div className="video_skeleton mx-3 ml-2"></div>
                  <div className="video_skeleton mx-3"></div>
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
        {/* <p>Total: {dataSource.length}</p> */}
        {/* Yay! You have seen it all */}
        {renderVideos()}
      </InfiniteScroll>
    </div>
  )
}

export default RenderLaughterVideos
