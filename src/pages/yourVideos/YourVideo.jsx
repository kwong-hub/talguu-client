import React, { Component } from "react";
import { Menu } from "antd";
import Video from "../../components/videos/Video";
import SideNav from "../../partials/sideNav/SideNav";
import videoService from "../../_services/video.service";


export class YourVideo extends Component {
  state = {
    videos: [],
    current: "mail",
  };
  
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
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
    const { current } = this.state;
    return (
      <div className="m-12">
        <SideNav></SideNav>
        <div className="m-6 w-full">
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            className=""
          >
            <Menu.Item key="mail">Watched Videos</Menu.Item>
            <Menu.Item key="app">Live Videos</Menu.Item>
            <Menu.Item key="video">Videos</Menu.Item>
          </Menu>
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
