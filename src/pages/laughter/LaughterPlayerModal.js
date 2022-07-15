import { Space, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { IoSendSharp } from 'react-icons/io5'
import { useHistory } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { laughterService } from '../../_services/laughter.service'
import LaughterSideNav from './LaughterSideNav'
import { config } from './swiperConfig'
import VideoPlayer from './VideoPlayer'
import talguuLogo from '../../assets/images/talguu_logo.png'

import { useDispatch } from 'react-redux'

import { hideVideoModal } from '../../redux/reducers/custom.reducer'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'


const LaughterPlayerModal = ({
    videoId
}) => {

    const history = useHistory()

    const [currentVideo, setCurrentVideo] = useState({})
    const [randomStr, setRandomStr] = useState('')
    const [loading, setLoading] = useState(true)
    const [playVideo, setPlayVideo] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const playerRef = React.useRef(null)

    // const { showVideoPlayer } = useSelector((state) => state.showPlayer)
    const dispatch = useDispatch()


    useEffect(() => {
        if (videoId) {
            const singleVideoLaughter = () => {
                laughterService.getLaughterVideoUrl(videoId).then((res) => {
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


    }, [])

    useEffect(() => {
        setPlayVideo(true)
        setRandomStr(new Date().getTime().toString())

        return () => { }
    }, [currentVideo])


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

    const handlePlayPause = () => {
        const player = playerRef.current

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
        dispatch(hideVideoModal())
        const producerId = currentVideo.producerId
        history.push({
            pathname: `/producer/${producerId}`,
            state: {
                videoId
            },
        })
        document.body.style.overflow = 'unset'
    }

    const handleVerticalSwipe = () => {
        dispatch(hideVideoModal())
        document.body.style.overflow = 'unset'
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
                            onReady={handlePlayerReady}
                            handlePlayPause={handlePlayPause}
                        />
                    </div>
                    <div className="flex w-full h-14 md:w-full justify-between py-1 absolute top-3">
                        <div className="items-start ml-2">
                            <img src={talguuLogo} className="w-20 h-7 md:w-16 md:h-5" alt="logo" />
                        </div>

                        <div className="flex flex-col items-end mr-3 cursor-pointer">
                            <button
                                onClick={() => handleSendLaughter(currentVideo)}
                                className="text-white px-5 py-2 md:px-2 md:py-1 text-sm md:text-xs rounded-3xl border-1 border-gray-600 bg-blue-500 opacity-80"
                            >
                                <span className="flex items-center justify-center text-gray-100 font-bold text-sm md:text-xs">
                                    <IoSendSharp className="mr-2 text-gray-100" />
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
        <div className="z-50 fixed inset-0">
            
            <div className="fixed inset-0 backdropPlayer overflow-y-auto h-full w-full"></div>

            <div className="w-full h-full bg-transparent absolute overflow-hidden top-0 right-0 z-50 ">
                <button
                    onClick={() => {
                        dispatch(hideVideoModal())
                        document.body.style.overflow = 'unset'
                    }}
                    className="ml-24 mt-5 px-5 py-2 text-sm rounded-3xl border-1 border-gray-600 hidden md:block"
                >
                    <BsFillArrowLeftCircleFill className="w-7 h-7 text-blue-500 " />
                </button>


                <div
                    {...handlers}
                    id="playerDiv"
                    className="w-full h-screen md:bg-transparent bg-black"
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
            </div>
        </div>
    )
}

export default LaughterPlayerModal