import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { FaInfo } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import videoService from "../../_services/video.service";

const StreamForm = () => {
  var history = useHistory();
  const goLive = (values) => {
    // history.push("/live_stream", { ...values });
    // console.log("values", values);
    videoService
      .createStreamKey(values)
      .then((data) => {
        history.push("/live_stream", { data });
      })
      .catch((err) => console.log("err", err));
  };
  return (
    <div>
      <div>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            title: "",
            description: "",
          }}
          onFinish={goLive}>
          <Form.Item
            label="Title"
            name="title"
            className="text-lg text-gray-600"
            rules={[{ required: true, message: "Please input your Title!" }]}>
            <Input className="rounded-md text-gray-700 text-md p-2" placeholder="Title*" />
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
              className="rounded-md text-gray-700 text-md p-2"
              prefix={<FaInfo className="site-form-item-icon" />}
              placeholder="Description*"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className="login-form-button w-full">
              Start Stream
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StreamForm;
