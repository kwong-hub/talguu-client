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
        <div className="flex justify-between flex-wrap pb-10 w-full">
            <div className="flex flex-col p-3 w-1/2 mt-2 md:mt-0">
              <label className="text-gray-800 ">Audio input source </label>
              <select
                id="audioSource"
                onChange={handleAudioChange}
                className="p-3 mt-3 w-full"
              >
                <option key={null} value={null}>
                  Select Input source
                </option>
                {audioDevices.length > 0
                  ? audioDevices.map((audioDevice) => {
                      return (
                        <option
                          key={audioDevice.deviceId}
                          value={audioDevice.deviceId}
                        >
                          {audioDevice.label}
                        </option>
                      )
                    })
                  : null}
              </select>
            </div>
          
            <div className="flex flex-col p-3 w-1/2 mt-2 md:mt-0">
              <label className="text-gray-800">Video input source </label>
              <select
                id="videoSource"
                onChange={handleVideoChange}
                className="p-3 mt-3 w-full"
              >
                <option key={null} value={null}>
                  Select Input source
                </option>

                {videoDevices.length > 0
                  ? videoDevices.map((videoDevice) => {
                      return (
                        <option
                          key={videoDevice.deviceId}
                          value={videoDevice.deviceId}
                        >
                          {videoDevice.label}
                        </option>
                      )
                    })
                  : null
                  }
              </select>
            </div>
        </div>
    </Modal>
  )
}

export default SettingModal