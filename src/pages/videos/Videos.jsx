import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect } from "react-redux";
import { Button, Input, Tooltip, Modal, Radio } from "antd";
import { FaPlayCircle, FaSearch, FaClock, FaDollarSign } from "react-icons/fa";
import "./Videos.css";
import moment from "moment";

import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from "../../redux/types";
import { Link, withRouter } from "react-router-dom";
import RenderVideo from "../../components/renderVideo/RenderVideo";

const { Search } = Input;

export class Videos extends Component {
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
    // console.log(this.props.viewerVideos);
  }

  componentDidMount() {
    this.props.dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: "" });
  }

  paymentMethodChange = (event) => {
    this.setState({ paymentMethod: event.target.value });
  };

  playVideo = (video) => {
    this.props.history.push(`/watch/${video.id}`);
    this.props.history.go(0);
  };

  playTrailer = (video) => {
    // console.log(video);
  };

  onSearch = (value) => {
    // console.log(value);
  };

  scrollToPlayer = () => this.playerRef.current.scrollIntoView();

  saveLater = (event) => {
    event.stopPropagation();
  };

  paymentModalVisible = (value, video, event) => {
    if (event) event.stopPropagation();
    if (!localStorage.getItem("user")) this.props.history.push("/login");
    if (video && video.paid) {
      this.props.history.push(`/watch/${video.id}`);
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
        <RenderVideo key={video.id} video={video} paymentModalVisible={this.paymentModalVisible} />
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

  render = () => {
    const suffix = <FaSearch className="text-xl text-gray-300" />;
    return (
      <div className="pt-2 ml-14" ref={this.playerRef}>
        <SideNav></SideNav>
        <div className="flex ml-2 sm:max-w-full lg:max-w-3xl xl:max-w-4xl max-h-12 pt-4">
          <div className="text-2xl mr-4 flex items-center justify-center header_title text-gray-500">
            <Link to="/" className="flex items-center">
              TALGUU
            </Link>
          </div>
          <Search
            placeholder="Search videos here..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={this.onSearch}
          />
        </div>
        <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
          {this.renderVideos()}
        </div>
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

export default connect(mapStateToProps, null)(withRouter(Videos));
