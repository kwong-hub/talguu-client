
import React, { useEffect } from 'react'

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

            console.log("playerChecking: ", player)

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



    const handleHotKeys = (e) => {
        e.preventDefault()
        switch (e.key) {
            case 'ArrowRight':
                this.player.currentTime(Math.floor(this.player.currentTime()) + 5)
                break
            case 'ArrowLeft':
                this.player.currentTime(Math.ceil(this.player.currentTime()) - 5)
                break
            case ' ':
                this.player.paused() ? this.player.play() : this.player.pause()
                break
            default:
                break
        }
    }

    return (
        <div
            data-vjs-player
            onKeyUp={(e) => handleHotKeys(e)}
            onKeyDown={(e) => e.preventDefault()}
            className=""
        >
            <video ref={videoRef}
                className="video-js vjs-big-play-centered"></video>
        </div>
    )
}

export default VideoPlayer