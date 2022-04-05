import React from 'react'
import socketIOClient from 'socket.io-client'
import './Player.css'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import { wssURL } from '../../environment/config'
import SideNav from '../../partials/sideNav/SideNav'
import { notification, message } from 'antd'
import Messages from './Messages'
import MessageInput from './MessageInput'

import './playernewauto.css'

import './chatPanel.css'

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import ChatPanel from './ChatPanel'


let socket
class Playernewauto extends React.Component {
  webRTCAdaptor = null
  constructor() {
    super()

    this.chatText = React.createRef()

    this.state = {
      mediaConstraints: {
        video: false,
        audio: false
      },
      endpoint: 'wss://8mspaa.com/',
      // eslint-disable-next-line react/prop-types
      streamName: this.props?.location?.state?.stream_key,
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
      isShow: false,
      incomingChats: [],
      openChatPanel: false,
      chatMessage: '',
      typing: false,
      isModalVisible: false,
      incomingMessage: {}
    }
    socket = socketIOClient(this.state.endpoint, { path: '/tlgwss' })
  }

  componentDidMount() {
    console.log(this.props)
    this.webRTCAdaptor = this.initiateWebrtc()
    this.setState({
      isShow: true,
      streamName: this.props.location?.state?.stream_key
    })

    socket.on('message', this.messageListener)
   
  }


     messageListener = (message) => {
      this.state.incomingChats.push(message)
      this.setState({
        incomingChats: this.state.incomingChats
      })
    }


  componentWillUnmount() {
    socket.off('message', this.messageListener)
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
          thiz.onStartPlaying('stream1')
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

  toggleChatPanel = () => {
    this.setState((prevState) => ({
      openChatPanel: !prevState.openChatPanel
    }))
  }

  handleMessageChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
      typing: true
    })
  }

  handleSendMessage = () => {
    if (!this.state.chatMessage) {
      return
    }
    socket.emit('message', this.state.chatMessage)
    this.setState({chatMessage:""});
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { streamName, isShow } = this.state

    return (
      <div className="-mt-2 pt-16 mb-8">
        <SideNav></SideNav>

        <div className="flex border-gray-500 p-4 w-full justify-between text-white">
          <div className="flex items-center">
            {/* chat part begins */}

            <div className="w-72 ml-20">
              <div
                className="flex items-center justify-between chat-panel-btn bg-gray-100 hover:bg-gray-300"
                onClick={() => this.toggleChatPanel()}
              >
                <button className="text-gray-800">Chat Panel</button>
                <span className="mx-3 text-gray-800">
                  {this.state.openChatPanel ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </div>
            </div>

            {this.state.openChatPanel && (
              <ChatPanel
                incomingChats={this.state.incomingChats}
                chatMessage={this.state.chatMessage}
                handleMessageChange={this.handleMessageChange}
                canSendMessage={true}
                handleSendMessage={this.handleSendMessage}
                typing={this.state.typing}
                viewerPanel={true}
              />
            )}
          </div>
        </div>

        <div className="w-full flex items-center p-8 justify-center">
          <div className="my-8 border-2 p-6 player_container">
            {/* YOU ARE IN AUTO PLAY PAGE <br /> */}
            <video
              className="h-full w-full"
              autoplay
              id="remoteVideo"
              controls
              playsInline
            ></video>
          </div>
        </div>
      </div>
    )
  }
}

export default Playernewauto
