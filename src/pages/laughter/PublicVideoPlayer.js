import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import LaughterSideNav from './LaughterSideNav'
import { config } from './swiperConfig'
import VideoPlayer from './VideoPlayer'

import talguuLogo from '../../assets/images/talguu_logo.png'
import { Space, Spin } from 'antd'

import './send/send_module_css.css'

const PublicVideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState({
    id: 1,
    video_link:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    video_type: 'video/mp4',
    specialMessage: 'My Special gift for you'
  })
  const [randomStr, setRandomStr] = useState('')
  const [playVideo, setPlayVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showOverlayText, setShowOverlayText] = useState(true)

  const playerRef = React.useRef(null)

  const history = useHistory()

  const overlayShowTime = 5

  useEffect(() => {
    console.log("publicPlayer mounted")
    setPlayVideo(true)
    setRandomStr(new Date().getTime().toString())
    window.scrollTo(0, 0)
    
    return () => {
       
        console.log("publicPlayer unMounted")
    }

  }, [currentVideo])

  const handlePlayerReadyPublic = (player) => {
    playerRef.current = player

    
    var myInterval = setInterval(() => {
        console.log('Current player: ', player)
      if (player) {
        if (player.currentTime() > overlayShowTime) {
          setShowOverlayText(false)
          clearInterval(myInterval)
        }
      }
      console.log('Timer running....')
    }, 1000)
    player.on('waiting', () => {
      player.log('player is waiting')
    })

    player.on('pause', () => {
      player.log('player is paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      player.log('player is playing....')
      setIsPlaying(true)
    })

    player.on('dispose', () => {
      player.log('player will dispose')
    })
  }

  const handlePlayPause = () => {
    const player = playerRef.current
    var myInterval = setInterval(() => {
      if (player) {
        if (player.currentTime() > overlayShowTime) {
          setShowOverlayText(false)
          clearInterval(myInterval)
        }
      }
      console.log('Timer running....')
    }, 1000)

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
                  : 'Hello there!'}
              </h1>
            </div>
          )}

          <div className="w-full">
            <LaughterSideNav></LaughterSideNav>
          </div>
        </div>
      )
    } else {
      ;<div className="w-full h-full flex items-center justify-center">
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
