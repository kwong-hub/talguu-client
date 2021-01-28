import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect } from "react-redux";
import { Button } from "antd";
import { INCREMENT_ASYNC } from "../../redux/types";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import image from "../../assets/images/thumbnail.png";

export class WatchVideo extends Component {
  handleIncrement = () => {
    this.props.dispatch({ type: INCREMENT_ASYNC, payload: 1 });
  };
  render = () => {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      poster: image,
      //   width: "600%",
      //   height: "300%",
      //   hight: "600%",
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: "http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8",
          type: "application/x-mpegURL",
        },
      ],
    };
    return (
      <div>
        <SideNav></SideNav>
        <div className="flex ml-16 mt-12 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
          <VideoPlayer {...videoJsOptions}></VideoPlayer>
        </div>
        <div className="fixed right-0 top-0 bottom-0 flex lg:w-48 xl:w-3/12 lg:min-h-full bg-gray-500">
          Hello
        </div>
      </div>
    );
  };
}

const mapStateToProps = (props) => {
  return {
    count: props.counter.count,
  };
};

export default connect(mapStateToProps, null)(WatchVideo);
