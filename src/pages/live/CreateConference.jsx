import React, { useState } from 'react'
import SideNav from '../../partials/sideNav/SideNav'
import { Button, Modal, DatePicker, TimePicker } from 'antd'
import { useHistory } from 'react-router-dom'

const CreateConference = () => {
  const history = useHistory()
  const [modalVisible, setmodalVisible] = useState(false)
  const ondatechange = (date, datestring) => {
    console.log(date, datestring)
  }
  function ontimeChange(time, timeString) {
    console.log(time, timeString)
  }
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
          <Button
            onClick={(e) => history.push('/conference_started')}
            className="my-4"
            type="primary"
          >
            Start Meeting
          </Button>
          <Button
            onClick={(e) => setmodalVisible(true)}
            className="my-4 mx-2"
            type="primary"
          >
            Schedule Meeting
          </Button>
        </div>
      </div>
      <Modal
        title="Schedule The meeting"
        centered
        okText="Schedule Meeting"
        visible={modalVisible}
        onOk={(e) => history.push('/conference_started')}
        onCancel={() => setmodalVisible(false)}
      >
        <div className="bg-white px-4  py-2">
          <div className="">
            <h2 className="text-lg pb-2 font-semibold">Set time and date</h2>
            <DatePicker onChange={(e) => ondatechange(e)} />
            <TimePicker onChange={ontimeChange} />,
          </div>
          <div></div>
        </div>
      </Modal>
    </div>
  )
}

export default CreateConference
