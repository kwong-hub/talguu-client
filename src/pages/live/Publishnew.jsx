import React from 'react'
import './Player.css'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import { wssURL } from '../../environment/config'
import SideNav from '../../partials/sideNav/SideNav'
import { Button, message, notification } from 'antd'
import videoService from '../../_services/video.service'
import { history } from '../../_helpers'
// import CopyToClipboard from 'react-copy-to-clipboard'
// import { FaCopy } from 'react-icons/fa'

class Publishnew extends React.Component {
  webRTCAdaptor = null

  state = {
    mediaConstraints: {
      video: true,
      audio: true
    },
    streamName: 'stream1',
    token: '',
    pc_config: {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    },
    sdpConstraints: {
      OfferToReceiveAudio: false,
      OfferToReceiveVideo: false
    },
    websocketURL: wssURL,
    isShow: false
    // published: false
  }

  componentDidMount() {
    // console.log(this.props)
    const videox = document.querySelector('#localVideo')

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          videox.srcObject = stream
        })
        .catch(function (err0r) {
          console.log('Something went wrong!')
        })
    }
    this.webRTCAdaptor = this.initiateWebrtc()
    this.setState({
      isShow: true
    })
    this.getStreamed()
  }

  getStreamed = () => {
    videoService
      .getStreamed()
      .then((data) => {
        if (data.success) {
          console.log(data)
          this.setState({ streamName: data.stream_key })
          if (data.status === 'LIVE') {
            this.setState({ isShow: false })
          }
        } else {
          history.push('/stream_video')
        }
      })
      .catch((err) => {
        console.log(err)
        history.push('/stream_video')
      })
  }

  streamChangeHandler = ({ target: { value } }) => {
    console.log(value)
    this.setState({ streamName: value })
  }

  onStartPublishing = (name) => {
    this.webRTCAdaptor.publish(this.state.streamName, this.state.token)
    this.publishLive()
  }

  onEndLive = () => {
    videoService
      .editStream({
        key: this.state.streamName,
        status: 'CLOSED',
        type: 'WEBCAM'
      })
      .then((data) => {
        console.log(data)
        this.webRTCAdaptor.stop(this.state.streamName, this.state.token)
        // this.setState({ published: true })
      })
      .catch((err) => message.error(JSON.stringify(err)))
  }

  publishLive = (streamKey) => {
    videoService
      .editStream({
        key: this.state.streamName,
        status: 'LIVE',
        type: 'WEBCAM'
      })
      .then((data) => {
        console.log(data)
        // message.
        // this.setState({ published: true })
      })
      .catch((err) => message.error(JSON.stringify(err)))
  }

  initiateWebrtc() {
    const thiz = this
    return new WebRTCAdaptor({
      websocket_url: this.state.websocketURL,
      mediaConstraints: this.state.mediaConstraints,
      peerconnection_config: this.state.pc_config,
      sdp_constraints: this.state.sdpConstraints,
      localVideoId: 'localVideo',
      debug: true,
      bandwidth: 900,
      callback: function (info, obj) {
        if (info === 'initialized') {
          console.log('initialized')
        } else if (info === 'publish_started') {
          // stream is being published
          console.log('publish started')
          notification.open({
            message: 'Live Streaming started',
            type: 'success'
          })
          thiz.setState({
            isShow: false
          })
        } else if (info === 'publish_finished') {
          // stream is being finished
          console.log('publish finished')
          thiz.setState({
            isShow: true
          })
        } else if (info === 'closed') {
          // console.log("Connection closed");
          if (typeof obj !== 'undefined') {
            console.log('Connecton closed: ' + JSON.stringify(obj))
          }
        } else if (info === 'ice_connection_state_changed') {
          console.log('iceConnectionState Changed: ', JSON.stringify(obj))
        } else if (info === 'updated_stats') {
          // obj is the PeerStats which has fields
          // averageIncomingBitrate - kbits/sec
          // currentIncomingBitrate - kbits/sec
          // packetsLost - total number of packet lost
          // fractionLost - fraction of packet lost
          console.log(
            'Average incoming kbits/sec: ' +
              obj.averageIncomingBitrate +
              ' Current incoming kbits/sec: ' +
              obj.currentIncomingBitrate +
              ' packetLost: ' +
              obj.packetsLost +
              ' fractionLost: ' +
              obj.fractionLost +
              ' audio level: ' +
              obj.audioLevel
          )
        } else if (info === 'data_received') {
          console.log(
            'Data received: ' +
              obj.event.data +
              ' type: ' +
              obj.event.type +
              ' for stream: ' +
              obj.streamId
          )
        } else if (info === 'bitrateMeasurement') {
          console.log(info + ' notification received')

          console.log(obj)
        } else {
          console.log(info + ' notification received')
        }
      },
      callbackError: function (error) {
        // some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

        console.log('error callback: ' + JSON.stringify(error))
        notification.open({
          message: 'Camera is not found',
          description: JSON.stringify(error)
        })
      }
    })
  }

  copiedMessage = () => {
    message.info('Copied!')
  }

  render() {
    const { streamName, isShow } = this.state

    return (
      <div className="flex-col items-center">
        <SideNav></SideNav>
        <div className="my-4 p-2 pt-8 ml-0  flex flex-col w-full items-center max-w-xl">
          <span className="py-4 text-xl font-medium">Go live from Webcam</span>
          <video id="localVideo" autoPlay muted controls playsInline></video>
          <br />
          <div className="flex flex-col items-start my-2">
            {/* <span>Stream Key</span> */}
            {/* <Input
              type="text"
              className="text-xl border rounded-md"
              onChange={this.streamChangeHandler}
            /> */}
            {/* <Input
              readOnly
              value={this.state?.streamName}
              suffix={
                <CopyToClipboard
                  text={this.state?.streamName}
                  onCopy={() => this.copiedMessage()}
                >
                  <span className="cursor-pointer">
                    <FaCopy />
                  </span>
                </CopyToClipboard>
              }
            /> */}
          </div>
          {isShow ? (
            <Button
              onClick={this.onStartPublishing.bind(this, streamName)}
              className="mb-4 btn btn-primary"
              id="start_play_button"
              type="primary"
            >
              Go Live
            </Button>
          ) : null}

          {!isShow ? (
            <Button
              onClick={(e) => this.onEndLive()}
              className="mb-4 btn btn-primary"
              id="start_play_button"
              type="danger"
            >
              End Live
            </Button>
          ) : null}
          <div className="h-8 m-8 w-full"></div>
        </div>
      </div>
    )
  }
}

export default Publishnew
