import './Videos.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import PaymentModal from '../../components/paymentModal/PaymentModal'
import RenderVideo from '../../components/renderVideo/RenderVideo'
import SideNav from '../../partials/sideNav/SideNav'
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from '../../redux/types'

const Videos = (props) => {
  const history = useHistory()
  const videoLink = useSelector((state) => state.video.video_link)
  const [tempVideo, setTempVideo] = useState(null)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const { q } = useParams()
  const dispatch = useDispatch()
  const viewerVideos = useSelector((state) => state.video.viewerVideos)

  useEffect(() => {
    // console.log("fetching videos...");
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } })
  }, [])

  const playVideo = (video) => {
    history.push(`/watch/${video.id}`)
    history.go(0)
  }

  const onSearch = (value) => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: value } })
  }

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation()
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'VIEWER') {
      history.push({
        pathname: '/login',
        search: `?return_url=/watch/${video.id}`
      })
    }
    if (video && video.paid) {
      history.push(`/watch/${video.id}`)
    } else {
      if (value) {
        setPaymentModalVisible(value)
        setTempVideo(video)
      } else setPaymentModalVisible(value)
    }
  }

  const purchaseVideo = (id) => {
    dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id })
    playVideo({ ...tempVideo, video_link: videoLink })
    paymentModalVisibleFunc(false)
  }

  const renderVideos = () => {
    return viewerVideos.map((video) => {
      return (
        <RenderVideo key={video.id} video={video} paymentModalVisible={paymentModalVisibleFunc} />
      )
    })
  }

  const renderPaymentModal = () => {
    return (
      <PaymentModal
        paymentModalVisible={paymentModalVisible}
        paymentModalVisibleFunc={paymentModalVisibleFunc}
        video={tempVideo}
        purchaseVideo={purchaseVideo}
      />
    )
  }

  return (
    <div className="pt-2 sm:ml-14 mt-20">
      <SideNav onSearch={onSearch}></SideNav>
      <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
      {paymentModalVisible && renderPaymentModal()}
    </div>
  )
}

export default Videos
