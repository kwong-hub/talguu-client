import React, { useEffect, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import { useHistory, useParams } from 'react-router-dom'

import VideoPlayer from './VideoPlayer'

import talguuLogo from '../../assets/images/talguu_logo.png'
import { Space, Spin } from 'antd'
import { config } from './swiperConfig'
import { useSwipeable } from 'react-swipeable'

import './custom_player_style.css'
import LaughterSideNav from './LaughterSideNav'
import { FaPlayCircle } from 'react-icons/fa'
import { laughterService } from '../../_services/laughter.service'

import { useLocation } from 'react-router-dom'

const LaughterVideoPlayer = () => {
  const history = useHistory()

  const [currentVideo, setCurrentVideo] = useState({})
  const [randomStr, setRandomStr] = useState('')
  const [loading, setLoading] = useState(true)
  const { vidId } = useParams()
  const [playVideo, setPlayVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const playerRef = React.useRef(null)



  const handlePlayerReady = (player) => {
    playerRef.current = player

    // You can handle player events here, for example:
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

  useEffect(() => {
    if (vidId) {
      const singleVideoLaughter = () => {
        laughterService.getLaughterVideoUrl(vidId).then((res) => {
          console.log('res: ', res)
          if (res) {
            setLoading(false)
            setCurrentVideo(res)
          } else {
            setCurrentVideo({})
          }
        })
      }

      singleVideoLaughter()
    }

    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setPlayVideo(true)
    setRandomStr(new Date().getTime().toString())
    window.scrollTo(0, 0)
    return () => {}
  }, [currentVideo])

  const handlePlayPause = () => {
    const player = playerRef.current
    // const xyPlayer = document.getElementById("myPlayerLaughter")

    if (isPlaying) {
      player.pause()
      //    setIsPlaying()
    } else {
      player.play()
    }
  }

  const handleSendLaughter = (currentVideo) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user || user.role !== 'VIEWER') {
      history.push({
        pathname: '/login',
        search: `?return_url=/laughter/send/${currentVideo.id}`,
      
      })
    } else {
      history.push({
        pathname: `/laughter/send/${currentVideo.id}`,
      
      })
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      handleHorizontalSwipe()
    },
    onSwipedRight: () => {
      handleHorizontalSwipe()
    },
    onSwipedUp: () => {
      handleVerticalSwipe()
    },
    onSwipedDown: () => {
      handleVerticalSwipe()
    },
    ...config
  })

  const handleHorizontalSwipe = () => {
    const producerId = currentVideo.producerId
    history.push({
      pathname: `/producer/${producerId}`,
      state: {
        vidId
      },
    })
  }

  const handleVerticalSwipe = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user || user.role !== 'VIEWER') {
      history.push({
        pathname: `/laughter-home`,
      
      })
    } else {
      history.push({
        pathname: `/laughter`,
      
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
        // poster: currentVideo?.thumbnial?.includes('talguu-vout1')
        //     ? currentVideo?.thumbnial
        //     : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
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
              onReady={handlePlayerReady}
              handlePlayPause={handlePlayPause}
            />
          </div>
          <div className="flex w-full h-14 md:w-full justify-between py-1 absolute top-3">
            <div className="items-start ml-2">
              <img src={talguuLogo} className="w-20 h-7" alt="logo" />
            </div>

            <div className="flex flex-col items-end mr-3 cursor-pointer">
              <button
                onClick={() => handleSendLaughter(currentVideo)}
                className="text-white px-5 py-2 text-lg rounded-3xl border-1 border-gray-600 bg-blue-500 opacity-80"
              >
                <span className="flex items-center justify-center text-white font-bold">
                  <IoSendSharp className="mr-3 text-gray-100" />
                  Send
                </span>
              </button>
            </div>
          </div>

          <div
            className="custom_play_button cursor-pointer"
            onClick={handlePlayPause}
          >
            {!isPlaying && <FaPlayCircle className="w-10 h-10 text-white" />}
          </div>

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
        ) : // <div>This is the test div</div>
        loading ? (
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

export default LaughterVideoPlayer
