import "./RenderSearchVideo.css";

import { Button, message, Tooltip } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaClock, FaDollarSign, FaPlayCircle, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { SAVE_LATER_ASYNC, SAVE_LATER_RESET, VIEWER_VIDEOS_ASYNC } from "../../redux/types";

function RenderSearchVideo(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  // const [notificationActive, setNotificationActive] = useState(false);
  const saveLaterStatus = useSelector((state) => state.video.saveLaterStatus);

  const user = JSON.parse(localStorage.getItem("user"));

  if (saveLaterStatus === "SUCCESS_ADDED") {
    dispatch({ type: SAVE_LATER_RESET });
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: "" });
    message.success("Saved to watch later.");
    // notification.open({
    //   message: "Saved to watch later.",
    //   icon: <FaCheck className="text-sm text-green-600" />,
    //   duration: 60,
    // });
  } else if (saveLaterStatus === "SUCCESS_REMOVED") {
    dispatch({ type: SAVE_LATER_RESET });
    dispatch({ type: VIEWER_VIDEOS_ASYNC, payload: "" });
    message.info("Removed from watch later.");
    // notification.open({
    //   message: "Removed from watch later",
    //   icon: <FaCheck className="text-sm text-red-600" />,
    // });
  }

  const playVideo = (event) => {
    history.push(`/watch/${props.video.id}`);
    history.go(0);
  };

  const saveLater = (event) => {
    event.stopPropagation();
    if (!localStorage.getItem("user")) history.push("/login");
    dispatch({ type: SAVE_LATER_ASYNC, payload: props.video.id });
  };
  return (
    <div
      onClick={(event) => playVideo(event)}
      className={
        props.for
          ? `flex w-full md:w-11/12 lg:w-full sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`
          : `flex w-full md:w-11/12 lg:w-11/12 sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`
      }>
      <div className="relative m-4">
        <img
          src={props.video.thumbnial}
          alt=""
          className="min-w-full min-h-full video_image-search"
        />
        <div className="absolute thumbnail_button_container">
          <Tooltip placement="bottom" title={props.video.paid ? "" : "Watch Trailer"}>
            <FaPlayCircle className="text-gray-600 thumbnail_button" />
          </Tooltip>
        </div>
        {
          <div
            onClick={(event) => saveLater(event)}
            className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
            <Tooltip
              placement="bottom"
              title={props.video.saveLater ? "Remove Watch Later" : "Add to Watch Later"}>
              {props.video.saveLater ? (
                <FaTrash className="text-white text-base" />
              ) : (
                <FaClock className="text-white text-base" />
              )}
            </Tooltip>
          </div>
        }
        <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
        {props.video.paid
          ? ""
          : (!user || user.role === "VIEWER") && (
              <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
                <Button
                  onClick={(event) => props.paymentModalVisible(true, props.video, event)}
                  className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
                  Watch Full Video
                </Button>
              </div>
            )}
        {!props.video.paid ? (
          <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
            <FaDollarSign className="text-gray-700 text-xs" /> {props.video?.video_price}
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
          {moment(props.video?.video_duration?.split(".")[0], [moment.ISO_8601, "HH:mm:ss"]).format(
            "H:m:ss"
          )}
        </div>
      </div>
      <div className="flex-col px-4 w-full">
        <h4 className="my-2 text-left text-lg text-gray-700 font-medium video_title">
          {props.video.title}
        </h4>
        <div className="flex">
          <span className="flex items-center text-gray-500 cursor-pointer hover:text-blue-400 text-md">
            {props.video.viewCount} views
          </span>
          <span className="flex items-center text-gray-500 cursor-pointer hover:text-blue-400 text-md">
            {" , " + moment(props.video.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
}

RenderSearchVideo.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string,
    thumbnial: PropTypes.string,
    paid: PropTypes.bool,
    video_duration: PropTypes.string,
    viewCount: PropTypes.number,
    title: PropTypes.string,
    currentVideo: PropTypes.bool,
  }),
  paymentModalVisible: PropTypes.func,
};

export default RenderSearchVideo;
