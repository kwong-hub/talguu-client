import React, { useState } from "react";
import { Upload, Form, Input, Button,  } from "antd";
import { RiVideoUploadFill } from "react-icons/ri";

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
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  // previewFile(file) {
  //   console.log("Your upload file:", file);
  //   // Your process logic. Here we just mock to the same file
  //   return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
  //     method: "POST",
  //     body: file,
  //   })
  //     .then((res) => res.json())
  //     .then(({ thumbnail }) => thumbnail);
  // },
};

const UploadAnt = () => {
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("Some Description");
  const [uploaded, setUploaded] = useState(false);

  const uploadFile = (info) => {
    setTitle(info.file.name);
    setUploaded(true);
   
  };

  return (
    <div class="flex items-center flex-col">
      <Dragger
        className=""
        {...props}
        onChange={uploadFile}
      >
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            valuePropName="description"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
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
