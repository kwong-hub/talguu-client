import React, { useEffect, useState } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import "./Videos.css";
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from "../../redux/types";
import { useHistory, useParams } from "react-router-dom";
import RenderVideo from "../../components/renderVideo/RenderVideo";
import PaymentModal from "../../components/paymentModal/PaymentModal";

const { Search } = Input;

const Videos = (props) => {
  let history = useHistory();
  let videoLink = useSelector((state) => state.video.video_link);
  let [tempVideo, setTempVideo] = useState(null);
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let { q } = useParams();
  let dispatch = useDispatch();
  // let currentVideo = useSelector((state) => state.video.currentVideo);
  let viewerVideos = useSelector((state) => state.video.viewerVideos);

  useEffect(() => {
    // console.log("getting videos values");
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } });
  }, []);

  // dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } });

  const playVideo = (video) => {
    history.push(`/watch/${video.id}`);
    history.go(0);
  };

  const playTrailer = (video) => {
    // console.log(video);
  };

  const onSearch = (value) => {
    // console.log(value);
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: value } });
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

  return (
    <div className="pt-2 sm:ml-14 mt-20">
      <SideNav onSearch={onSearch}></SideNav>
      <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
      {renderPaymentModal()}
    </div>
  );
};

export default Videos;
