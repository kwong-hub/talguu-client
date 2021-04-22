import React from 'react'
import './Player.css'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import wssURL from '../../environment/config'
class Playernew extends React.Component {
  webRTCAdaptor = null

  state = {
    mediaConstraints: {
      video: false,
      audio: false
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
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true
    },
    websocketURL: wssURL,
    isShow: false
  }

  componentDidMount() {
    this.webRTCAdaptor = this.initiateWebrtc()
    this.setState({
      isShow: true
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
      callbackError: (error) => {
        // some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError
        console.log('error callback: ' + JSON.stringify(error))
        alert(JSON.stringify(error))
      }
    })
  }

  render() {
    const { streamName, isShow } = this.state

    return (
      <>
        <div className="Player">
          YOU ARE IN PLAY PAGE <br />
          <video id="remoteVideo" autoPlay controls playsInline></video>
          <br />
          <input type="text" onChange={this.streamChangeHandler} />
          {isShow ? (
            <button
              onClick={this.onStartPlaying.bind(this, streamName)}
              className="btn btn-primary"
              id="start_play_button"
            >
              {' '}
              Start Playing
            </button>
          ) : null}
        </div>
        <div />
      </>
    )
  }
}

export default Playernew