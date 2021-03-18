import "./SearchVideo.css";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PaymentModal from "../../components/paymentModal/PaymentModal";
import RenderVideo from "../../components/renderVideo/RenderVideo";
import SideNav from "../../partials/sideNav/SideNav";
import { PURCHASE_VIDEO_ASYNC, VIEWER_VIDEOS_ASYNC } from "../../redux/types";
import RenderSearchVideo from "../../components/renderSearchVideo/RenderSearchVideo";
import empty from "../../assets/images/empty.svg";
const SearchVideo = (props) => {
  let history = useHistory();
  let videoLink = useSelector((state) => state.video.video_link);
  let [tempVideo, setTempVideo] = useState(null);
  let q = history.location.state.q;
  let [paymentModalVisible, setPaymentModalVisible] = useState(false);
  let dispatch = useDispatch();
  let viewerVideos = useSelector((state) => state.video.viewerVideos);
  useEffect(() => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q } });
  }, [q]);
  const playVideo = (video) => {
    history.push(`/watch/${video.id}`);
    // history.go(0);
  };

  const onSearch = (value) => {
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: { q: value } });
  };

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation();
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role != "VIEWER")
      history.push({
        pathname: "/login",
        search: `?return_url=/watch/${video.id}`,
      });
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
    // console.log(`viewerVide`, viewerVideos);
    return viewerVideos.length > 0 ? (
      viewerVideos.map((video) => {
        return (
          <RenderSearchVideo
            key={video.id}
            video={video}
            paymentModalVisible={paymentModalVisibleFunc}
          />
        );
      })
    ) : (
      <div className="m-4 flex flex-col items-center text-2xl text-gray-700">
        <img
          src={empty}
          width={200}
          height={200}
          className="flex "
          alt="No Result"
          srcset=""
        />
        <span className="my-4 p-4 "> No Result Found</span>
        <p>Search again by </p>
        <p></p>
      </div>
    );
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
      <div className="flex flex-col relative mx-4  lg:ml-0 xl:w-3/12 min-h-full w-full lg:min-w-full lg:max-w-full">
        {renderVideos()}
      </div>
      {paymentModalVisible && renderPaymentModal()}
    </div>
  );
};

export default SearchVideo;
