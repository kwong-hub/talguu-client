import React from 'react'


import {Modal} from 'antd'

function SettingModal({
    isModalVisible, 
    handleOk, 
    handleCancel, 
    handleVideoChange,
    handleAudioChange,
    audioDevices,
    videoDevices
}) {

  return (
    <Modal
      title="Select input devices"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>
        <div className="flex justify-between px-3">
          <div>
            <div className="flex flex-col">
              <label className="text-gray-800 ">Audio input source </label>
              <select
                id="audioSource"
                onChange={handleAudioChange}
                className="p-3 mt-5"
              >
                <option key={null} value={null}>
                  Select Input source
                </option>
                {audioDevices.map((audioDevice) => {
                  return (
                    <option
                      key={audioDevice.deviceId}
                      value={audioDevice.deviceId}
                    >
                      {audioDevice.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center pb-10">
              <label className="text-gray-800">Video input source </label>
              <select
                id="videoSource"
                onChange={handleVideoChange}
                className="p-3 mt-5"
              >
                <option key={null} value={null}>
                  Select Input source
                </option>
                {videoDevices.map((videoDevice) => {
                  return (
                    <option
                      key={videoDevice.deviceId}
                      value={videoDevice.deviceId}
                    >
                      {videoDevice.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SettingModal