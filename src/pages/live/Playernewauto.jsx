import React from 'react'
import './Player.css'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import { wssURL } from '../../environment/config'
import SideNav from '../../partials/sideNav/SideNav'
import { notification } from 'antd'

class Playernewauto extends React.Component {
  webRTCAdaptor = null

  state = {
    mediaConstraints: {
      video: false,
      audio: false
    },
    // eslint-disable-next-line react/prop-types
    streamName: this.props.location?.state?.stream_key,
    token: '',
    pc_config: {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    },
    sdpConstraints: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    },
    websocketURL: wssURL,
    isShow: false
  }

  componentDidMount() {
    console.log(this.props)
    this.webRTCAdaptor = this.initiateWebrtc()
    this.setState({
      isShow: true,
      // eslint-disable-next-line react/prop-types
      streamName: this.props.location?.state?.stream_key
    })
  }

  streamChangeHandler = ({ target: { value } }) => {
    console.log(value)
    this.setState({ streamName: value })
  }

  onStartPlaying = (name) => {
    this.webRTCAdaptor.play(this.state.streamName, this.state.token)
  }

  initiateWebrtc() {
    const thiz = this
    return new WebRTCAdaptor({
      websocket_url: this.state.websocketURL,
      mediaConstraints: this.state.mediaConstraints,
      peerconnection_config: this.state.pc_config,
      sdp_constraints: this.state.sdpConstraints,
      remoteVideoId: 'remoteVideo',
      isPlayMode: true,
      debug: true,
      candidateTypes: ['tcp', 'udp'],
      callback: function (info, obj) {
        if (info === 'initialized') {
          console.log('initialized')
          thiz.onStartPlaying(this.state.streamName)
        } else if (info === 'play_started') {
          // joined the stream
          console.log('play started')
        } else if (info === 'play_finished') {
          // leaved the stream
          console.log('play finished')
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
        notification.open({ message: JSON.stringify(error) })
      }
    })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { streamName, isShow } = this.state

    return (
      <>
        <SideNav></SideNav>
        <div className="my-8 pt-8 ml-0  flex flex-col w-full items-center">
          {/* YOU ARE IN AUTO PLAY PAGE <br /> */}
          <video id="remoteVideo" controls playsInline></video>
          <br />
        </div>
        <div />
      </>
    )
  }
}

export default Playernewauto
