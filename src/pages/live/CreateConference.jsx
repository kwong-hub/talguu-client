import React, { useState } from 'react'
import SideNav from '../../partials/sideNav/SideNav'
import {
  Button,
  Modal,
  DatePicker,
  TimePicker,
  Menu,
  Dropdown,
  Input,
  message
} from 'antd'
import { useHistory } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { liveVideoURL } from '../../environment/config'
import videoService from '../../_services/video.service'
import { FaPlus, FaCopy } from 'react-icons/fa'
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component'

const CreateConference = () => {
  const history = useHistory()
  const roomId = nanoid(12)
  const [modalVisible, setmodalVisible] = useState(false)
  const [confirmVisible, setConfrimVisible] = useState(false)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [link, setLink] = useState(null)
  const [searchRoom, setSearchRoomsetTheLink] = useState(null)

  const ondatechange = (date, datestring) => {
    if (moment(date).isValid()) setDate(moment(date).format('MM/DD/YYYY'))
  }

  function ontimeChange(time, timeString) {
    if (timeString) setTime(timeString)
  }
  const createInvitationLink = () => {
    const startTime = new Date(`${date} ${time}`)
    videoService
      .generateInvitationLink({
        roomId: roomId,
        startTime: startTime
      })
      .then((data) => {
        if (data) {
          const link = `${liveVideoURL}join_conference?token=${data.token}&expires=${data.expiresOn}&roomId=${data.roomId}`
          setLink(link)
          setmodalVisible(false)
          setConfrimVisible(true)
        }
      })
      .catch((_err) => {})
  }

  const copiedMessage = () => {
    message.info('Copied!')
  }

  const joinClick = () => {
    if (searchRoom.length === 12) {
      history.push(`/conference_started?roomId=${searchRoom}`)
    } else {
      message.error("Couldn't find the meeting that you're trying to join")
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <div className="flex items-center justifiy-between text-md ">
          <FaPlus />
          <span
            onClick={(e) => history.push('/conference_started')}
            className="mt-2 mx-4"
            type="primary"
          >
            Start Instant Meeting
          </span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="flex items-center justifiy-between text-md ">
          <FaPlus />
          <span
            onClick={(e) => setmodalVisible(true)}
            className="my-2 mx-4"
            type="primary"
          >
            Schedule Meeting
          </span>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <SideNav></SideNav>
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <div className="md:w-1/2 max-w-32 ">
          <div className="">
            <h1 className="text-3xl font-semibold p-2">
              Start conference meeting and publish it to multiple audience.
            </h1>
            <p className="font-ligth">
              Create conference, invite user to join your conference, you make
              it public to the viewer{' '}
            </p>
          </div>
          <div className="flex py-4">
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button type="primary">New Meeting</Button>
            </Dropdown>
            <Input
              value={searchRoom}
              onChange={(e) => setSearchRoomsetTheLink(e.target.value)}
              className="mx-2 w-64"
              placeholder="Paste the link"
            />
            {searchRoom && (
              <Button type="link" onClick={joinClick}>
                Join
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Schedule The meeting"
        centered
        okText="Schedule Meeting"
        visible={modalVisible}
        onOk={(e) => createInvitationLink()}
        onCancel={() => setmodalVisible(false)}
      >
        <div className="bg-white px-4">
          <div className="">
            <h2 className="text-lg pb-2 font-semibold">Set time and date</h2>
            <DatePicker onChange={(e) => ondatechange(e)} />
            <TimePicker onChange={ontimeChange} />
          </div>
          <div></div>
        </div>
      </Modal>
      <Modal
        title="Schedule The meeting"
        centered
        okText="Okay"
        visible={confirmVisible}
        onOk={(e) => setConfrimVisible(false)}
        onCancel={() => setConfrimVisible(false)}
      >
        <div className="bg-white px-4">
          <div className="">
            <h2 className="">
              Copy this link and send it to the people that you want to meet
              with. Make sure that you save room Id so that you can use it
              later. too
            </h2>

            <div className="flex">
              <h1 className="mx-2">Room Id</h1>
              <p className="font-bold text-xl">
                {' - '}
                {roomId}
              </p>
            </div>

            <Input
              className="my-2"
              readOnly
              value={link}
              suffix={
                <CopyToClipboard text={link} onCopy={() => copiedMessage()}>
                  <span className="cursor-pointer">
                    <FaCopy />
                  </span>
                </CopyToClipboard>
              }
            />
          </div>
          <div></div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateConference
