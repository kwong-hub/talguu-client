
import React,{useEffect} from 'react'

import videojs from "video.js";
import "video.js/dist/video-js.css";
import './custom_player_style.css'


const VideoPlayer = (props) => {


    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const { options, onReady } = props;

    useEffect(() => {
        // make sure Video.js player is only initialized once
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            const player = playerRef.current = videojs(videoElement, options, () => {
                onReady && onReady(player);
            });

        } else {


        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);


  return (
      <div data-vjs-player>
          <video ref={videoRef}
              className="video-js vjs-big-play-centered" />
      </div>
  )
}

export default VideoPlayer