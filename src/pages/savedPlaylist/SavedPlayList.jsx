import "./SavedPlaylist.css";

import { Input, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { FaPlayCircle, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import SideNav from "../../partials/sideNav/SideNav";
import { GET_SAVED_VIDEOS_ASYNC } from "../../redux/types";

const { Search } = Input;

const SavedPlayList = () => {
  const savedVideos = useSelector((state) => state.video.savedVideos);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch({ type: GET_SAVED_VIDEOS_ASYNC, payload: "" });
    return () => {};
  }, []);

  const play = (video) => {
    history.push(`/watch/${video.id}`);
    // history.go(0);
  };

  const onSearch = (value) => {};

  const renderVideos = () => {
    if (savedVideos && savedVideos.length) {
      return savedVideos.map((video) => {
        return (
          <div
            key={video.id}
            onClick={() => play(video)}
            className={`flex-col w-full md:w-4/12 lg:w-3/12 sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`}
          >
            <div className="relative">
              <img
                src={video.thumbnial}
                alt=""
                className="min-w-full min-h-full video_image"
              />
              <div className="absolute thumbnail_button_container">
                <Tooltip placement="bottom" title="Watch Video">
                  <FaPlayCircle className="text-gray-600 thumbnail_button" />
                </Tooltip>
              </div>
              {/* <div
                onClick={(event) => this.saveLater(event)}
                className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
                <FaClock className="text-white text-base" />
              </div> */}
              <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
              <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
                {moment(video?.video_duration?.split(".")[0], [
                  moment.ISO_8601,
                  "HH:mm:ss",
                ]).format("H:m:ss")}
              </div>
            </div>
            <div className="flex-col">
              <h4 className="my-2 text-left text-md text-gray-600 video_title">
                {video.title}
              </h4>
              <div className="flex">
                <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
                  {video.viewVount} views
                </span>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div
          className={`flex justify-center items-center w-full p-2 cursor-pointer video_thumbnail self-stretch`}
        >
          <p className="text-gray-600 text-md py-4 w-96">
            You don't have saved videos. You can save a video you like so you
            can access it later easily!
          </p>
        </div>
      );
    }
  };

  const suffix = <FaSearch className="text-xl text-gray-300" />;
  return (
    <div className="pt-2 ml-0 sm:ml-14">
      <SideNav></SideNav>
      <div className="flex relative mt-20 border-2 flex-wrap min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        {renderVideos()}
      </div>
    </div>
  );
};

export default SavedPlayList;
