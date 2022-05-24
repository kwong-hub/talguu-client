
import React, { useEffect } from 'react'
import { IoSendSharp } from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';

import { SAMPLE_VIDEOS } from './sampleVideos';
import { swipeDetect } from './swipeDetector';
import VideoPlayer from './VideoPlayer';

import talguuLogo from '../../assets/images/talguu_logo.png'


const LaughterVideoPlayer = () => {

    const history = useHistory()
    const playerRef = React.useRef(null);


    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     console.log("user: " + user)
    //     if (!user || user.role !== 'VIEWER') {
    //         history.push({
    //             pathname: '/login',
    //         })
    //     }
    // }, [])


    const video_src = SAMPLE_VIDEOS[0].video_url


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('playing', () => {
            onPlayerSwipe()
            console.log("player is playing....")
        })

        player.on('waiting', () => {
            onPlayerSwipe()
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    }

    useEffect(() => {
        window.addEventListener('load', function () {
            onPlayerSwipe()
        }, false)
    }, [])


    const handleSendLaughter = () => {
        history.push('/laughter/send')
    }

    const onPlayerSwipe = () => {
        var el = document.getElementById('playerDiv')
        var hideTimer = null
        swipeDetect(el, function (swipeDir) {
            if (swipeDir !== 'none') {
                clearTimeout(hideTimer)
                if (swipeDir === 'up' || swipeDir === 'down') {
                    console.log("swipe: ", swipeDir)
                    // send to home 
                    history.push("/laughter")
                } else if (swipeDir === 'right' || swipeDir === 'left') {
                    console.log("swipe: ", swipeDir)
                    // go to producer profile
                    history.push("/producer")
                }
            }
        })
    }

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        loop: true,
        responsive: true,
        aspectRatio: '9:16',
        muted: true,
        sources: [{
            src: `${video_src}`,
            type: 'video/mp4'
        }]

    }


    // const sendVideo = () => {
    //     console.log("Button Listening...")
    //     history.push("/laughter/send")
    // }

    return (
        <div className='w-full relative flex flex-col' id='playerDiv'>
            <VideoPlayer
                options={videoJsOptions}
                onReady={handlePlayerReady}
            />

            {/* send laughter button here... */}    
            <div className='flex w-full h-14 justify-between z-50 py-1 absolute top-3'>
                <div className='items-start ml-2'>
                    <img src={talguuLogo} className="w-20 h-7" alt="logo" />
                </div>

                <div className='flex flex-col items-end mr-3 cursor-pointer'>
                    <button
                        onClick={() => handleSendLaughter()}
                        // state={{ data: "https://s3.us-west-2.amazonaws.com/talguu-videos/Short/Snaptik_7036075105381862661_the-shaba-kitchen.mp4" }}
                        className='text-white px-5 py-2 text-lg rounded-3xl border-2 border-gray-600 bg-gray-600'
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
}

export default LaughterVideoPlayer