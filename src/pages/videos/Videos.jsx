import './Videos.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import PaymentModal from '../../components/paymentModal/PaymentModal'
import RenderVideo from '../../components/renderVideo/RenderVideo'
import SideNav from '../../partials/sideNav/SideNav'
import {
  PURCHASE_VIDEO_ASYNC,
  UPDATE_CURRENT_VIDEO,
  UPDATE_USER_VIDEOS,
  VIEWER_VIDEOS_ASYNC
} from '../../redux/types'
import videoService from '../../_services/video.service'

const Videos = (props) => {


  const [loading, setLoading] = useState(false);
  const history = useHistory()
  const videoLink = useSelector((state) => state.video.video_link)
  const [tempVideo, setTempVideo] = useState(null)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  // const [localErrorMessage, setLocalErrorMessage] = useState('')
  const { q } = useParams()
  const dispatch = useDispatch()
  // const viewerVideos = useSelector((state) => state.video.viewerVideos);
  const [viewerVideos,setViewerVideos] = useState([]);

  useEffect(() => {
    const getVids =()=>{
      setLoading(true)
      videoService.getViewerVideos({payload: { q }}).then((res)=>{
        const {data, success} = res;
        if(success && data){
          setViewerVideos(data)
        }else{
          setViewerVideos([])
        }
        setLoading(false)
      })
      
    }
    getVids();
    // dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } })
  }, [])



  const play = (video, fromPurchased = false, playPaid = true) => {
    if (video.paid && playPaid) {
      playWithPaidUrl(video)
      return
    }
    dispatch({
      type: UPDATE_CURRENT_VIDEO,
      payload: { ...video }
    })
    history.push(`/watch/${video.id}`)
    updateViewerVideos(video)
    if (fromPurchased) setPaymentModalVisible(false)
    window.scrollTo(0, 0)
  }

  const playWithPaidUrl = (video) => {
    videoService
      .getPaidVideoUrl(video.id)
      .then((res) => {
        if (res.video_link) {
          play({ ...video, video_link: res.video_link }, false, false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    window.scrollTo(0, 0)
  }

  const updateViewerVideos = (video) => {
    const viewerVideosTemp = viewerVideos.map((v) => {
      if (v.id === video.id) {
        return video
      }
      return v
    })
    dispatch({ type: UPDATE_USER_VIDEOS, payload: viewerVideosTemp })
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
    play({ ...tempVideo, video_link: videoLink })
    paymentModalVisibleFunc(false)
  }


  const renderVideos = () => {
    if (loading) {
      return Array.from(new Array(2)).map((item, index) => {
        return (
          <div key={index} className="flex flex-wrap h-72 w-full items-center ">
            <div className="video_skeleton rounded-xl md:h-72 md:w-72 w-96 h-64 m-2 "></div>
            <div className="video_skeleton rounded-xl md:h-72 md:w-72 w-96 h-64 m-2 "></div>
            <div className="video_skeleton rounded-xl md:h-72 md:w-72 w-96 h-64 m-2 hidden md:block"></div>
            <div className="video_skeleton rounded-xl md:h-72 md:w-72 w-96 h-64 m-2 hidden md:block"></div>
          </div>
        )
      })
    }

    else {
      return viewerVideos.map((video) => {
        return (
          <RenderVideo
            playVideo={() => play(video)}
            key={video.id}
            video={video}
            paymentModalVisible={paymentModalVisibleFunc}
          />
        )
      })
    }

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
    <div className="pt-2 sm:ml-14 mt-12">
      <SideNav onSearch={onSearch}></SideNav>
      <div className="flex gap-4 relative mb-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
      {paymentModalVisible && renderPaymentModal()}
    </div>
  )
}

export default Videos
