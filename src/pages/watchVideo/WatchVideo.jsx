import { Button, Space, Spin, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PaymentModal from "../../components/paymentModal/PaymentModal";
import RenderVideo from "../../components/renderVideo/RenderVideo";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import SideNav from "../../partials/sideNav/SideNav";
import {
  GET_PAID_VIDEO_URL_ASYNC,
  PURCHASE_VIDEO_ASYNC,
  VIEWER_VIDEOS_ASYNC,
} from "../../redux/types";

const WatchVideo = () => {
  let history = useHistory();
  let [playVideo, setPlayVideo] = useState(false);
  let [tempVideo, setTempVideo] = useState(null);
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let { vidId } = useParams();
  let dispatch = useDispatch();
  let currentVideo = useSelector((state) => state.video.currentVideo);
  let viewerVideos = useSelector((state) => state.video.viewerVideos);
  const video_link = useSelector((state) => state.video.video_link);
  const errorMessage = useSelector((state) => state.video.errMessages);

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (vidId) {
      dispatch({ type: GET_PAID_VIDEO_URL_ASYNC, payload: vidId });
      dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: "" } });
      window.scrollTo(0, 0);
    }
    return () => {};
  }, [vidId]);

  useEffect(() => {
    console.log(video_link);
    if (video_link) {
      paymentModalVisibleFunc(false);
      play(tempVideo);
    }
    return () => {};
  }, [video_link]);

  useEffect(() => {
    setPlayVideo(true);
    return () => {};
  }, [currentVideo]);
  console.log("errorMessage", errorMessage);

  if (errorMessage === "NO_BALANCE" || errorMessage === "NOT_ENOUGH_BALANCE") {
    history.push("/deposit");
  }

  const play = (video) => {
    history.push(`/watch/${video.id}`);
    history.go(0);
  };

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation();

    if (!user || user.role != "VIEWER")
      history.push({ pathname: "/login", search: `?return_url=/watch/${video.id}` });
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

  const renderPlayer = (video) => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      poster: video?.thumbnial,
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: video ? (video.paid ? video.video_link : video.trailer) : "",
          // type: video.video_type,
          // src: "http://8mspbb.com/hls/1614928651645video.mp4.m3u8",
          // src: "https://talguu-vout.s3.us-west-2.amazonaws.com/test5/master.m3u8",
          type: "application/x-mpegURL",
        },
      ],
    };
    if (video) {
      return (
        <div className="">
          <div className="flex ml-2 sm:max-w-full lg:max-w-3xl xl:max-w-4xl -z-10">
            <VideoPlayer {...videoJsOptions}></VideoPlayer>
          </div>
          <div className="flex-col ml-2 mt-4 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <div className="w-full flex justify-between">
              <div className="text-gray-800 lg:text-2xl text-md  text-left">{video?.title}</div>
              {video.paid || (user && user.role != "VIEWER") ? (
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
        </div>
      );
    }
  };

  const onSearch = (value) => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: value } });
  };

  const renderVideos = () => {
    if (viewerVideos) {
      return viewerVideos.map((video) => {
        return (
          <RenderVideo
            for="watch_video"
            key={video.id}
            video={video}
            paymentModalVisible={paymentModalVisibleFunc}
          />
        );
      });
    }
  };

  return (
    <>
      <SideNav onSearch={onSearch}></SideNav>
      <div>
        <div className="pt-2 ml-14 mt-20">
          {playVideo && currentVideo ? (
            renderPlayer(currentVideo)
          ) : (
            <div className="w-screen h-screen flex justify-center items-center -mt-20 -ml-12 lg:-mt-24 lg:-ml-48  xl:-mt-20 xl:-ml-52">
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          )}
          <div className="flex relative lg:absolute right-0  bottom-0 border-2 mt-20 lg:top-0 lg:flex-col lg:ml-0 flex-wrap lg:flex-nowrap xl:w-1/4 lg:w-1/5 lg:min-h-full border-white">
            {renderVideos()}
          </div>
        </div>
        {paymentModalVisible && renderPaymentModal()}
      </div>
    </>
  );
};

export default WatchVideo;
