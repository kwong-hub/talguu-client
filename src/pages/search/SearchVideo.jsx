import './SearchVideo.css'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// import RenderVideo from '../../components/renderVideo/RenderVideo'
import empty from '../../assets/images/empty.svg'
import PaymentModal from '../../components/paymentModal/PaymentModal'
import SideNav from '../../partials/sideNav/SideNav'
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from '../../redux/types'
import RenderSearchVideo from '../../components/renderSearchVideo/RenderSearchVideo'

const SearchVideo = (props) => {
  const history = useHistory()
  const videoLink = useSelector((state) => state.video.video_link)
  const [tempVideo, setTempVideo] = useState(null)
  const q = history.location.state.q
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const dispatch = useDispatch()
  const viewerVideos = useSelector((state) => state.video.viewerVideos)
  useEffect(() => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } })
  }, [q])
  const playVideo = (video) => {
    history.push(`/watch/${video.id}`)
    // history.go(0);
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
    // console.log(`viewerVide`, viewerVideos);
    return viewerVideos.length > 0 ? (
      viewerVideos.map((video) => {
        return (
          <RenderSearchVideo
            key={video.id}
            video={video}
            paymentModalVisible={paymentModalVisibleFunc}
          />
        )
      })
    ) : (
      <div className="m-4 flex flex-col items-center text-2xl text-gray-700">
        <img
          src={empty}
          width={200}
          height={200}
          className="flex "
          alt="No Result"
          srcSet=""
        />
        <span className="mt-4 p-4 "> No Result Found</span>
        <p className="text-base font-light">
          Try different keywords or remove search filters and search again
        </p>
        <p></p>
      </div>
    )
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
    <div className="pt-2 sm:ml-14 mt-20 w-full">
      <SideNav onSearch={onSearch}></SideNav>
      <div className="flex md:flex-col flex-wrap relative md:mx-4  lg:ml-0 xl:w-3/12 min-h-full w-full lg:min-w-full lg:max-w-full">
        {renderVideos()}
      </div>
      {paymentModalVisible && renderPaymentModal()}
    </div>
  )
}

export default SearchVideo
