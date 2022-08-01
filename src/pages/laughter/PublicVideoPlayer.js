import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import LaughterSideNav from './LaughterSideNav'
import { config } from './swiperConfig'
import VideoPlayer from './VideoPlayer'

import talguuLogo from '../../assets/images/talguu_logo.png'
import { Space, Spin } from 'antd'

import './send/send_module_css.css'
import { laughterService } from '../../_services/laughter.service'

const PublicVideoPlayer = () => {


  const search = useLocation().search

  const token = new URLSearchParams(search).get('tkn')
  const videoUrl = new URLSearchParams(search).get('vdy')


  const [currentVideo, setCurrentVideo] = useState({
    id: 1,
    video_link: '',
    video_type: 'application/x-mpegURL',
    specialMessage: ''
  })

  const [randomStr, setRandomStr] = useState('')
  const [playVideo, setPlayVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showOverlayText, setShowOverlayText] = useState(true)

  const playerRef = React.useRef(null)
  let isShowingText = false;

  const history = useHistory()



  useEffect(() => {
    setPlayVideo(true)
    setRandomStr(new Date().getTime().toString())
  }, [currentVideo])


  useEffect(() => {
    publicLaughterVideoPlayer()
  }, [])






  const publicLaughterVideoPlayer = () => {
    setLoading(true)
    laughterService.getPublicLaughterVideoUrl(token, videoUrl).then(res => {
      const { message, video_url } = res
      if (message && video_url) {
        setCurrentVideo((prev) => ({
          ...prev,
          specialMessage: message,
          video_link: video_url
        }))
      } else {
        setCurrentVideo({})
      }
      setLoading(false)
    })
  }



  const handlePlayerReadyPublic = (player) => {

    player.ready(function () {
      this.on('timeupdate', function () {

        if (this.currentTime() > 0.5 && this.currentTime() < 1) {
          if (!isShowingText) {
            setShowOverlayText(true)
            isShowingText = true
          }
        }
        else if (this.currentTime() > 5) {
          if (isShowingText) {
            setShowOverlayText(false)
            isShowingText = false
          }
        }
      })
    });

    playerRef.current = player
    player.on('waiting', () => {
    })

    player.on('pause', () => {
      // player.log('player is paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      // player.log('player is playing....')
      setIsPlaying(true)
    })

    player.on('dispose', () => {
      // player.log('player will dispose')
    })
  }



  const handlePlayPause = () => {
    const player = playerRef.current

    player.ready(function () {
      this.on('timeupdate', function () {
        // console.log("currentTIme: ", this.currentTime())

        if (this.currentTime() > 0 && this.currentTime() < 1) {
          if (!isShowingText) {
            setShowOverlayText(true)
            isShowingText = true
          }
        }
        else if (this.currentTime() > 5) {
          if (isShowingText) {
            setShowOverlayText(false)
            isShowingText = false
          }
        }
      })
    });

    if (isPlaying) {
      player.pause()
      //    setIsPlaying()
    } else {
      player.play()
    }
  }

  const handlers = useSwipeable({
    onSwipedUp: () => {
      handleVerticalSwipe()
    },
    onSwipedDown: () => {
      handleVerticalSwipe()
    },
    ...config
  })

  const handleVerticalSwipe = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'VIEWER') {
      history.push({
        pathname: `/laughter-home`,
        state: {
          laughter_page_offset: 1,
          page_limit: 6
        },
      })
    } else {
      history.push({
        pathname: `/laughter`,
        state: {
          laughter_page_offset: 1,
          page_limit: 6
        }
      })
    }
  }

  const renderPlayer = () => {
    if (currentVideo) {
      const videoJsOptions = {
        videoId: currentVideo.id,
        autoplay: true,
        controls: false,
        errorDisplay: false,
        aspectRatio: '9:16',
        responsive: true,
        fill: true,
        sources: [
          {
            src: currentVideo.video_link,
            type: currentVideo.video_type
          }
        ]
      }
      return (
        <div className="">
          <div
            className="cursor-pointer"
            key={randomStr}
            onClick={handlePlayPause}
          >
            <VideoPlayer
              options={videoJsOptions}
              onReady={handlePlayerReadyPublic}
              handlePlayPause={handlePlayPause}
            />
          </div>
          <div className="flex w-full h-14 md:w-full justify-between py-1 absolute top-3">
            <div className="items-start ml-2">
              <img src={talguuLogo} className="w-20 h-7" alt="logo" />
            </div>
          </div>

          <div
            className="custom_play_button cursor-pointer"
            onClick={handlePlayPause}
          >
            {!isPlaying && <FaPlayCircle className="w-10 h-10 text-white" />}
          </div>

          {showOverlayText && (
            <div className="overlay_text_style">
              <h1 className="text-white animate-charcter">
                {currentVideo.specialMessage
                  ? currentVideo.specialMessage
                  : ''}
              </h1>
            </div>
          )}

          <div className="w-full">
            <LaughterSideNav></LaughterSideNav>
          </div>
        </div>
      )
    } else {
       <div className="w-full h-full flex items-center justify-center">
        <p>{'There is no video to play'}</p>
      </div>
    }
  }

  return (
    <div
      {...handlers}
      id="playerDiv"
      className="w-full h-screen bg-black md:bg-white lg:bg-white"
    >
      <div className="player_content">
        {playVideo && currentVideo ? (
          renderPlayer()
        ) : loading ? (
          <div className="w-screen mx-auto mt-40">
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        ) : (
          <div className="w-screen mx-auto mt-40">
            <Space size="middle">
              <Spin size="large" />
            </Space>
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicVideoPlayer
