import './RenderVideoMinimal.css'

import { Tooltip } from 'antd'
import moment from 'moment'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'



const RenderVideoMinimal = (props) => {

  const history = useHistory()
  
  const play = (video) => {
    history.push(`/watch/${video.id}`)
  }

  return (
    <div
      key={props.video.id}
      onClick={() => play(props.video)}
      className={
        'flex-col w-full md:w-4/12 lg:w-3/12 sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch'
      }
    >
      <div className="relative">
        <img
          src={props.video.thumbnial}
          alt=""
          className="max-h-full block video_image"
        />
        <img
          src={
            props.video.paid
              ? props.video.main_gif || ''
              : props.video.trailer_gif || ''
          }
          className="max-h-full hidden h-96 sm:h-48 video_gif mx-auto"
        />
        <div className="absolute thumbnail_button_container">
          <Tooltip placement="bottom" title="Watch Video">
            <FaPlayCircle className="text-gray-600 thumbnail_button" />
          </Tooltip>
        </div>
        <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
        <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
          {moment(props.video?.video_duration?.split('.')[0], [
            moment.ISO_8601,
            'HH:mm:ss'
          ]).format('H:m:ss')}
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

RenderVideoMinimal.propTypes = {
  video: PropTypes.shape({
    viewCount: PropTypes.number,
    title: PropTypes.string,
    video_duration: PropTypes.number,
    trailer_gif: PropTypes.string,
    main_gif: PropTypes.string,
    paid: PropTypes.bool,
    thumbnial: PropTypes.string,
    id: PropTypes.string
  })
}

export default RenderVideoMinimal
