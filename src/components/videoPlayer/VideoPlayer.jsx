import './VideoPlayer.css'

import React, { Component } from 'react'
import videojs from 'video.js'
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
          if (this.state.viewIncremented) {
            clearInterval(incrementViewInterval)
          }
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

  // componentDidUpdate(prevProps) {
  //   if (this.props.randomStr !== prevProps.randomStr) {
  //     this.player.pause()
  //     this.updatePlayer()
  //     this.setState({ viewIncremented: false })
  //   }
  // }

  // updatePlayer() {
  //   this.player.poster(this.props.thumbnial)
  //   // if (this.player.error) {
  //   //   this.player = videojs(
  //   //     this.videoNode,
  //   //     { ...this.props, withCredentials: true },
  //   //     function onPlayerReady() {}
  //   //   )
  //   // }

  //   this.player.src({
  //     src: this.props.sources[0].src,
  //     type: this.props.sources[0].type
  //   })
  //   this.player.id(this.videoNode)
  //   this.player.controls(true)
  //   this.player.autoplay(true)
  //   this.player.reset()
  // }

  render() {
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
      clearInterval(incrementViewInterval)
      this.player.dispose()
    }
  }
}

VideoPlayer.propTypes = {
  sources: PropTypes.any,
  videoId: PropTypes.string,
  autoplay: PropTypes.bool,
  randomStr: PropTypes.string,
  thumbnial: PropTypes.string
}

export default VideoPlayer
