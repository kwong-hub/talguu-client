import React, { Component } from "react";
import videojs from "video.js";
// import videojs_contrib_hls from "videojs-contrib-hls";
import "./VideoPlayer.css";

export class VideoPlayer extends Component {
  componentDidMount() {
    // videojs.registerPlugin("videojs-contrib-hls", videojs_contrib_hls);
    this.player = videojs(
      this.videoNode,
      { ...this.props, withCredentials: true },
      function onPlayerReady() {
        //   console.log("onPlayerReady", this);
      }
    );
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.sources, this.props.sources);
    if (
      prevProps.sources[0].src !== this.props.sources[0].src ||
      prevProps.autoplay !== this.props.autoplay
    ) {
      this.updatePlayer();
    }
  }

  updatePlayer() {
    this.player.src({
      src: this.props.sources[0].src,
      type: this.props.sources[0].type,
    });
    this.player.autoplay(this.props.autoplay);
  }

  render() {
    return (
      <div data-vjs-player>
        <video ref={(node) => (this.videoNode = node)} className="video-js"></video>
      </div>
    );
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
}

export default VideoPlayer;
