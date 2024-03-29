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
          ? 'flex-col w-full h-72  mb-1 md:h-64 md:w-4/12 lg:w-56 sm:w-6/12 pt-2 cursor-pointer video_thumbnail transform hover:scale-110  transition duration-5000 ease-in-out delay-500  bg-white hover:z-50 md:hover:shadow-xl ' +
          varClassNames
          : 'flex-col w-full h-72 mb-1 md:h-64 md:w-4/12 lg:w-56 sm:w-6/12 pt-2 cursor-pointer video_thumbnail transform hover:scale-110  transition duration-5000 ease-in-out delay-500 bg-white hover:z-50 md:hover:shadow-xl ' +
          varClassNames
      }
    >
      <div className="relative max-h-full flex justify-center">
        <img
          src={
            props.video.thumbnial?.includes('talguu-vout1')
              ? props.video.thumbnial
              : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png'
          }
          alt=""
          className="block h-56 md:h-40 video_image w-full"
        />
        <img
          src={
            props.video.paid
              ? props.video.main_gif || ''
              : props.video.trailer_gif || ''
          }
          className="hidden h-56 md:h-40 video_gif w-full"
          alt=''
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
        {/* <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-4 px-4 bg-opacity-40"></div> */}
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
          <div className="flex items-center bg-transparent bg-gray-100 rounded-xl text-green-400  absolute top-1 left-1 py-0 px-1 md:text-xs text-sm font-medium  opacity-90 md:w-12 w-18">
            <FaDollarSign className="text-green-400 md:text-sm text-sm" />{' '}
            {props.video?.video_price}
          </div>
        ) : (
          ''
        )}
        <div className="flex items-center bg-gray-900 text-white  absolute bottom-1 front-semibold right-1 py-0 px-2 md:text-xs text-sm">
          {moment(duration.split('.')[0], [moment.ISO_8601, 'HH:mm:ss']).format(
            'H:m:ss'
          )}
        </div>
      </div>
      <div className="flex-col px-3 py-1 md:h-40">
        <h4 className="mt-3 md:mt-1 text-left text-xs  text-gray-700 font-semibold video_title_new">
          {props.video.title}
        </h4>
        <div className="flex items-center">
          <span className="flex items-center text-gray-500 cursor-pointer font-medium  hover:text-blue-400 text-xs mt-2 ">
            {props.video.viewCount} views
          </span>
          <span className="mx-2 text-xs mt-2">
            {moment(props.video.createdAt).fromNow()}
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
