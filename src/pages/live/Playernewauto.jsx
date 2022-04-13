import React from 'react'
import socketIOClient from 'socket.io-client'
import './Player.css'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import { wssURL } from '../../environment/config'
import SideNav from '../../partials/sideNav/SideNav'
import { notification, message } from 'antd'

import './playernewauto.css'

import './chatPanel.css'

import { IoIosArrowDown } from 'react-icons/io'
import ChatPanel from './ChatPanel'
import SenderNameModal from './SenderNameModal'
import { userService } from '../../_services/user.service'

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
      incomingMessage: {},
      senderName: '',
      openSenderModal: false,
      isLoading: false,
      user:{}
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

    userService.getUserProfile().then((data) => {
      if (data.success) {
        this.setState({
          user: data.user
        })
      }
    })
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

  handleSenderName = () => {
    const pseudoName = localStorage.getItem('pseudoName')
    if (pseudoName) {
      return true
    } else {
      return false
    }
  }

  handleSendMessage = () => {
    // perform the following steps
    // 1. check the pseudo user name in the local localStorage
    // 2. If not, open the modal to ask for pseudo username
    // 3. save to localStorage
    // 4. send message with pseudo username

    if (!this.state.chatMessage) {
      return
    }

    // const sender = this.handleSenderName()
    // const _sender = localStorage.getItem('pseudoName')

    // if (sender) {
    const _chat = this.state.chatMessage
    const _user = this.state.user.lastName

    var sender = ""
    if(_user === ""){
      sender = "xxxx"
    }else if(_user.length > 4){
      sender = _user.substring(_user.length - 4)
    }else if(_user.length < 4){
      if(_user.length === 1){
        sender = _user.substring(_user.length - 1) + "xxx"
      }else if(_user.length === 2){
        sender = _user.substring(_user.length - 2) + "xx"
      }else if (_user.length === 3){
        sender = _user.substring(_user.length - 3) + "x"
      }
    }

    // const sender = this.state.user.firstName + ' ' + this.state.user.lastName
    const _message = { message: _chat, userName: sender }
    console.log('sentMessageObject: ', _message)
    socket.emit('message', _message)
    this.setState({ chatMessage: '' })
    // } else {
    //   this.setState({
    //     openSenderModal: true
    //   })
    // }
  }

  savePseudoName = (values) => {
    this.setState({
      isLoading: true
    })
    localStorage.setItem('pseudoName', values.pseudoName)
    const _chat = this.state.chatMessage
    const _sender = values.pseudoName

    const _message = { message: _chat, userName: _sender }
    setTimeout(() => {
      socket.emit('message', _message)
      this.setState({
        senderName: _sender,
        openSenderModal: false,
        chatMessage: '',
        isLoading: false
      })
    }, 3000)
  }

  savePseudoNameFailed = () => {
    message.error('Failed to save your name')
  }

  handleCancel = () => {
    this.setState({
      openSenderModal: false
    })
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { streamName, isShow } = this.state

    return (
      <div className="-mt-2 pt-16 mb-8 body-player">
        <SideNav></SideNav>

        {/* chat part begins */}

        {this.state.openSenderModal && (
          <SenderNameModal
            openSenderModal={this.state.openSenderModal}
            savePseudoName={this.savePseudoName}
            handleCancel={this.handleCancel}
            savePseudoNameFailed={this.savePseudoNameFailed}
            isLoading={this.state.isLoading}
          />
        )}

        {!this.state.openChatPanel && (
          <div className="w-72 h-16 user-chat-panel">
            <div
              className="flex items-center justify-between chat-panel-btn bg-gray-800 hover:bg-gray-700"
              onClick={() => this.toggleChatPanel()}
            >
              <button className="text-gray-100">Message to producer</button>
              <span className="mx-3 text-gray-200">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
        )}
        {/* {this.state.openChatPanel && (
          <div className="w-72 h-16 absolute top-0 right-0">
            <div
              className="flex items-center justify-between chat-panel-btn bg-gray-800 hover:bg-gray-700"
              onClick={() => this.toggleChatPanel()}
            >
              <button className="text-gray-200">Close chat</button>
              <span className="mx-3 text-gray-200">
                <AiOutlineClose />
              </span>
            </div>
          </div>
        )} */}

        {this.state.openChatPanel && (
          <ChatPanel
            incomingChats={this.state.incomingChats}
            chatMessage={this.state.chatMessage}
            handleMessageChange={this.handleMessageChange}
            canSendMessage={true}
            handleSendMessage={this.handleSendMessage}
            typing={this.state.typing}
            openChatPanel={this.state.openChatPanel}
            toggleChatPanel={this.toggleChatPanel}
            userChatPanel={true}
          />
        )}

        {/* chat part ends */}
        <div className="video_player_container_viewer">
          <div className="video_player_content_viewer">
            <div className="video_player_viewer">
              {/* YOU ARE IN AUTO PLAY PAGE <br /> */}
              <video
                className="videoPlayer_viewer"
                autoplay
                id="remoteVideo"
                controls
                playsInline
              ></video>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Playernewauto
