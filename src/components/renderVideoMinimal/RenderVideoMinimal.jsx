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
        'flex-col w-full h-56 mb-1 md:h-64 md:w-4/12 lg:w-56 sm:w-6/12 pt-2 cursor-pointer video_thumbnail transform hover:scale-110  transition duration-5000 ease-in-out delay-500 bg-white hover:z-50 md:hover:shadow-xl'
      }
    >
      <div className="relative max-h-full flex justify-center">
        <img
          src={props.video.thumbnial}
          alt=""
          className="block h-40 video_image"
        />
        <img
          src={
            props.video.paid
              ? props.video.main_gif || ''
              : props.video.trailer_gif || ''
          }
          className="hidden h-40 video_gif"
          alt=''
        />
        <div className="absolute thumbnail_button_container">
          <Tooltip placement="bottom" title="Watch Video">
            <FaPlayCircle className="text-gray-600 thumbnail_button" />
          </Tooltip>
        </div>
        <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
        <div className="flex items-center bg-gray-900 text-white  absolute bottom-1 front-semibold right-1 py-0 px-2 md:text-xs text-sm">
          {moment(props.video?.video_duration?.split('.')[0], [
            moment.ISO_8601,
            'HH:mm:ss'
          ]).format('H:m:ss')}
        </div>
      </div>
      <div className="flex-col px-3 py-1 md:h-40">
        <h4 className="mt-1 text-left text-xs  text-gray-700 font-semibold video_title_new">
          {props.video.title}
        </h4>
        <div className="flex items-center">
          <span className="flex items-center text-gray-500 cursor-pointer font-medium  hover:text-blue-400 text-xs mt-2">
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
