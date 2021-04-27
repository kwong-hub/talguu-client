import { notification } from 'antd'
import React, { useEffect } from 'react'

const WebcamLive = () => {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream)
        console.log(window.URL.createObjectURL(stream))
        this.setState({ videoSource: window.URL.createObjectURL(stream) })
      })
      .catch((error) => {
        console.log('error', error)
        notification.info(error.toString().split(':')[1])
      })
    return () => {}
  }, [])
  return <div></div>
}

export default WebcamLive
