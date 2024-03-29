import {
  Avatar,
  Button,
  Comment,
  Form,
  notification,
  Space,
  Spin,
  Tooltip
} from 'antd'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineDownCircle, AiOutlineUpCircle } from 'react-icons/ai'
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import videoService from '../../_services/video.service'
import PaymentModal from '../../components/paymentModal/PaymentModal'
import RenderVideo from '../../components/renderVideo/RenderVideo'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import SideNav from '../../partials/sideNav/SideNav'
import {
  GET_PAID_VIDEO_URL_ASYNC,
  GET_PAID_VIDEO_URL_SUCCESS,
  UPDATE_CURRENT_VIDEO,
  UPDATE_USER_VIDEOS,
  VIEWER_VIDEOS_ASYNC
} from '../../redux/types'
import RenderVideoSideInfo from '../../components/renderVideoSideInfo/RenderVideoSideInfo'
import './WatchVideo.css'
import Loader from '../laughter/common/loader/Loader';

const WatchVideo = () => {
  const history = useHistory()
  const [playVideo, setPlayVideo] = useState(false)
  const [newComment, setComment] = useState('')
  const [showMessages, setShowMessages] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [tempVideo, setTempVideo] = useState(null)
  const [randomStr, setRandomStr] = useState('')
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const [localErrorMessage, setLocalErrorMessage] = useState('')
  const { vidId } = useParams()
  const dispatch = useDispatch()
  const currentVideo = useSelector((state) => state.video.currentVideo)
  const viewerVideos = useSelector((state) => state.video.viewerVideos)
  const errorMessage = useSelector((state) => state.video.errMessages)
  const commentRef = useRef()
  
  const user = JSON.parse(localStorage.getItem('user'))

 
  useEffect(() => {
    if (vidId) {
      dispatch({ type: GET_PAID_VIDEO_URL_ASYNC, payload: vidId })
      dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: '' } })
      window.scrollTo(0, 0)
    }
    return () => {}
  }, [])

  useEffect(() => {
    setPlayVideo(true)
    setRandomStr(new Date().getTime().toString())
    return () => {}
  }, [currentVideo])


  
  if (errorMessage === 'NO_BALANCE' || errorMessage === 'NOT_ENOUGH_BALANCE') {
    history.push('/deposit')
  }

  const toggleMessages = (e) => {
    e.stopPropagation()
    setShowMessages(!showMessages)
  }

  const play = (video, fromPurchased = false, playPaid = true) => {
    // setRandomStr(new Date().getTime().toString())
    if (video.paid && playPaid) {
      playWithPaidUrl(video)
      return
    }
    history.push(`/watch/${video.id}`)
    dispatch({
      type: UPDATE_CURRENT_VIDEO,
      payload: { ...video }
    })
    updateViewerVideos(video)
    if (fromPurchased) setPaymentModalVisible(false)
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

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation()

    if (!user || user.role !== 'VIEWER') {
      history.push({
        pathname: '/login',
        search: `?return_url=/watch/${video.id}`
      })
    } else {
      if (video && video.paid) {
        history.push(`/watch/${video.id}`)
        playWithPaidUrl(video)
      } else {
        if (value) {
          setTempVideo(video)
          setPaymentModalVisible(value)
        } else setPaymentModalVisible(value)
      }
    }
  }

  const playWithPaidUrl = (video) => {
    videoService
      .getPaidVideoUrl(video.id)
      .then((res) => {
        if (res.video_link) {
          play({ ...video, video_link: res.video_link }, false, false)
        } else setLocalErrorMessage('Invalid video url!!!')
      })
      .catch((err) => {
        setLocalErrorMessage(err)
      })
    window.scrollTo(0, 0)
  }

  const renderComment = (video) => (
    <div className="flex">
      <Form.Item className="flex-1 mr-2">
        <div
          ref={commentRef}
          onInput={() => {
            setComment(commentRef.current.innerHTML)
          }}
          onBlur={() => {
            setComment(commentRef.current.innerHTML)
          }}
          className="w-full text-left text-md px-2 py-1 rounded-lg comment_input"
          contentEditable="true"
          suppressContentEditableWarning={true}
        >
          {currentVideo.hasComment || 'Add a new comment'}
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={(e) => {
            submitComment(e, video)
            console.log(e.target)
          }}
          type="secondary"
        >
          {currentVideo.hasComment ? 'Edit Comment' : 'Add Comment'}
        </Button>
      </Form.Item>
    </div>
  )

  const renderComments = (comments) => {
    return (
      <div className="flex-col w-full justify-start">
        {comments?.map((cm) => {
          return (
            <Comment
              key={cm?.id}
              className="w-full flex justify-start"
              author={<a>Anonymous</a>}
              avatar={
                <Avatar
                  src="https://robohash.org/reminventoreveniam.png?size=50x50&set=set1"
                  alt="Anonymous"
                />
              }
              content={<p>{cm.message}</p>}
            />
          )
        })}
      </div>
    )
  }

  const purchaseVideo = (video) => {
    videoService
      .purchaseVideo(video.id)
      .then((res) => {
        if (res.video_link) {
          play(
            { ...video, video_link: res.video_link, paid: true },
            true,
            false
          )
        } else setLocalErrorMessage('Invalid video url!!!')
      })
      .catch((err) => {
        setLocalErrorMessage(err)
      })
    currentVideo.paid = true
  }

  const likeDislikeVideo = (e, video, val) => {
    e.stopPropagation()
    val = video.val === val ? 2 : val
    videoService
      .likeDislikeVideo({ videoId: video.id, like: val })
      .then((res) => {
        if (res.data && res.data.success) {
          dispatch({
            type: GET_PAID_VIDEO_URL_SUCCESS,
            payload: res.data.video
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const submitComment = (e, video) => {
    e.stopPropagation()
    if (!newComment) return
    setSubmitting(true)
    videoService
      .addComment({ message: newComment, videoId: video.id })
      .then((res) => {
        if (res) {
          if (res.data && res.data.success) {
            dispatch({ type: GET_PAID_VIDEO_URL_ASYNC, payload: vidId })
          }
          notification.info({
            message: 'Message submitted',
            placement: 'bottomRight',
            duration: 3.3
          })
          setSubmitting(false)
          setComment('')
        } else {
          notification.error({
            message: 'Error occurred',
            placement: 'bottomRight',
            duration: 3.3
          })
          setSubmitting(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setSubmitting(false)
      })
  }

  const renderPaymentModal = () => {
    return (
      <PaymentModal
        paymentModalVisible={paymentModalVisible}
        paymentModalVisibleFunc={paymentModalVisibleFunc}
        video={tempVideo}
        purchaseVideo={() => purchaseVideo(tempVideo)}
      />
    )
  }

  const renderPlayer = () => {
    const videoJsOptions = {
      videoId: currentVideo.id,
      // autoplay: true,
      controls: true,
      poster: currentVideo?.thumbnial?.includes('talguu-vout1')
        ? currentVideo?.thumbnial
        : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
      aspectRatio: '16:9',
      responsive: true,
      sources: [
        {
          // src:
          //   'https://8mspaa.com/video/hls_play/B5jqeJAdiZ2BSDR0oq5Big/1631610411/1631608390227trailer/playlist',
          src:
            (currentVideo
              ? currentVideo.paid
                ? currentVideo.video_link
                : currentVideo.trailer
              : '') || '',
          type: currentVideo.video_type
          // src:
          //   'http://8mspbb.com/video/hls_play/OZyDOutTBuHBzyaqZTw9Ng/1618218448/1617373019142video/playlist',
          // type: 'application/x-mpegURL'
        }
      ]
    }
    if (currentVideo) {
      return (
        <div className="relative sm:static player_container bg-white mt-10 sm:mt-0">
          <div
            key={randomStr}
            className="pt-2 sm:pt-0 fixed left-0 right-0 top-12 sm:top-0 sm:static bg-white flex flex-col sm:mx-1 z-10 sm:-z-10"
          >
            <VideoPlayer {...videoJsOptions}></VideoPlayer>

            <div className="w-full flex justify-between md:mt-3 px-3">
              <div className="text-gray-800 lg:text-xl text-md  text-left py-3 md:py-0 md:mt-0">
                {currentVideo?.title}
              </div>
              {currentVideo.paid || (user && user.role !== 'VIEWER') ? (
                ''
              ) : (
                <div className="py-3 md:py-0 lg:py-0 md:mt-0 lg:mt-0">
                  <Button
                    type="primary"
                    onClick={(event) =>
                      paymentModalVisibleFunc(true, currentVideo, event)
                    }
                    className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80"
                  >
                    Watch Full Video
                  </Button>
                </div>
              )}
            </div>
         </div>
          <div className="flex-col mx-1 mt-44 sm:mt-6 player_details">
            <div className="flex justify-between text-gray-800 text-2xl w-full text-left px-3 md:py-3 lg:py-3">
              <div className="flex items-end">
                <span className="text-gray-500 text-sm">
                  {currentVideo?.viewCount}
                  {currentVideo?.viewCount <= 1 ? ' view' : ' views'}
                </span>
                <span className="text-gray-500 ml-4 text-sm">
                  {currentVideo?.streamed ? 'Streamed at ' : ''}
                  {moment(currentVideo?.premiered).format('MMM DD, YYYY')}
                </span>
              </div>
              <div className="flex">
                <Tooltip
                  onClick={(e) => {
                    likeDislikeVideo(e, currentVideo, 1)
                  }}
                  placement="bottom"
                  title="Like"
                >
                  <div
                    className={`mt-3 flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-sm ${
                      currentVideo.like === 1 ? 'text-blue-400' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-500 font-semibold mr-2 ">LIKE</span> <AiFillLike className="mr-2 w-6 h-6 text-blue-400" /> {currentVideo?.likeCount} 
                  </div>
                </Tooltip>
                <Tooltip
                  onClick={(e) => {
                    likeDislikeVideo(e, currentVideo, 0)
                  }}
                  placement="bottom"
                  title="Dislike"
                >
                  <span
                    className={`mt-3 flex items-center  text-gray-400 cursor-pointer hover:text-blue-400 text-sm ml-2 ${
                      currentVideo.like === 0 ? 'text-blue-400' : ''
                    }`}
                  >
                    <span className="text-sm text-gray-500 font-semibold mr-2 ">DISLIKE</span>  <AiFillDislike className="mr-2 text-md w-6 h-6 text-gray-400" />
                    {currentVideo.dislikeCount}{' '}
                   
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer rounded-xl shadow-sm border-gray-100 border-2 p-1">
              <span
                onClick={(e) => {
                  toggleMessages(e)
                }}
                className="flex items-center self-center text-md my-2"
              >
                {showMessages ? (
                  <>
                    Hide Messages <AiOutlineUpCircle className="ml-2" />
                  </>
                ) : (
                  <>
                    Show Messages <AiOutlineDownCircle className=" ml-2" />
                  </>
                )}
              </span>
              {showMessages && renderComments(currentVideo.comments)}
              <div className="w-full flex justify-between items-end">
                <Comment
                  className="w-full"
                  avatar={
                    <Avatar
                      src="https://robohash.org/reminventoreveniam.png?size=50x50&set=set1"
                      alt="Han Solo"
                    />
                  }
                  content={renderComment(currentVideo)}
                />
              </div>
            </div>
          </div>
    
        </div>
      )
    }
  }

  const onSearch = (value) => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: value } })
  }


  const filterArray = (vidId, videos) => {
    let result = videos.filter((video)=> video.id !== vidId)
    return result;
  }


  const renderVideos = () => {
    if (viewerVideos) {
      const _viewerVideos = filterArray(vidId, viewerVideos)
      
      return _viewerVideos.map((video) => {
        return (
          <>
            <RenderVideo
              playVideo={play}
              for="watch_video"
              key={randomStr}
              video={video}
              paymentModalVisible={paymentModalVisibleFunc}
              fromWatch={true}
            />
            <RenderVideoSideInfo
              playVideo={play}
              for="watch_video"
              key={video.id}
              video={video}
              paymentModalVisible={paymentModalVisibleFunc}
            />
          </>
        )
      })
    }
  }

  return (
    <>
      <SideNav onSearch={onSearch}></SideNav>
      <div>
        {localErrorMessage && <div>{localErrorMessage}</div>}
        <div className="pt-2 ml-0 sm:ml-14 mt-20">
          {playVideo && currentVideo ? (
            renderPlayer()
          ) : (
            <div className="w-screen mx-auto md:mt-80 mt-40">
                <Loader />
            </div>
          )}
          <div className="flex relative lg:absolute right-0 md:mt-10 bottom-0 border-2 mt-4 lg:top-10 lg:flex-col lg:ml-0 flex-wrap lg:flex-nowrap videos_container border-white">
            {renderVideos()}
          </div>
        </div>
        {paymentModalVisible && renderPaymentModal()}
      </div>
    </>
  )
}

export default WatchVideo
