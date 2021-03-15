import { Button, Form, Input, PageHeader } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { FaDollarSign, FaInfo } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import videoService from "../../_services/video.service";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Thumbnail from "../../components/videos/Thumbnail";
import Trailer from "../../components/videos/Trailer";
import SideNav from "../../partials/sideNav/SideNav";

const EditUploadVideos = (props) => {
  var history = useHistory();
  const [video, setVideo] = useState(props.location.state);
  const [title, setTitle] = useState(video?.title);
  const [describe, setDescribe] = useState(video?.describe);
  const [price, setPrice] = useState(0.23);

  if (!title) {
    history.goBack();
  }

  const publishVideo = () => {
    videoService
      .updateVideo({ id: video.id, title: title, describe: describe, video_price: price })
      .then((data) => {
        if (data[0]) {
          history.push("/your_video");
        }
      })
      .catch((err) => {
        // console.log("err", err);
      });
  };
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: "16:9",
    responsive: true,
    sources: [
      {
        src: video.video_link,
        type: video.video_type,
      },
    ],
  };
  return (
    <div className="ml-16 mt-20 relative">
      <SideNav />
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Edit Video"
        subTitle="Add extra additional infromation"
      />
      <Button className="absolute top-3 right-2" onClick={publishVideo} key="1" type="primary">
        Publish Changes
      </Button>
      <div className="flex mx-4">
        <div className="w-full">
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
              title: video.title,
              description: video.describe,
            }}
            onFinish={publishVideo}>
            <Form.Item
              label="Title"
              name="title"
              className="text-lg text-gray-600"
              rules={[{ required: true, message: "Please input your Title!" }]}>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg text-gray-700 text-lg p-2"
                placeholder="Title*"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: false, message: "Please input your Description!" }]}>
              <TextArea
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
                className="rounded-lg text-gray-700 text-lg p-2"
                prefix={<FaInfo className="site-form-item-icon" />}
                placeholder="Description*"
              />
            </Form.Item>
            <Form.Item
              label="Video Price"
              name="price"
              className="w-full items-start"
              help="Add this videos cost, make sure your price value this video."
              rules={[{ required: false, message: "Please input your price!" }]}>
              <Input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-lg text-gray-700 text-lg p-2"
                prefix={<FaDollarSign className="site-form-item-icon" />}
                placeholder="0.23"
              />
            </Form.Item>
          </Form>
          <div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Thumbnail</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a picture that shows what's in your video. A good thumbnail stands
                out and draws viewers' attention.
              </h3>
              <Thumbnail videoId={video.id} thumbnails={video.thumbnial} />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Trailer</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a trailer that shows what's in your video in a minute. A good
                trailer draws viewers' attention.
              </h3>
              <Trailer videoId={video.id} />
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

export default EditUploadVideos;
