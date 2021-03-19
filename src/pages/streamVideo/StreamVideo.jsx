import { Menu, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { RiCamera2Fill, RiLiveFill } from 'react-icons/ri'
import { useHistory } from 'react-router'

import SideNav from '../../partials/sideNav/SideNav'
import videoService from '../../_services/video.service'
import StreamForm from './StreamForm'

const StreamVideo = () => {
  const history = useHistory()
  const [modalVisible, setmodalVisible] = useState(true)
  const [formVisible, setFormVisible] = useState(false)
  const handleClick = (e) => {}
  const startStream = () => {
    setmodalVisible(false)
    setFormVisible(true)
  }
  useEffect(() => {
    // getStreamed();
    return () => {}
  }, [])
  const getStreamed = () => {
    videoService.getStreamed().then((data) => {
      history.push('/live_stream', { data })
    })
  }
  return (
    <div>
      <div>
        <SideNav></SideNav>
        <div className="mx-8 ml-14 mt-20">
          <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline">
            <Menu.Item
              className="flex items-center justify-start text-lg"
              onClick={() => setmodalVisible(true)}
              key="1"
              icon={<RiCamera2Fill />}>
              Stream
            </Menu.Item>
            <Menu.Item
              className="flex items-center justify-start text-lg"
              key="2"
              icon={<RiLiveFill />}>
              Webcam live
            </Menu.Item>
          </Menu>

          <Modal
            title="Stream live"
            centered
            okText="Start Stream"
            visible={modalVisible}
            onOk={() => startStream()}
            onCancel={() => setmodalVisible(false)}>
            <div className="bg-white p-4 ">
              <div className="">
                <h2 className="text-xl py-2 font-bold">Stream form Software</h2>
                <p>
                  By sending us your video from your streaming software you will go live. start
                  streamng now.
                </p>
              </div>
            </div>
          </Modal>
          <Modal
            title="Stream live"
            centered
            closable={false}
            mask={false}
            footer={null}
            visible={formVisible}
            okText="back"
            onOk={() => setFormVisible(false)}
            onCancel={() => setFormVisible(false)}>
            <div className="bg-white p-4 ">
              <StreamForm />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default StreamVideo
