import './SavedPlaylist.css'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SideNav from '../../partials/sideNav/SideNav'
import { GET_SAVED_VIDEOS_ASYNC } from '../../redux/types'
import RenderVideoMinimal from '../../components/renderVideoMinimal/RenderVideoMinimal'

const SavedPlayList = () => {
  const savedVideos = useSelector((state) => state.video.savedVideos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: GET_SAVED_VIDEOS_ASYNC, payload: '' })
    return () => { }
  }, [])

  const renderVideos = () => {
    if (savedVideos && savedVideos.length) {
      return savedVideos.map((video) => {
        return <RenderVideoMinimal key={video.id} video={video} />
      })
    } else {
      return (
        <div
          className={
            'flex justify-center items-center w-full p-2 cursor-pointer video_thumbnail self-stretch'
          }
        >
          <p className="text-gray-600 text-md py-4 w-96">
            You don&apos;t have any saved videos. You can save a video you like
            so you can access it later easily!
          </p>
        </div>
      )
    }
  }

  return (
    <div className="pt-2 sm:ml-14 mt-12">
      <SideNav></SideNav>
      <div className="flex gap-4 relative mb-2 ml-4 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white items-center justify-start">
        {renderVideos()}
      </div>
    </div>
  )
}

export default SavedPlayList
