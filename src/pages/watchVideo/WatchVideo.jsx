import { Button, Space, Spin, Tooltip, Comment, Avatar, Form, List, notification } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import PaymentModal from "../../components/paymentModal/PaymentModal";
import RenderVideo from "../../components/renderVideo/RenderVideo";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import SideNav from "../../partials/sideNav/SideNav";
import {
  GET_PAID_VIDEO_URL_ASYNC,
  GET_PAID_VIDEO_URL_SUCCESS,
  PURCHASE_VIDEO_ASYNC,
  VIEWER_VIDEOS_ASYNC,
} from "../../redux/types";
import videoService from "../../_services/video.service";
import TextArea from "antd/lib/input/TextArea";
import { BiEditAlt } from "react-icons/bi";

const WatchVideo = () => {
  let history = useHistory();
  let [playVideo, setPlayVideo] = useState(false);
  let [newComment, setComment] = useState("");
  const [showMessages, setShowMessages] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    // console.log(video_link);
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

  if (errorMessage === "NO_BALANCE" || errorMessage === "NOT_ENOUGH_BALANCE") {
    history.push("/deposit");
  }

  const toggleMessages = (e) => {
    e.stopPropagation();
    setShowMessages(!showMessages);
  };

  const play = (video) => {
    history.push(`/watch/${video.id}`);
    // history.go(0);
  };

  const paymentModalVisibleFunc = (value, video, event) => {
    if (event) event.stopPropagation();

    if (!user || user.role != "VIEWER")
      history.push({
        pathname: "/login",
        search: `?return_url=/watch/${video.id}`,
      });
    else {
      if (video && video.paid) {
        history.push(`/watch/${video.id}`);
        // history.go(0);
      } else {
        if (value) {
          setTempVideo(video);
          setPaymentModalVisible(value);
        } else setPaymentModalVisible(value);
      }
    }
  };

  const renderComment = (video) => (
    <div className="flex">
      <Form.Item className="flex-1 mr-2">
        <TextArea rows={1} onChange={(e) => setComment(e.target.value)} value={newComment} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={(e) => submitComment(e, video)}
          type="text">
          Add Comment
        </Button>
      </Form.Item>
    </div>
  );

  const renderComments = (comments) => {
    return (
      <div className="flex-col w-full justify-start">
        {comments?.map((cm) => {
          return (
            <Comment
              key={cm?.id}
              className="w-full flex justify-start"
              author={<a>Anonymous</a>}
              avatar={
                <Avatar
                  src="https://robohash.org/reminventoreveniam.png?size=50x50&set=set1"
                  alt="Anonymous"
                />
              }
              content={<p>{cm.message}</p>}
            />
          );
        })}
      </div>
    );
  };

  const purchaseVideo = (id) => {
    dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id });
    currentVideo.paid = true;
  };

  const likeDislikeVideo = (e, video, val) => {
    e.stopPropagation();
    val = video.val == val ? 2 : val;
    videoService
      .likeDislikeVideo({ videoId: video.id, like: val })
      .then((res) => {
        if (res.data && res.data.success) {
          dispatch({ type: GET_PAID_VIDEO_URL_SUCCESS, payload: res.data.video });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const submitComment = (e, video) => {
    e.stopPropagation();
    if (!newComment) return;
    setSubmitting(true);
    videoService
      .addComment({ message: newComment, videoId: video.id })
      .then((res) => {
        if (res) {
          notification.info({
            message: "Message submitted",
            placement: "bottomRight",
            duration: 3.3,
          });
          setComment("");
        } else {
          notification.error({
            message: "Error occurred",
            placement: "bottomRight",
            duration: 3.3,
          });
          setSubmitting(false);
        }
      })
      .catch((err) => setSubmitting(false));
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
    // console.log(video);

    const videoJsOptions = {
      videoId: video.id,
      autoplay: true,
      controls: true,
      poster: video?.thumbnial,
      aspectRatio: "16:9",
      responsive: true,
      sources: [
        {
          src: video ? (video.paid ? video.video_link : video.trailer) : "",
          type: video.video_type,
          // src: "http://8mspbb.com/hls/1614928651645video.mp4.m3u8",
          // src: "https://talguu-vout1.s3.us-west-2.amazonaws.com/test8/master.m3u8",
          // type: "application/x-mpegURL",
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
                <span className="text-gray-400 text-lg"> {video?.viewCount} views</span>
                <span className="text-gray-600 ml-4 text-base">
                  {moment(video?.premiered).format("MMM DD, YYYY")}
                </span>
              </div>
              <div className="flex">
                <Tooltip
                  onClick={(e) => {
                    likeDislikeVideo(e, video, 1);
                  }}
                  placement="bottom"
                  title="Like">
                  <div
                    className={`flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ${
                      video.like == 1 ? "text-blue-400" : ""
                    }`}>
                    {video?.likeCount} <FaHeart className="ml-1" />
                  </div>
                </Tooltip>
                <Tooltip
                  onClick={(e) => {
                    likeDislikeVideo(e, video, 0);
                  }}
                  placement="bottom"
                  title="Dislike">
                  <span
                    className={`flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2 ${
                      video.like == 0 ? "text-blue-400" : ""
                    }`}>
                    {video.dislikeCount} <FaHeartBroken className="ml-1" />
                  </span>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer rounded-xl shadow-sm border-gray-100 border-2 p-1">
              <span
                onClick={(e) => {
                  toggleMessages(e);
                }}
                className="flex items-center self-center text-md my-2">
                {showMessages ? (
                  <>
                    Hide Messages <AiOutlineUpCircle className="ml-2" />
                  </>
                ) : (
                  <>
                    Show Messages <AiOutlineDownCircle className=" ml-2" />
                  </>
                )}
              </span>
              {showMessages && renderComments(video.comments)}
              <div className="w-full flex justify-between items-end">
                <Comment
                  className="w-full"
                  avatar={
                    <Avatar
                      src="https://robohash.org/reminventoreveniam.png?size=50x50&set=set1"
                      alt="Han Solo"
                    />
                  }
                  content={renderComment(video)}
                />
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

  // console.log(editComment, comment);
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
