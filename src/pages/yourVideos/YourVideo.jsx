import { Avatar } from "antd";
import React, { Component } from "react";
import { FaUser } from "react-icons/fa";
import Video from "../../components/videos/Video";
import SideNav from "../../partials/sideNav/SideNav";
import videoService from "../../services/video.service";
export class YourVideo extends Component {
  state = {
    videos: [],
  };
  componentDidMount() {
    this.getVideos();
  }
  getVideos = () => {
    videoService
      .getVideos()
      .then((data) => {
        console.log("data", data);
        this.setState({ videos: data });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  render() {
    return (
      <div className="m-4">
        <SideNav></SideNav>
        <div className="w-full h-32 flex justify-center bg-gray-100 ml-4 shadow-lg">
         <span className="text-2xl "> Your Video is here</span> 
        </div>
        <div className="m-2 flex flex-wrap">
        {this.state.videos.map((item) => {
           return <Video {...item} width={400} height={100} />;
          })}
        </div>
       
      </div>
    );
  }
}

export default YourVideo;
