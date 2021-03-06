import './RenderVideo.css'

import { Button, message, Tooltip } from 'antd'
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

function RenderVideo(props) {
  const history = useHistory()
  const dispatch = useDispatch()
  const saveLaterStatus = useSelector((state) => state.video.saveLaterStatus)

  const user = JSON.parse(localStorage.getItem('user'))

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

  const varClassNames = props.fromWatch ? 'block lg:hidden' : ''

  const duration =
    (props.video?.paid
      ? props.video?.video_duration
      : props.video?.trailer_duration) || '00:00:00'
  return (
    <div
      onClick={(event) => props.playVideo(props.video)}
      className={
        props.for
          ? 'flex-col w-full md:w-4/12 lg:w-full sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch overflow-h' +
            varClassNames
          : 'flex-col w-full md:w-4/12 lg:w-3/12 sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch overflow-h' +
            varClassNames
      }
    >
      <div className="relative max-h-full flex justify-center">
        <img
          src={props.video.thumbnial}
          alt=""
          className="block w-full h-48 video_image"
        />
        <img
          src={
            props.video.paid
              ? props.video.main_gif || ''
              : props.video.trailer_gif || ''
          }
          className="hidden h-48 video_gif mx-auto"
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
        {props.video.paid
          ? ''
          : (!user || user.role === 'VIEWER') && (
              <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
                <Button
                  onClick={(event) =>
                    props.paymentModalVisible(true, props.video, event)
                  }
                  className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80"
                >
                  Watch Full Video
                </Button>
              </div>
            )}
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
      <div className="flex-col">
        <h4 className="my-2 text-left text-md text-gray-600 video_title">
          {props.video.title}
        </h4>
        <div className="flex">
          <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
            {props.video.viewCount} views
          </span>
        </div>
      </div>
    </div>
  )
}

RenderVideo.propTypes = {
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
    trailer_duration: PropTypes.any
  }),
  paymentModalVisible: PropTypes.func,
  for: PropTypes.any,
  playVideo: PropTypes.func,
  fromWatch: PropTypes.bool
}

export default RenderVideo
