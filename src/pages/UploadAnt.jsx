import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { RiVideoUploadFill } from "react-icons/ri";

import SideNav from "../partials/sideNav/SideNav";

const { Dragger } = Upload;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const props = {
  name: "file",
  multiple: true,
  action: "./",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const UploadAnt = () => {
  const [uploaded, setUploaded] = useState(false);

  const uploadFile = (info) => {
    setUploaded(true);
  };

  return (
    <div class="flex items-center flex-col">
      <SideNav />
      <Dragger className="" {...props} onChange={uploadFile}>
        <div class=" h-64 flex flex-col justify-center items-center container mx-auto px-6 ">
          <p className="text-5xl">
            <RiVideoUploadFill />
          </p>
          <p className="text-xl">Click or drag file to this area to upload</p>
          {/* <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p> */}
        </div>
      </Dragger>

      {uploaded && (
        <Form {...layout} name="basic" initialValues={{ remember: true }}>
          <Form.Item
            label="Title"
            name="title"
            valuePropName="title"
            rules={[{ required: true, message: "Please input your username!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            valuePropName="description"
            rules={[{ required: true, message: "Please input your password!" }]}>
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UploadAnt;
