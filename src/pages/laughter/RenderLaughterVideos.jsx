import { Spin } from 'antd'
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
}) => {
  const history = useHistory()

  const watchVideo = (video) => {
    const user = JSON.parse(localStorage.getItem('user'))
    
    // if (!user || user.role !== 'VIEWER') {
    //   history.push({
    //     pathname: '/login',
    //     search: `?return_url=/laughter/watch/${video.id}`
    //   })
    // } else {
    // }
    history.push(`/laughter/watch/${video.id}`)
  }

  const renderVideos = () => {
    if (dataSource.length > 0) {
      return (
        <div className="flex flex-wrap items-center">
          {dataSource.map((video, index) => {
            return (
              // p-2 flex md:w-1/4 w-1/2 h-52 cursor-pointer laughter_video_thumbnail
              <div
                className="laughter_video_thumb_style laughter_video_thumbnail"
                key={index}
                onClick={() => watchVideo(video)}
              >
                {/* <img
                  src={
                    video.thumbnial?.includes('talguu-vout1')
                      ? video.thumbnial
                      : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png'
                  }
                  alt=""
                  className="w-full h-full"
                /> */}
                <img
                  src={
                    video.trailer_gif ? video.trailer_gif : video.main_gif || ''
                  }
                  className="w-full h-full"
                  alt=""
                />
              </div>
            )
          })}
        </div>
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
    <div className="md:px-3 lg:px-3">
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        className="scroll-style"
        loader={
          loading && (
            <div className="flex items-center justify-center">
              <Spin indicator={antIcon} />
            </div>
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
