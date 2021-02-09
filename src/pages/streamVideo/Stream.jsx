import { useHistory } from "react-router-dom";
import { Button, Form, Input, message, PageHeader, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { FaCopy, FaInfo, FaTag, FaUser } from "react-icons/fa";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Header from "../../partials/header/Header";
import SideNav from "../../partials/sideNav/SideNav";
import videoService from "../../_services/video.service";
import Thumbnail from "../uploadVideo/Thumbnail";
import { Option } from "antd/lib/mentions";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Stream = (props) => {
  const [property, setProperty] = useState(props.location.state.data);
  // console.log("property", property);
  const [title, setTitle] = useState(property?.title);
  const [describe, setDescribe] = useState(property?.description);
  const [streamKey, setStreamKey] = useState(property?.stream_key);
  const [streamURL, setStreamURL] = useState("rtmp://8mspbb.com/show");
  var history = useHistory();
  const goLive = () => {};
  const copiedMessage = () => {
    message.info("Copied!");
  };
  const endStream = () => {
    videoService
      .endStream(streamKey)
      .then((data) => history.push("/live_video"))
      .catch((err) => console.log("err", err));
    // history.push("/your_video");
  };
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: "16:9",
    responsive: true,
    sources: [
      {
        src: `http://8mspbb.com/hls/${streamKey}.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  };
  return (
    <div>
      <div className="mx-2 my-20 relative">
        {/* <SideNav /> */}
        <Header />
        <PageHeader
          className="site-page-header"
          onBack={() => history.goBack()}
          title="Live"
          subTitle="Add extra additional infromation"
        />
        <Button
          className="absolute top-3 right-2"
          onClick={(e) => endStream()}
          key="1"
          type="danger">
          End Stream
        </Button>
        <div className="flex mx-4">
          <div className="w-2/5 p-4 ">
            <VideoPlayer {...videoJsOptions} />

            <div className="flex flex-col items-start my-4">
              <h2 className="text-lg font-semibold">Stream Setting</h2>
              <div className="flex flex-col items-start my-2">
                <span>Stream Key</span>
                <Input
                  readOnly
                  value={streamKey}
                  suffix={
                    <CopyToClipboard text={streamKey} onCopy={() => copiedMessage()}>
                      <span className="cursor-pointer">
                        <FaCopy />
                      </span>
                    </CopyToClipboard>
                  }
                />
              </div>
              <div className="flex flex-col items-start my-2">
                <span>Stream URL</span>
                <Input
                  readOnly
                  value={streamURL}
                  suffix={
                    <CopyToClipboard text={streamURL} onCopy={() => copiedMessage()}>
                      <span className="cursor-pointer">
                        <FaCopy />
                      </span>
                    </CopyToClipboard>
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-3/5">
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
                title: property?.title,
                description: property?.description,
                select: property?.privacy,
              }}
              onFinish={goLive}>
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
                rules={[
                  {
                    required: false,
                    message: "Please input your Description!",
                  },
                ]}>
                <TextArea
                  value={describe}
                  onChange={(e) => setDescribe(e.target.value)}
                  className="rounded-lg text-gray-700 text-lg p-2"
                  prefix={<FaInfo className="site-form-item-icon" />}
                  placeholder="Description*"
                />
              </Form.Item>
              <Form.Item
                className="w-64 flex"
                name="select"
                label="Select Privacy"
                hasFeedback
                rules={[{ required: true, message: "Please select your Privacy!" }]}>
                <Select
                  placeholder="Select audience"
                  className="rounded-lg w-20 text-gray-700 text-base p-2">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>

              {/* <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                className="login-form-button w-full"
              >
                Next
              </Button>
            </Form.Item> */}
            </Form>

            <div>
              <div className="flex flex-col items-start justify-start">
                <h2 className="text-lg">Thumbnail</h2>
                <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                  Select or upload a picture that shows what's in your video. A good thumbnail
                  stands out and draws viewers' attention.
                </h3>
                {/* <Thumbnail video={video.id} thumbnails={video.thumbnial} /> */}
              </div>
            </div>
          </div>

          <div className="w-1/5 flex flex-col items-center">
            <h2 className="font-semibold text-base">Stream Analytics</h2>
            <div>
              <div className="rounded-lg w-32 p-4 m-2 shadow-lg bg-white ">
                <b>0</b>
                <p>Current Views </p>
              </div>
              <div className="rounded-lg w-32 p-4 m-2 shadow-lg bg-white ">
                <b>0</b>
                <p>Current Likes </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stream;
