import { Button, Menu, Modal } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import React, { Component, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { RiCamera2Fill, RiLiveFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import Header from "../../partials/header/Header";
import StreamForm from "./StreamForm";

const StreamVideo = () => {
  const [modalVisible, setmodalVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  var history = useHistory();
  const handleClick = (e) => {
    console.log("click ", e);
  };
  const startStream = () => {
    // history.push("/live_stream")
    setmodalVisible(false);
    setFormVisible(true);
  };
  return (
    <div>
      <div>
        <Header></Header>
        <div className="mx-8 my-20">
          <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <Menu.Item
              className="flex items-center justify-start text-lg"
              onClick={() => setmodalVisible(true)}
              key="1"
              icon={<RiCamera2Fill />}
            >
              Stream
            </Menu.Item>
            <Menu.Item
              className="flex items-center justify-start text-lg"
              key="2"
              icon={<RiLiveFill />}
            >
              Webcam live
            </Menu.Item>
          </Menu>

          <Modal
            title="Stream live"
            centered
            visible={modalVisible}
            okText="Back"
            onOk={() => setmodalVisible(false)}
            onCancel={() => setmodalVisible(false)}
          >
            <div className="bg-white p-4 shadow-lg">
              <div className="">
                <h2 className="text-xl py-2 font-bold">Stream form Software</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <Button
                  onClick={(e) => startStream()}
                  type="primary float-right right rounded-full px-6 my-4 "
                >
                  Start Streaming
                </Button>
              </div>
            </div>
          </Modal>
          <Modal
            title="Stream live"
            centered
            visible={formVisible}
            onOk={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}
          >
            <div className="bg-white p-4 shadow-lg">
              <StreamForm />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default StreamVideo;
