import React, { Component } from "react";
import videojs from "video.js";
import "./VideoPlayer.css";

export class VideoPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
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
