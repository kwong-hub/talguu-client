import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect } from "react-redux";
import { Button, Input, Tooltip, Modal, Radio } from "antd";
import { INCREMENT_ASYNC } from "../../redux/types";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import {
  FaPlayCircle,
  FaSearch,
  FaHeart,
  FaHeartBroken,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import "./WatchVideo.css";
import moment from "moment";

import image1 from "../../assets/images/thumbnail1.png";
import image2 from "../../assets/images/thumbnail2.png";
import image3 from "../../assets/images/thumbnail3.png";
import image4 from "../../assets/images/thumbnail4.png";
import image5 from "../../assets/images/thumbnail5.png";
import image6 from "../../assets/images/thumbnail6.png";
import image7 from "../../assets/images/thumbnail7.png";
import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";

const { Search } = Input;

export class WatchVideo extends Component {
  state = {
    videos: [
      {
        id: 1,
        src:
          "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
        type: "application/x-mpegURL",
        poster: image1,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 1",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 2,
        src:
          "https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8",
        type: "application/x-mpegURL",
        poster: image2,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 2",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 3,
        src: "http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8",
        type: "application/x-mpegURL",
        poster: image3,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 3",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 4,
        src:
          "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
        type: "application/x-mpegURL",
        poster: image4,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 4",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 5,
        src: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
        type: "application/x-mpegURL",
        poster: image5,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 5",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 6,
        src: "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
        type: "application/x-mpegURL",
        poster: image6,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 6",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
      {
        id: 7,
        src:
          "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8",
        type: "application/x-mpegURL",
        poster: image7,
        length: 835,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 7",
        views: 1938,
        likes: 252,
        dislikes: 9,
        live: false,
        premiered: "2021-01-28 12:26:13",
        paid: true,
        price: 0.23,
      },
    ],
    currentVideo: {
      id: 1,
      src:
        "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8",
      type: "application/x-mpegURL",
      poster: image7,
      length: 835,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit 1",
      views: 1938,
      likes: 252,
      dislikes: 9,
      live: false,
      premiered: "2021-01-28 12:26:13",
      paid: true,
      price: 0.23,
    },
    autoplay: false,
    paymentModalVisible: false,
    tempVideo: {},
    paymentMethod: "mastercard",
  };

  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
  }
  handleIncrement = () => {
    this.props.dispatch({ type: INCREMENT_ASYNC, payload: 1 });
  };

  paymentMethodChange = (event) => {
    this.setState({ paymentMethod: event.target.value });
  };

  playVideo = (video) => {
    this.setState({
      currentVideo: video,
      autoplay: true,
    });
    this.scrollToPlayer();
  };

  playTrailer = (video) => {
    console.log(video);
  };

  onSearch = (value) => {
    console.log(value);
  };

  scrollToPlayer = () => this.playerRef.current.scrollIntoView();

  saveLater = (event) => {
    event.stopPropagation();
  };

  paymentModalVisible = (value, video, event) => {
    if (event) event.stopPropagation();
    if (value) this.setState({ paymentModalVisible: value, tempVideo: video });
    else this.setState({ paymentModalVisible: value });
  };

  renderVideos = () => {
    return this.state.videos.map((video) => {
      return (
        <div
          key={video.id}
          onClick={() => this.playVideo(video)}
          className="mb-2 relative cursor-pointer md:w-4/12 w-6/12 lg:min-w-full video_thumbnail">
          <img src={video.poster} alt="" className="min-w-full" />
          <div className="absolute thumbnail_button_container">
            <FaPlayCircle className="text-gray-600 thumbnail_button" />
          </div>
          <div
            onClick={(event) => this.saveLater(event)}
            className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
            <FaClock className="text-white text-base" />
          </div>
          <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40">
            2:23
          </div>

          <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
            <Button
              onClick={(event) => this.paymentModalVisible(true, video, event)}
              className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
              Watch Full Video
            </Button>
            {/* <Button className="ml-1 rounded-2xl text-xs opacity-80">Trailer</Button> */}
          </div>
          {video.paid ? (
            <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
              <FaDollarSign className="text-gray-700 text-xs" /> {video.price}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  renderPaymentModal = () => {
    return (
      <Modal
        className="max-w-xs h-auto px-5 opacity-95"
        centered
        closable={false}
        mask={false}
        footer={null}
        visible={this.state.paymentModalVisible}
        onOk={() => this.paymentModalVisible(false)}
        onCancel={() => this.paymentModalVisible(false)}>
        <div className="absolute -left-8 top-1 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          <FaDollarSign /> {this.state.tempVideo.price}
        </div>
        <h3 className="text-gray-600 uppercase text-center w-full text-lg mb-3">Payment</h3>
        <div>
          <img src={this.state.tempVideo.poster} alt="" />
        </div>
        <Radio.Group
          onChange={this.paymentMethodChange}
          value={this.state.paymentMethod}
          className="w-full flex-col my-2">
          <Radio
            className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
            value="mastercard">
            <img src={mastercard} alt="" className="h-10 ml-1" />
            <span className="ml-1">Mastercard</span>
          </Radio>

          <Radio
            className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
            value="visa">
            <img src={visa} alt="" className="h-10 ml-1" /> <span className="ml-1">Visa</span>
          </Radio>
        </Radio.Group>
        <p className="text-gray-700 text-xs text-center w-full mb-2">
          Notice: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo quas, facilis
        </p>
        <div className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
          Pay <FaDollarSign />
          {this.state.tempVideo.price}
        </div>
      </Modal>
    );
  };

  render = () => {
    const videoJsOptions = {
      autoplay: this.state.autoplay,
      controls: true,
      poster: this.state.currentVideo.poster,
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: this.state.currentVideo.src,
          type: this.state.currentVideo.type,
        },
      ],
    };
    const suffix = <FaSearch className="text-xl text-gray-300" />;
    return (
      <div className="pt-2" ref={this.playerRef}>
        <SideNav></SideNav>
        <div className="flex ml-16 sm:max-w-full lg:max-w-3xl xl:max-w-4xl max-h-12">
          <Search
            placeholder="Search videos here..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={this.onSearch}
          />
        </div>
        <div className="flex ml-16 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
          <VideoPlayer {...videoJsOptions}></VideoPlayer>
        </div>
        <div className="flex-col ml-16 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
          <div className="text-gray-800 text-2xl w-full text-left">
            {this.state.currentVideo.title}
          </div>
          <div className="flex justify-between text-gray-800 text-2xl w-full text-left">
            <div className="flex items-end">
              <span className="text-gray-400 text-lg"> {this.state.currentVideo.views} views</span>
              <span className="text-gray-600 ml-4 text-base">
                {moment(this.state.currentVideo.premiered).format("MMM DD, YYYY")}
              </span>
            </div>
            <div className="flex">
              <Tooltip placement="bottom" title="Like">
                <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg">
                  {this.state.currentVideo.likes} <FaHeart className="ml-1" />
                </span>
              </Tooltip>
              <Tooltip placement="bottom" title="Dislike">
                <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
                  {this.state.currentVideo.dislikes} <FaHeartBroken className="ml-1" />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="flex relative lg:absolute right-0 ml-16  bottom-0 border-2 mt-4 lg:top-0 lg:flex-col lg:ml-0 flex-wrap lg:flex-nowrap lg:w-48 xl:w-3/12 lg:min-h-full">
          {this.renderVideos()}
        </div>
        {this.renderPaymentModal()}
      </div>
    );
  };
}

const mapStateToProps = (props) => {
  return {
    // count: props.counter.count,
  };
};

export default connect(mapStateToProps, null)(WatchVideo);
