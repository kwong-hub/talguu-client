import React, { Component, useEffect, useState } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button, Input, Tooltip, Modal, Radio } from "antd";
import { FaPlayCircle, FaSearch, FaClock, FaDollarSign } from "react-icons/fa";
import "./Videos.css";
import moment from "moment";

import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from "../../redux/types";
import { Link, useHistory, useParams, withRouter } from "react-router-dom";
import RenderVideo from "../../components/renderVideo/RenderVideo";
import PaymentModal from "../../components/paymentModal/PaymentModal";

const { Search } = Input;

const Videos = (props) => {
  let history = useHistory();
  // let [paymentMethod, setPaymentMethod] = useState("mastercard");
  // let [playVideo, setPlayVideo] = useState(false);
  let videoLink = useSelector((state) => state.video.video_link);
  let [tempVideo, setTempVideo] = useState(null);
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let { vidId } = useParams();
  let dispatch = useDispatch();
  let currentVideo = useSelector((state) => state.video.currentVideo);
  let viewerVideos = useSelector((state) => state.video.viewerVideos);
  // state = {
  //   videos: [],
  //   currentVideo: null,
  //   autoplay: false,
  //   paymentModalVisible: false,
  //   tempVideo: {},
  //   paymentMethod: "mastercard",
  // };

  useEffect(() => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: "" });
  }, []);

  // const paymentMethodChange = (event) => {
  //   setState({ paymentMethod: event.target.value });
  // };

  const playVideo = (video) => {
    history.push(`/watch/${video.id}`);
    history.go(0);
  };

  const playTrailer = (video) => {
    // console.log(video);
  };

  const onSearch = (value) => {
    // console.log(value);
  };

  // const scrollToPlayer = () => playerRef.current.scrollIntoView();

  const saveLater = (event) => {
    event.stopPropagation();
  };

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation();
    if (!localStorage.getItem("user")) history.push("/login");
    if (video && video.paid) {
      history.push(`/watch/${video.id}`);
    } else {
      if (value) {
        setPaymentModalVisible(value);
        setTempVideo(video);
      } else setPaymentModalVisible(value);
    }
  };

  const purchaseVideo = (id) => {
    dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id });
    playVideo({ ...tempVideo, video_link: videoLink });
    paymentModalVisibleFunc(false);
  };

  const renderVideos = () => {
    return viewerVideos.map((video) => {
      return (
        <RenderVideo key={video.id} video={video} paymentModalVisible={paymentModalVisibleFunc} />
      );
    });
  };

  const renderPaymentModal = () => {
    return (
      <PaymentModal
        paymentModalVisible={paymentModalVisible}
        paymentModalVisibleFunc={paymentModalVisibleFunc}
        video={tempVideo}
        purchaseVideo={purchaseVideo}
      />
    );
  };

  const suffix = <FaSearch className="text-xl text-gray-300" />;
  return (
    <div className="pt-2 ml-14">
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
          onSearch={onSearch}
        />
      </div>
      <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
      {renderPaymentModal()}
    </div>
  );
};

export default Videos;
