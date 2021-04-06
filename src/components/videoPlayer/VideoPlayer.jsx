import './VideoPlayer.css'

import React, { Component } from 'react'
import videojs from 'video.js'
import 'videojs-contrib-quality-levels'
import 'videojs-hls-quality-selector'
import videoService from '../../_services/video.service'
import PropTypes from 'prop-types'

let incrementViewInterval

export class VideoPlayer extends Component {
  state = {
    viewIncremented: false
  }

  componentDidMount() {
    this.player = videojs(
      this.videoNode,
      { ...this.props, withCredentials: true },
      function onPlayerReady() {}
    )
    console.log(this.player)

    this.player.hlsQualitySelector({
      displayCurrentQuality: true
    })

    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.role === 'VIEWER') {
      incrementViewInterval = setInterval(() => {
        if (
          this.player &&
          this.player?.currentTime &&
          this.player?.currentTime() >= 10 &&
          !this.player?.paused() &&
          !this.player.ended()
        ) {
          videoService
            .incrementVideoView({ videoId: this.props.videoId })
            .then((res) => {
              if (res.success) {
                this.setState({ viewIncremented: true })
              }
            })
            .catch((err) => console.log(err))
        }
      }, 10000)
    }
  }

  handleHotKeys = (e) => {
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

  render() {
    if (this.state.viewIncremented) {
      clearInterval(incrementViewInterval)
    }
    return (
      <div
        onKeyUp={(e) => this.handleHotKeys(e)}
        onKeyDown={(e) => e.preventDefault()}
        data-vjs-player
      >
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js"
        ></video>
      </div>
    )
  }

  componentWillUnmount() {
    if (this.player) {
      clearInterval(incrementViewInterval)
      this.player.dispose()
    }
  }
}

VideoPlayer.propTypes = {
  sources: PropTypes.any,
  videoId: PropTypes.string,
  autoplay: PropTypes.bool,
  thumbnial: PropTypes.string
}

export default VideoPlayer
