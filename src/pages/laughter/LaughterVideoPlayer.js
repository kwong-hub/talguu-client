
import React, { useEffect, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5';
import {useHistory, useParams } from 'react-router-dom';

import VideoPlayer from './VideoPlayer';

import talguuLogo from '../../assets/images/talguu_logo.png'
import videoService from '../../_services/video.service';
import { Space, Spin } from 'antd';
import { config } from './swiperConfig';
import { useSwipeable } from 'react-swipeable';


import './custom_player_style.css'
import SideNav from '../../partials/sideNav/SideNav';
import LaughterSideNav from './LaughterSideNav';

const LaughterVideoPlayer = () => {

    const history = useHistory()

    const [currentVideo, setCurrentVideo] = useState({})
    const [randomStr, setRandomStr] = useState('')
    const [loading, setLoading] = useState(true)
    const { vidId } = useParams()
    const [playVideo, setPlayVideo] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const playerRef = React.useRef(null);



    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            player.log('player is waiting');
        });


        player.on('pause', () => {
            player.log('player is paused');
        });
        player.on('play', () => {
            player.log('player is playing....');
            setIsPlaying(true)
        });


        player.on('dispose', () => {
            player.log('player will dispose');
        });
    };




    useEffect(() => {
        if (vidId) {
            const singleVideoLaughter = () => {
                videoService.getPaidVideoUrl(vidId).then(res => {
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
        return () => { }
    }, [currentVideo])




   const handleOnPlayerClick = () => {
      const player = playerRef.current
      console.log("I am at least listening to your click!")
       if(player){
           console.log("Playing: ", playerRef.current.paused())
       }else{
        player.play()
       }

   }

    const handleSendLaughter = (currentVideo) => {

        const user = JSON.parse(localStorage.getItem('user'))

        if (!user || user.role !== 'VIEWER') {
            history.push({
                pathname: '/login',
                search: `?return_url=/laughter/send/${currentVideo.id}`
            })
        } else {
            history.push(`/laughter/send/${currentVideo.id}`)
        }

    }


    const handlers = useSwipeable({
        onSwipedLeft: () => {
            const producerId = currentVideo.producerId
            history.push(`/producer/${producerId}`)
        },
        onSwipedRight: () => {
            const producerId = currentVideo.producerId
            history.push(`/producer/${producerId}`)
        },
        onSwipedUp: () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user || user.role !== 'VIEWER') {
                history.push(`/laughter-home`)
            } else {
                history.push(`/laughter`)
            }
        },
        onSwipedDown: () => {
            const user = JSON.parse(localStorage.getItem('user'))
            if (!user || user.role !== 'VIEWER') {
                history.push(`/laughter-home`)
            } else {
                history.push(`/laughter`)
            }
        },
        ...config,
    });





    const renderPlayer = () => {
        if (currentVideo) {

            const videoJsOptions = {
                videoId: currentVideo.id,
                autoplay: true,
                controls: true,
                poster: currentVideo?.thumbnial?.includes('talguu-vout1')
                    ? currentVideo?.thumbnial
                    : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
                aspectRatio: '9:16',
                responsive: true,
                fill: true,
                sources: [
                    {
                        src: currentVideo.trailer ? currentVideo.trailer : '',
                        type: currentVideo.video_type
                    }
                ]
            }
            return (
                <div className="player_container_laughter">
                    <div 
                        className="player_content"
                        key={randomStr}
                        onClick={handleOnPlayerClick}
                    >
                        <VideoPlayer
                            options={videoJsOptions}
                            onReady={handlePlayerReady}
                        />

                    </div>
                    <div className='flex w-full h-14 md:w-1/2 justify-between z-50 py-1 absolute top-3'>
                        <div className='items-start ml-2'>
                            <img src={talguuLogo} className="w-20 h-7" alt="logo" />
                        </div>

                        <div className='flex flex-col items-end mr-3 cursor-pointer'>
                            <button
                                onClick={() => handleSendLaughter(currentVideo)}
                                className='text-white px-5 py-2 text-lg rounded-3xl border-1 border-gray-600 bg-gray-600'
                            >
                                <span className='flex items-center justify-center'>
                                    <IoSendSharp className='mr-3' />
                                    Send
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            )
        }else{
            <div className='w-full h-full flex items-center justify-center'>
                <p>
                    {'There is no video to play'}
                </p>
            </div>
        }
    }


    return (
        <div
            {...handlers}
            id='playerDiv'
            className='w-full h-screen relative'
        >

        <LaughterSideNav></LaughterSideNav>

            <div className='w-full h-full'>
                {playVideo && currentVideo ? (
                    renderPlayer()
                    // <div>This is the test div</div>
                ) :
                    loading ? (

                        <div className="w-screen mx-auto mt-40">
                            <Space size="middle">
                                <Spin size="large" />
                            </Space>
                        </div>

                    ): 
                        (

                            <div className="w-screen mx-auto mt-40">
                                <Space size="middle">
                                    <Spin size="large" />
                                </Space>
                            </div>

                        )
                   }
            </div>
        </div>
    )
}

export default LaughterVideoPlayer