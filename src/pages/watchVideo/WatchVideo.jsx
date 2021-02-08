import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect } from "react-redux";
import { Button, Input, Tooltip, Modal, Radio } from "antd";
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

import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import {
  GET_PAID_VIDEO_URL_ASYNC,
  PURCHASE_VIDEO_ASYNC,
  VIEWER_VIDEOS_ASYNC,
} from "../../redux/types";

const { Search } = Input;

export class WatchVideo extends Component {
  state = {
    videos: [],
    currentVideo: null,
    autoplay: false,
    paymentModalVisible: false,
    tempVideo: {},
    paymentMethod: "mastercard",
  };

  constructor(props) {
    super(props);
    this.playerRef = React.createRef();
    props.dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: "" });
    // console.log(this.props.viewerVideos);
  }

  paymentMethodChange = (event) => {
    this.setState({ paymentMethod: event.target.value });
  };

  playVideo = (video) => {
    this.setState({
      currentVideo: { ...video },
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
    // console.log(video);
    if (video && video.paid) {
      this.props.dispatch({ type: GET_PAID_VIDEO_URL_ASYNC, payload: video.id });
      this.playVideo({ ...video, video_link: this.props.video_link });
      // console.log({ ...video, video_link: this.props.video_link });
    } else {
      if (value) this.setState({ paymentModalVisible: value, tempVideo: video });
      else this.setState({ paymentModalVisible: value });
    }
  };

  purchaseVideo = (id) => {
    this.props.dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id });
    this.playVideo({ ...this.state.tempVideo, video_link: this.props.video_link });
    this.paymentModalVisible(false);
  };

  renderVideos = () => {
    return this.props.viewerVideos.map((video) => {
      return (
        <div
          key={video.id}
          onClick={() => this.playVideo(video)}
          className={`flex-col w-full md:w-4/12 lg:w-3/12 ${
            this.state.currentVideo ? "lg:w-full" : ""
          } sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`}>
          <div className="relative">
            <img src={video.thumbnial} alt="" className="min-w-full" />
            <div className="absolute thumbnail_button_container">
              <FaPlayCircle className="text-gray-600 thumbnail_button" />
            </div>
            <div
              onClick={(event) => this.saveLater(event)}
              className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
              <FaClock className="text-white text-base" />
            </div>
            <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>

            <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
              <Button
                onClick={(event) => this.paymentModalVisible(true, video, event)}
                className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
                Watch Full Video
              </Button>
              {/* <Button className="ml-1 rounded-2xl text-xs opacity-80">Trailer</Button> */}
            </div>
            {!video.paid ? (
              <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
                <FaDollarSign className="text-gray-700 text-xs" /> {0.23}
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
              {moment(video.video_duration.split(".")[0], [moment.ISO_8601, "HH:mm:ss"]).format(
                "H:m:ss"
              )}
            </div>
          </div>
          <div className="flex-col">
            <h4 className="my-2 text-left text-md text-gray-600 video_title">{video.title}</h4>
            <div className="flex">
              <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
                {video.viewVount} views
              </span>
            </div>
          </div>
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
          <FaDollarSign /> {0.23}
        </div>
        <h3 className="text-gray-600 uppercase text-center w-full text-lg mb-3">Payment</h3>
        <div>
          <img src={this.state.tempVideo.thumbnial} alt="" />
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
        <div
          onClick={() => this.purchaseVideo(this.state.tempVideo.id)}
          className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
          Pay <FaDollarSign />
          {0.23}
        </div>
      </Modal>
    );
  };

  renderPlayer() {
    const videoJsOptions = {
      autoplay: this.state.autoplay,
      controls: true,
      thubnail: this.state.currentVideo ? this.state.currentVideo.thumbnial : "",
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: this.state.currentVideo
            ? this.props.video_link
              ? this.state.currentVideo.video_link
              : this.state.currentVideo.trailer
            : "",
          type: "video/mp4",
        },
      ],
    };
    if (this.state.currentVideo) {
      return (
        <>
          <div className="flex ml-2 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <VideoPlayer {...videoJsOptions}></VideoPlayer>
          </div>
          <div className="flex-col ml-2 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <div className="text-gray-800 lg:text-2xl text-md w-full text-left">
              {this.state.currentVideo?.title}
            </div>
            <div className="flex justify-between text-gray-800 text-2xl w-full text-left">
              <div className="flex items-end">
                <span className="text-gray-400 text-lg">
                  {" "}
                  {this.state.currentVideo?.viewCount} views
                </span>
                <span className="text-gray-600 ml-4 text-base">
                  {moment(this.state.currentVideo?.premiered).format("MMM DD, YYYY")}
                </span>
              </div>
              <div className="flex">
                <Tooltip placement="bottom" title="Like">
                  <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg">
                    {this.state.currentVideo?.likeCount} <FaHeart className="ml-1" />
                  </span>
                </Tooltip>
                <Tooltip placement="bottom" title="Dislike">
                  <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
                    {9} <FaHeartBroken className="ml-1" />
                  </span>
                </Tooltip>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  render = () => {
    const suffix = <FaSearch className="text-xl text-gray-300" />;
    return (
      <div className="pt-2 ml-14" ref={this.playerRef}>
        <SideNav></SideNav>
        <div className="flex ml-2 sm:max-w-full lg:max-w-3xl xl:max-w-4xl max-h-12">
          <Search
            placeholder="Search videos here..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={this.onSearch}
          />
        </div>
        {this.renderPlayer()}
        {this.state.currentVideo ? (
          <div className="flex relative lg:absolute right-0  bottom-0 border-2 mt-4 lg:top-0 lg:flex-col lg:ml-0 flex-wrap lg:flex-nowrap xl:w-1/4 lg:w-1/5 lg:min-h-full border-white">
            {this.renderVideos()}
          </div>
        ) : (
          <div className="flex relative right-0  bottom-0 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
            {this.renderVideos()}
          </div>
        )}
        {this.renderPaymentModal()}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    viewerVideos: state.video.viewerVideos,
    video_link: state.video.video_link,
  };
};

export default connect(mapStateToProps, null)(WatchVideo);
