import './VideoPlayer.css'

import React, { Component } from 'react'
import videojs from 'video.js'
import videoService from '../../_services/video.service'
import PropTypes from 'prop-types'

export class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(
      this.videoNode,
      { ...this.props, withCredentials: true },
      function onPlayerReady() {}
    )
    const user = localStorage.getItem('user')

    if (user && user.role === 'VIEWER') {
      setTimeout(() => {
        if (
          this.player &&
          this.player?.currentTime &&
          this.player?.currentTime() >= 10
        ) {
          videoService
            .incrementVideoView({ videoId: this.props.videoId })
            .then((res) => {
              if (res.success) {
                // console.log("OK");
              }
            })
            .catch((err) => console.log(err))
        }
      }, 15000)
    }
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.sources, this.props.sources);
    // console.log(this.props.randomStr)
    if (this.props.randomStr !== prevProps.randomStr) {
      this.updatePlayer()
    }
    //   (this.props.sources[0].src &&
    //     prevProps.sources[0].src !== this.props.sources[0].src) ||
    //   prevProps.autoplay !== this.props.autoplay
    // ) {
    // }
  }

  updatePlayer() {
    this.player.src({
      src: this.props.sources[0].src,
      type: this.props.sources[0].type
    })
    this.player.autoplay(this.props.autoplay)
  }

  render() {
    // console.log(this.props.sources[0]);
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js"
        ></video>
      </div>
    )
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }
}

VideoPlayer.propTypes = {
  sources: PropTypes.any,
  videoId: PropTypes.any,
  autoplay: PropTypes.bool,
  randomStr: PropTypes.string
}

export default VideoPlayer
