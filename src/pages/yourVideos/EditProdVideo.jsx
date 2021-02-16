import { Button, Form, Input, PageHeader } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { FaDollarSign, FaInfo, FaTag, FaUser } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Thumbnail from "../../components/videos/Thumbnail";
import Trailer from "../../components/videos/Trailer";
import Header from "../../partials/header/Header";
import SideNav from "../../partials/sideNav/SideNav";
import videoService from "../../_services/video.service";
// import Thumbnail from "./Thumbnail";
// import Trailer from "./Trailer";

const EditProdVideo = (props) => {
  var history = useHistory();
  let { vidId } = useParams();
  const [video, setVideo] = useState(props.location.state);
  const [title, setTitle] = useState(video?.title);
  const [describe, setDescribe] = useState(video?.describe);
  const [price, setPrice] = useState(0.23);

  useEffect(() => {
    if (vidId) {
      getVideoById(vidId);
      window.scrollTo(0, 0);
    }
    return () => {};
  }, []);

  const getVideoById = (id) => {
    videoService
      .getProdVideoById(id)
      .then((data) => {
        setVideo(data);
        setTitle(data.title);
        setDescribe(data.describe);
        setPrice(data.video_price);
      })
      .catch((err) => console.log("err", err));
  };

  const editVideo = () => {
    // console.log("title,describe", title, describe);

    videoService
      .updateVideo({
        id: video.id,
        title: title,
        describe: describe,
        video_price: price,
      })
      .then((data) => {
        if (data[0]) {
          history.push("/your_video");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: "16:9",
    responsive: true,
    sources: [
      {
        src: video?.video_link,
        type: video?.video_type,
      },
    ],
  };
  return (
    <div className="ml-16 mt-16 relative">
      <SideNav />
      {/* <Header /> */}
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Edit Video"
        subTitle="Add extra additional infromation"
      />
      <Button
        className="absolute top-3 right-2"
        onClick={editVideo}
        key="1"
        type="primary"
      >
        Save Changes
      </Button>
      <div className="flex mx-4">
        <div className="w-full">
          <div className="my-4">
            <span className="flex text-lg text-gray-600">Title</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2"
              placeholder="Title*"
            />
          </div>

          <div className="my-4">
            <span className="flex text-lg text-gray-600">Description</span>
            <TextArea
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2   "
              prefix={<FaInfo className="site-form-item-icon" />}
              placeholder="Description*"
            />
          </div>

          <div className="my-4">
            <span className="flex text-lg text-gray-600">Price</span>

            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2"
              prefix={<FaDollarSign className="site-form-item-icon" />}
              placeholder="0.23"
            />
          </div>

          <div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Change Thumbnail</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
              </h3>
              <Thumbnail video={video?.id} thumbnails={video?.thumbnial} />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Change Trailer</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a trailer that shows what's in your video in a
                minute. A good trailer draws viewers' attention.
              </h3>
              <Trailer video={video?.id} />
            </div>
          </div>
        </div>
        <div className="w-3/4 p-4 ">
          <VideoPlayer {...videoJsOptions} />

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default EditProdVideo;
