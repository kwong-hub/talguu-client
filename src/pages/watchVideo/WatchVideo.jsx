import React, { Component, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  GET_PAID_VIDEO_URL_ASYNC,
  PURCHASE_VIDEO_ASYNC,
  VIEWER_VIDEOS_ASYNC,
} from "../../redux/types";
import { Button, Input, Tooltip, Modal, Radio, Space, Spin } from "antd";
import {
  FaClock,
  FaDollarSign,
  FaHeart,
  FaHeartBroken,
  FaPlayCircle,
  FaSearch,
} from "react-icons/fa";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import SideNav from "../../partials/sideNav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import mastercard from "../../assets/images/mastercard.png";
import visa from "../../assets/images/visa.png";

const { Search } = Input;

const WatchVideo = () => {
  let history = useHistory();
  let [paymentMethod, setPaymentMethod] = useState("mastercard");
  let [playVideo, setPlayVideo] = useState(false);
  let videoLink = useSelector((state) => state.video.video_link);
  let [tempVideo, setTempVideo] = useState(null);
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let { vidId } = useParams();
  let dispatch = useDispatch();
  let currentVideo = useSelector((state) => state.video.currentVideo);
  let viewerVideos = useSelector((state) => state.video.viewerVideos);

  useEffect(() => {
    if (vidId) {
      dispatch({ type: GET_PAID_VIDEO_URL_ASYNC, payload: vidId });
      dispatch({ type: VIEWER_VIDEOS_ASYNC });
      window.scrollTo(0, 0);
    }
    return () => {};
  }, [vidId]);

  useEffect(() => {
    setPlayVideo(true);
    return () => {};
  }, [currentVideo]);

  const play = (video) => {
    history.push(`/watch/${video.id}`);
    history.go(0);
  };

  //   useEffect(() => {
  //     if (videoLink) {

  //     }
  //   }, [videoLink]);

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation();
    if (!localStorage.getItem("user")) history.push("/login");
    else {
      if (video && video.paid) {
        history.push(`/watch/${video.id}`);
        history.go(0);
      } else {
        if (value) {
          setTempVideo(video);
          setPaymentModalVisible(value);
        } else setPaymentModalVisible(value);
      }
    }
  };

  const purchaseVideo = (id) => {
    dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id });
    paymentModalVisibleFunc(false);
    play(tempVideo);
  };

  const paymentMethodChange = () => {};

  const renderPaymentModal = () => {
    return (
      <Modal
        className="max-w-xs h-auto px-5 opacity-95"
        centered
        closable={false}
        mask={false}
        footer={null}
        visible={paymentModalVisible}
        onOk={() => paymentModalVisibleFunc(false)}
        onCancel={() => paymentModalVisibleFunc(false)}>
        <div className="absolute -left-8 top-1 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          <FaDollarSign /> {0.23}
        </div>
        <h3 className="text-gray-600 uppercase text-center w-full text-lg mb-3">Payment</h3>
        <div>
          <img src={tempVideo?.thumbnial} alt="" />
        </div>
        <Radio.Group
          onChange={paymentMethodChange}
          value={paymentMethod}
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
          onClick={() => purchaseVideo(tempVideo.id)}
          className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
          Pay <FaDollarSign />
          {0.23}
        </div>
      </Modal>
    );
  };

  const renderPlayer = (video) => {
    // console.log(video);
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      poster: video?.thumbnial,
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: video ? (video.paid ? video.video_link : video.trailer) : "",
          type: video.video_type,
        },
      ],
    };
    if (video) {
      return (
        <>
          <div className="flex ml-2 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <VideoPlayer {...videoJsOptions}></VideoPlayer>
          </div>
          <div className="flex-col ml-2 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <div className="w-full flex justify-between">
              <div className="text-gray-800 lg:text-2xl text-md  text-left">{video?.title}</div>
              {video.paid ? (
                ""
              ) : (
                <div className="py-0">
                  <Button
                    type="primary"
                    onClick={(event) => paymentModalVisibleFunc(true, video, event)}
                    className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
                    Watch Full Video
                  </Button>
                </div>
              )}
            </div>
            <div className="flex justify-between text-gray-800 text-2xl w-full text-left">
              <div className="flex items-end">
                <span className="text-gray-400 text-lg"> {video?.viewVount} views</span>
                <span className="text-gray-600 ml-4 text-base">
                  {moment(video?.premiered).format("MMM DD, YYYY")}
                </span>
              </div>
              <div className="flex">
                <Tooltip placement="bottom" title="Like">
                  <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg">
                    {video?.likeCount} <FaHeart className="ml-1" />
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
  };

  const onSearch = (value) => {
    // console.log(value);
  };

  const renderVideos = () => {
    if (viewerVideos) {
      return viewerVideos.map((video) => {
        return (
          <div
            key={video.id}
            onClick={() => play(video)}
            className={`flex-col w-full md:w-4/12 lg:w-full sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`}>
            <div className="relative">
              <img src={video.thumbnial} alt="" className="min-w-full min-h-full" />
              <div className="absolute thumbnail_button_container">
                <Tooltip placement="bottom" title={video.paid ? "" : "Watch Trailer"}>
                  <FaPlayCircle className="text-gray-600 thumbnail_button" />
                </Tooltip>
              </div>
              <div
                onClick={(event) => this.saveLater(event)}
                className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
                <FaClock className="text-white text-base" />
              </div>
              <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
              {video.paid ? (
                ""
              ) : (
                <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
                  <Button
                    onClick={(event) => paymentModalVisibleFunc(true, video, event)}
                    className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
                    Watch Full Video
                  </Button>
                </div>
              )}
              {!video.paid ? (
                <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
                  <FaDollarSign className="text-gray-700 text-xs" /> {0.23}
                </div>
              ) : (
                ""
              )}
              <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
                {moment(video?.video_duration?.split(".")[0], [moment.ISO_8601, "HH:mm:ss"]).format(
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
    }
  };

  const suffix = <FaSearch className="text-xl text-gray-300" />;
  return (
    <>
      <SideNav></SideNav>
      <div>
        <div className="pt-2 ml-14">
          <SideNav></SideNav>
          <div className="flex ml-2 sm:max-w-full lg:max-w-3xl xl:max-w-4xl max-h-12">
            <Search
              placeholder="Search videos here..."
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={() => onSearch()}
            />
          </div>
          {playVideo && currentVideo ? (
            renderPlayer(currentVideo)
          ) : (
            <div>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          )}
          <div className="flex relative lg:absolute right-0  bottom-0 border-2 mt-4 lg:top-0 lg:flex-col lg:ml-0 flex-wrap lg:flex-nowrap xl:w-1/4 lg:w-1/5 lg:min-h-full border-white">
            {renderVideos()}
          </div>
        </div>
        {renderPaymentModal()}
      </div>
    </>
  );
};

export default WatchVideo;
