import './PurchasedPlaylist.css'

// import { Tooltip } from 'antd'
// import moment from 'moment'
import React, { useEffect } from 'react'
// import { FaPlayCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'

import SideNav from '../../partials/sideNav/SideNav'
import { PAID_VIEWER_VIDEOS_ASYNC } from '../../redux/types'
import RenderVideoMinimal from '../../components/renderVideoMinimal/RenderVideoMinimal'

function PurchasedPlaylist(props) {
  const purchasedVideos = useSelector((state) => state.video.purchasedVideos)
  const dispatch = useDispatch()
  // const history = useHistory()

  useEffect(() => {
    dispatch({ type: PAID_VIEWER_VIDEOS_ASYNC, payload: '' })
    return () => {}
  }, [])

  // const play = (video) => {
  //   console.log('video-play', video)
  //   history.push(`/watch/${video.id}`)
  //   // history.go(0);
  // }

  const renderVideos = () => {
    if (purchasedVideos && purchasedVideos.length) {
      return purchasedVideos.map((video) => {
        return <RenderVideoMinimal key={video.id} video={video} />
      })
    } else {
      return (
        <div
          className={
            'flex justify-center w-full p-2 cursor-pointer video_thumbnail self-stretch'
          }
        >
          <p className="text-gray-600 text-md py-4 w-96">
            You haven&apos;t purchased any videos. Once you purchased a video,
            you can easily access it from here.
          </p>
        </div>
      )
    }
  }

  return (
    <div className="pt-2 ml-0 sm:ml-14">
      <SideNav></SideNav>
      <div className="flex relative mt-12 border-2 flex-wrap min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
    </div>
  )
}

PurchasedPlaylist.propTypes = {}

export default PurchasedPlaylist
