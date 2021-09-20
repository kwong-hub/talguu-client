import './RenderVideoSideInfo.css'

import { message, Tooltip } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { FaClock, FaDollarSign, FaPlayCircle, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  SAVE_LATER_ASYNC,
  SAVE_LATER_RESET,
  VIEWER_VIDEOS_ASYNC
} from '../../redux/types'

function RenderVideoSideInfo(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const saveLaterStatus = useSelector((state) => state.video.saveLaterStatus)

  // const user = JSON.parse(localStorage.getItem('user'))

  if (saveLaterStatus === 'SUCCESS_ADDED') {
    dispatch({ type: SAVE_LATER_RESET })
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: '' })
    message.success('Saved to watch later.')
  } else if (saveLaterStatus === 'SUCCESS_REMOVED') {
    dispatch({ type: SAVE_LATER_RESET })
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: '' })
    message.info('Removed from watch later.')
  }

  const saveLater = (event) => {
    event.stopPropagation()
    if (!localStorage.getItem('user')) history.push('/login')
    dispatch({ type: SAVE_LATER_ASYNC, payload: props.video.id })
  }

  const duration =
    (props.video?.paid
      ? props.video?.video_duration
      : props.video?.trailer_duration) || '00:00:00'
  return (
    <div
      onClick={(event) => props.playVideo(props.video)}
      className={
        'hidden lg:flex w-full p-2 cursor-pointer self-stretch overflow-h overflow-hidden video_thumbnail'
      }
    >
      <div className="relative max-h-full w-5/12 flex justify-center">
        <img
          src={
            props?.video?.thumbnial?.includes('talguu-vout1')
              ? props?.video?.thumbnial
              : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png'
          }
          alt=""
          className="block w-full h-28 video_image"
        />
        <img
          src={
            props.video.paid
              ? props.video.main_gif || ''
              : props.video.trailer_gif || ''
          }
          className="hidden h-28 video_gif mx-auto"
        />
        <div className="absolute thumbnail_button_container">
          <Tooltip
            placement="bottom"
            title={props.video.paid ? '' : 'Watch Trailer'}
          >
            <FaPlayCircle className="text-gray-600 thumbnail_button" />
          </Tooltip>
        </div>
        {
          <div
            onClick={(event) => saveLater(event)}
            className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25"
          >
            <Tooltip
              placement="bottom"
              title={
                props.video.saveLater
                  ? 'Remove Watch Later'
                  : 'Add to Watch Later'
              }
            >
              {props.video.saveLater ? (
                <FaTrash className="text-white text-base" />
              ) : (
                <FaClock className="text-white text-base" />
              )}
            </Tooltip>
          </div>
        }
        <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
        {/* {props.video.paid
          ? ''
          : (!user || user.role === 'VIEWER') && (
              <div className="absolute bottom-1 -right-32 py-0 z-20">
                <Button
                  onClick={(event) =>
                    props.paymentModalVisible(true, props.video, event)
                  }
                  type="primary"
                  className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80"
                >
                  Watch Full Video
                </Button>
              </div>
            )} */}
        {!props.video.paid ? (
          <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
            <FaDollarSign className="text-gray-700 text-xs" />{' '}
            {props.video?.video_price}
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
          {moment(duration.split('.')[0], [moment.ISO_8601, 'HH:mm:ss']).format(
            'H:m:ss'
          )}
        </div>
      </div>
      <div className="flex flex-col w-6/12 ml-2">
        <h4 className="mb-2 text-left text-md text-gray-600 video_title">
          {props.video.title}
        </h4>
        <div className="flex">
          <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-md">
            {props.video.viewCount} views
          </span>
          <span className="hover:text-blue-400 text-md ml-2 self-end">
            {moment(props.video?.premiered).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}

RenderVideoSideInfo.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string,
    thumbnial: PropTypes.string,
    paid: PropTypes.bool,
    video_duration: PropTypes.string,
    viewCount: PropTypes.number,
    title: PropTypes.string,
    currentVideo: PropTypes.bool,
    saveLater: PropTypes.any,
    video_price: PropTypes.any,
    trailer_gif: PropTypes.any,
    main_gif: PropTypes.any,
    trailer_duration: PropTypes.any,
    premiered: PropTypes.any
  }),
  paymentModalVisible: PropTypes.func,
  for: PropTypes.any,
  playVideo: PropTypes.func,
  fromWatch: PropTypes.bool
}

export default RenderVideoSideInfo
