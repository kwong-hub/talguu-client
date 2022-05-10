
import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';

import { SAMPLE_VIDEOS } from './sampleVideos';
import { swipeDetect } from './swipeDetector';
import VideoPlayer from './VideoPlayer';


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
        autoplay: true,
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
  return (
      <div className='w-full h-screen' id='playerDiv'>
          <VideoPlayer
              options={videoJsOptions}
              onReady={handlePlayerReady}
          />
      </div>
  )
}

export default LaughterVideoPlayer