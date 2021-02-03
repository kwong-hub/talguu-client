import { Button, Form, Input, PageHeader } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { FaInfo, FaTag, FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Header from "../../partials/header/Header";
import SideNav from "../../partials/sideNav/SideNav";
import Thumbnail from "./Thumbnail";
import Trailer from "./Trailer";

const EditUploadVideos = (props) => {
  console.log("props", props);
  var history = useHistory()
  const [video, setVideo] = useState(props.location.state);
  const onPersonalFinish = () => {};
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: "16:9",
    responsive: true,
    sources: [
      {
        src: video.videoLink,
        type: "video/av1",
      },
    ],
  };
  return (
    <div className="mx-2 my-20">
      {/* <SideNav /> */}
      <Header />
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Edit Video"
        subTitle="Add extra additional infromation"
        extra={[
          <Button key="1" type="primary">
            Save Changes
          </Button>,
        ]}
      />
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
            onFinish={onPersonalFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              className="text-lg text-gray-600"
              rules={[{ required: true, message: "Please input your Title!" }]}
            >
              <Input
                className="rounded-lg text-gray-700 text-lg p-2"
                placeholder="Title*"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: false, message: "Please input your Description!" },
              ]}
            >
              <TextArea
                className="rounded-lg text-gray-700 text-lg p-2"
                prefix={<FaInfo className="site-form-item-icon" />}
                placeholder="Description*"
              />
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
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
              </h3>
              <Thumbnail video={video.id}  />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Trailer</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a trailer that shows what's in your video in a
                minute. A good trailer draws viewers' attention.
              </h3>
              <Trailer />
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
