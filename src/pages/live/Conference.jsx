import { Button, notification, Popover, message, Input, Avatar } from 'antd'
import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import { liveVideoURL, wssURL } from '../../environment/config'
import './Player.css'
import { history } from '../../_helpers'
// import SideNav from '../../partials/sideNav/SideNav'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import videoService from '../../_services/video.service'
import { nanoid } from 'nanoid'
import { BiGroup, BiUserPlus, BiVideo, BiVideoOff } from 'react-icons/bi'
import { AiOutlineAudio, AiOutlineAudioMuted } from 'react-icons/ai'
import { MdScreenShare } from 'react-icons/md'
import HeaderHome from '../../partials/header/HeaderHome'
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component'
import { FaCopy } from 'react-icons/fa'
import PropTypes from 'prop-types'

import './chatPanel.css'

import { IoIosArrowDown } from 'react-icons/io'


import { AiFillSetting } from 'react-icons/ai'

import SettingModal from './SettingModal'

import userIcon from '../../assets/images/user_avatar_2.png'
import ChatPanel from './ChatPanel'

// import Menu from 'rc-menu'
let socket
export class Conference extends Component {
  webRTCAdaptor = null
  roomOfStream = []
  streamsList = []
  streamCurrent = []
  publishStreamId
  isDataChannelOpen = false
  isMicMuted = false
  isCameraOff = false
  roomTimerId = -1

  playOnly = false
  token = ''
  streamId = null
  publisherWindow = null
  // externalWindow = null
  constructor() {
    super()
    // this.handleVideoChange = this.handleVideoChange.bind(this)
    this.state = {
      mediaConstraints: {
        video: true,
        audio: true
      },
      // eslint-disable-next-line react/prop-types
      endpoint: 'wss://8mspaa.com',
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
      isShow: false,
      // eslint-disable-next-line react/prop-types
      roomName: '',
      // playOnly: true,
      isCameraOff: true,
      // buttons
      on_camera_disable: true,
      off_camera_disable: false,
      unmute_mic_disable: true,
      mute_mic_disable: false,
      join_disable: false,
      leaveRoom_disable: false,
      publish_button: true,
      link: '',
      passCode: '',
      participant: 0,
      capture: 'camera',
      audioDevices: [],
      videoDevices: [],
      incomingChats: [],
      openChatPanel: false,
      chatMessage: '',
      typing: false,
      isModalVisible: false,
      incomingMessage: {}
    }
    socket = socketIOClient(this.state.endpoint, { path: '/tlgwss' })
  }
  // screenShareMenu = (
  //   <Menu>
  //     <Menu.Item
  //       onClick={() => this.switchVideoMode('screen')}
  //       key="screen"
  //     >
  //       Screen
  //     </Menu.Item>
  //     <Menu.Item
  //       onClick={() => this.switchVideoMode('screen+camera')}
  //       key="screen+camera"
  //     >
  //       Screen & Camera
  //     </Menu.Item>
  //     <Menu.Item onClick={() => this.switchVideoMode('camera')} key="">
  //       Turn Off
  //     </Menu.Item>
  //   </Menu>
  // )

  componentDidMount() {
    // console.log(this.props)
    this.setState({ roomName: this.getRooMId() })
    this.webRTCAdaptor = this.intianteWebRTC()
    // this.generatePassCode()
    this.getStreamed()

    socket.on('message', this.messageListener)
  }

  messageListener = (message) => {
    this.state.incomingChats.push(message)
    this.setState({
      incomingChats: this.state.incomingChats
    })
    console.log('message: ', message)
  }

  componentWillUnmount() {
    this.webRTCAdaptor.closeStream()
    this.webRTCAdaptor.stop()
    this.setState({ roomName: null })
    // this.webRTCAdaptor=null;

    socket.off('message', this.messageListener)
  }

  getRooMId = () => {
    let localRoomId = localStorage.getItem('roomId')
    if (localRoomId) {
      return localRoomId
    } else {
      localRoomId =
        new URLSearchParams(this.props.location.search).get('roomId') ||
        nanoid(12)
      localStorage.setItem('roomId', localRoomId)
      return localRoomId
    }
  }

  handleVideoChange = (event) => {
    // e.preventDefault()
    if (event.target.value !== 'Select Input source') {
      this.webRTCAdaptor.switchVideoCameraCapture(
        this.publishStreamId,
        event.target.value
      )
    }
  }

  handleAudioChange = (event) => {
    // e.preventDefault()

    console.log('button working...' + event.target.value)
    if (event.target.value !== 'Select Input source') {
      this.webRTCAdaptor.switchAudioInputSource(
        this.publishStreamId,
        event.target.value
      )
    }
    console.log('button working...' + event.target.value)
  }

  generateInvitationLink = () => {
    videoService
      .generateInvitationLink({
        roomId: this.state.roomName,
        startTime: Date.now()
      })
      .then((data) => {
        if (data) {
          const link = `${liveVideoURL}/join_conference?token=${data.token}&expires=${data.expiresOn}&roomId=${data.roomId}`
          this.setState({ link: link, passCode: data.passCode })
        }
      })
      .catch((_err) => {})
  }

  toggleLocalCamera = () => {
    this.isCameraOff = !this.isCameraOff
    if (!this.isCameraOff) {
      this.webRTCAdaptor.turnOnLocalCamera()
      this.sendNotificationEvent('CAM_TURNED_ON')
    } else {
      this.webRTCAdaptor.turnOffLocalCamera()
      this.sendNotificationEvent('CAM_TURNED_OFF')
    }
    this.handleCameraButtons()
  }

  toggleLocalMic = () => {
    if (this.isMicMuted) {
      this.webRTCAdaptor.unmuteLocalMic()
      this.sendNotificationEvent('MIC_UNMUTED')
    } else {
      this.webRTCAdaptor.muteLocalMic()
      this.sendNotificationEvent('MIC_MUTED')
    }
    this.isMicMuted = !this.isMicMuted
    this.handleMicButtons()
  }

  handleCameraButtons = () => {
    console.log('this.iscamerOff', this.isCameraOff)
    if (this.isCameraOff) {
      this.setState({
        off_camera_disable: true,
        on_camera_disable: false
      })
    } else {
      this.setState({
        off_camera_disable: false,
        on_camera_disable: true
      })
    }
  }

  handleMicButtons = () => {
    if (this.isMicMuted) {
      this.setState({
        mute_mic_disable: true,
        unmute_mic_disable: false
      })
    } else {
      this.setState({
        mute_mic_disable: false,
        unmute_mic_disable: true
      })
    }
  }

  sendNotificationEvent = (eventType) => {
    if (this.isDataChannelOpen) {
      const notEvent = { streamId: this.publishStreamId, eventType: eventType }

      this.webRTCAdaptor.sendData(
        this.publishStreamId,
        JSON.stringify(notEvent)
      )
    } else {
      console.log(
        'Could not send the notification because data channel is not open.'
      )
    }
  }

  joinRoom = () => {
    this.webRTCAdaptor.joinRoom(this.state.roomName, this.streamId)
    // notification.open({ message: 'Joined successfully' })
  }

  publishToPublic = () => {
    if (this.publisherWindow != null) {
      this.publisherWindow.close()
    }
    this.publisherWindow = window.open(
      `/merger?roomId=${this.state.roomName}`,
      '',
      'width=920,height=580,left=200,top=200'
    )
    // this.setState({
    // publish_button: false
    // })
  }

  getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  }

  generatePassCode = () => {
    videoService
      .editStream({
        key: 'krbTzc_nrNyn2L6aB01',
        passCode: this.getRndInteger(1000, 9999).toString()
      })
      .then((data) => {
        console.log(data)
        // notification.open({ message: 'Published successfully' })
      })
      .catch((err) => notification.error(JSON.stringify(err)))
  }

  unpublish = () => {
    videoService
      .endStream(this.state.streamName)
      .then(() => {
        this.setState({ publish_button: false })
        if (this.publisherWindow) {
          this.publisherWindow.close()
        }
      })
      .catch((err) => console.log('err', err))
  }

  getStreamed = () => {
    videoService
      .getStreamed()
      .then((data) => {
        if (data.success) {
          this.setState({ streamName: data.stream_key })
          // this.streamId = data.stream_key
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

  leaveRoom = () => {
    this.webRTCAdaptor.leaveFromRoom(this.state.roomName)

    for (const node in document.getElementById('players').childNodes) {
      if (node.tagName === 'DIV' && node.id !== 'localVideo') {
        document.getElementById('players').removeChild(node)
      }
    }
    history.push('/left_conference')
    history.go(0)
  }

  publish(streamName, token) {
    this.publishStreamId = streamName
    this.webRTCAdaptor.publish(streamName, token)
  }

  streamInformation(obj) {
    this.webRTCAdaptor.play(obj.streamId, this.token, this.state.roomName)
  }

  createRemoteVideoOldxy = (streamId) => {
    const player = document.createElement('div')
    player.className = 'flex-1 remote-video'
    player.id = 'player' + streamId
    player.innerHTML =
      '<video id="remoteVideo' +
      streamId +
      '" className="flex-1 my-6" controls autoplay playsinline></video>'
    document.getElementById('players').appendChild(player)
  }

  createRemoteVideoOld = (streamId) => {
    const video2 = document.querySelector('#video_2 > video')
    const video3 = document.querySelector('#video_3 > video')
    const video4 = document.querySelector('#video_4 > video')

    if (!video2) {
      const parent2 = document.getElementById('video_2')
      const player2 = document.createElement('video')
      player2.id = 'remoteVideo' + streamId
      player2.autoplay = true
      player2.controls = true
      player2.className = 'videoPlayer'
      parent2.removeChild(parent2.firstChild)
      parent2.appendChild(player2)
    } else if (!video3) {
      const parent3 = document.getElementById('video_3')
      const player3 = document.createElement('video')
      player3.id = 'remoteVideo' + streamId
      player3.autoplay = true
      player3.controls = true
      player3.className = 'videoPlayer'
      parent3.removeChild(parent3.firstChild)
      parent3.appendChild(player3)
    } else if (!video4) {
      const parent4 = document.getElementById('video_4')
      const player4 = document.createElement('video')
      player4.autoplay = true
      player4.controls = true
      player4.className = 'videoPlayer'
      player4.id = 'remoteVideo' + streamId
      parent4.removeChild(parent4.firstChild)
      parent4.appendChild(player4)
    }
  }

  remoteVideo = (streamId) => (
    <div className="flex flex-col" id={'player' + streamId}>
      <video id={'remoteVideo' + streamId} controls autoPlay></video>
    </div>
  )

  removeRemoteVideo = (streamId) => {
    const video = document.getElementById('remoteVideo' + streamId)
    if (video != null) {
      const vidPlayer = document.getElementById('remoteVideo' + streamId)
      const parentcnt = vidPlayer.parentElement

      const avaterDive = document.createElement('div')
      avaterDive.className = 'avatar_style'
      avaterDive.innerHTML = `
                  
                  <img src='${userIcon}' alt='user avatar' class="user_icon_style" />
                `
      vidPlayer.remove()
      parentcnt.appendChild(avaterDive)
    }
    this.webRTCAdaptor.stop(streamId)
  }

  playVideo = (obj) => {
    const room = this.roomOfStream[obj.streamId]
    // this.roomOfStream[obj.streamId]
    console.log(
      'new stream available with id: ' + obj.streamId + 'on the room:' + room
    )

    let video = document.getElementById('remoteVideo' + obj.streamId)

    if (video == null && obj.streamId !== 'krbTzc_nrNyn2L6aB01') {
      this.createRemoteVideoOld(obj.streamId)
      video = document.getElementById('remoteVideo' + obj.streamId)
    } else if (obj.streamId === 'krbTzc_nrNyn2L6aB01') {
      this.setState({
        publish_button: false
      })
    }
    if (video != null) {
      video.srcObject = obj.stream
    }
  }

  switchVideoMode = (value) => {
    // this.setState({ capture: value })
    // console.log(this.publishStreamId)
    if (value === 'screen') {
      console.log('a ')
      this.webRTCAdaptor.switchDesktopCapture(this.publishStreamId)
    } else if (value === 'screen+camera') {
      console.log('b ')
      this.webRTCAdaptor.switchDesktopCaptureWithCamera(this.publishStreamId)
    } else {
      console.log('c ')
      this.webRTCAdaptor.switchVideoCameraCapture(this.publishStreamId, value)
    }
  }

  intianteWebRTC = () => {
    const thiz = this
    return new WebRTCAdaptor({
      websocket_url: this.state.websocketURL,
      mediaConstraints: this.state.mediaConstraints,
      peerconnection_config: this.state.pc_config,
      sdp_constraints: this.state.sdpConstraints,
      localVideoId: 'localVideo',
      isPlayMode: false,
      debug: true,
      dataChannelEnabled: true,
      callback: (info, obj) => {
        if (info === 'initialized') {
          console.log('** initialized')
          this.setState({
            join_disable: false,
            leaveRoom_disable: true
          })
          if (thiz.playOnly) {
            thiz.isCameraOff = true
            thiz.handleCameraButtons()
          }
          thiz.joinRoom()
        } else if (info === 'available_devices') {
          console.log('devices devices devices...')
          for (let index = 0; index < obj.length; index++) {
            if (obj[index].kind === 'audioinput') {
              this.setState((prevState) => ({
                audioDevices: [...prevState.audioDevices, obj[index]]
              }))
            } else if (obj[index].kind === 'videoinput') {
              this.setState((prevState) => ({
                videoDevices: [...prevState.videoDevices, obj[index]]
              }))
            }
          }
        } else if (info === 'joinedTheRoom') {
          const room = obj.ATTR_ROOM_NAME
          thiz.roomOfStream[obj.streamId] = room
          console.log('** joined the room: ' + thiz.roomOfStream[obj.streamId])
          // console.log(obj)

          thiz.publishStreamId = obj.streamId

          if (thiz.playOnly) {
            this.setState({
              join_disable: false,
              leaveRoom_disable: true
            })
            thiz.isCameraOff = true
            thiz.handleCameraButtons()
          } else {
            thiz.publish(obj.streamId, thiz.token)
          }

          if (obj.streams != null) {
            obj.streams.forEach(function (item) {
              console.log('** Stream joined with ID: ' + item)
              thiz.webRTCAdaptor.play(item, thiz.token, thiz.state.roomName)
            })
            thiz.streamsList = obj.streams
          }
          thiz.roomTimerId = setInterval(() => {
            thiz.webRTCAdaptor.getRoomInfo(
              thiz.state.roomName,
              thiz.publishStreamId
            )
          }, 5000)
        } else if (info === 'newStreamAvailable') {
          console.log('** noewStreamAVAILABLE')
          thiz.playVideo(obj)
          thiz.setState({
            participant: this.state.participant + 1
          })
          // thiz.streamCurrent.push(obj)
        } else if (info === 'publish_started') {
          // stream is being published
          console.debug(
            '** publish started to room: ' + thiz.roomOfStream[obj.streamId]
          )
          this.setState({
            join_disable: true,
            leaveRoom_disable: false
          })
          //   startAnimation()
        } else if (info === 'publish_finished') {
          // stream is being finished
          console.debug('** publish finished')
        } else if (info === 'screen_share_stopped') {
          console.log('** screen share stopped')
        } else if (info === 'browser_screen_share_supported') {
          //   screen_share_checkbox.disabled = false
        } else if (info === 'leavedFromRoom') {
          const room = obj.ATTR_ROOM_NAME
          console.debug('** leaved from the room:' + room)
          if (thiz.roomTimerId != null) {
            clearInterval(thiz.roomTimerId)
          }
          this.setState({
            join_disable: false,
            leaveRoom_disable: true
          })

          if (thiz.streamsList != null) {
            thiz.streamsList.forEach(function (item) {
              thiz.removeRemoteVideo(item)
            })
          }
          // we need to reset streams list
          thiz.streamsList = []
        } else if (info === 'closed') {
          // console.log("Connection closed");
          if (typeof obj !== 'undefined') {
            console.log('** Connecton closed: ' + JSON.stringify(obj))
          }
        } else if (info === 'play_finished') {
          console.log('** play_finished')
          thiz.removeRemoteVideo(obj.streamId)
          thiz.setState({
            join_disable: true,
            leaveRoom_disable: false
          })
        } else if (info === 'streamInformation') {
          console.log('** stream information')
          thiz.streamInformation(obj)
        } else if (info === 'roomInformation') {
          console.log('** room information')
          // Checks if any new stream has added, if yes, plays.
          for (const str of obj.streams) {
            if (!thiz.streamsList.includes(str)) {
              thiz.webRTCAdaptor.play(str, thiz.token, thiz.state.roomName)
            }
          }
          // Checks if any stream has been removed, if yes, removes the view and stops webrtc connection.
          for (const str of thiz.streamsList) {
            if (!obj.streams.includes(str)) {
              thiz.removeRemoteVideo(str)
              thiz.setState({
                join_disable: false,
                leaveRoom_disable: false,
                publish_button: true
              })
            }
          }
          // Lastly updates the current streamlist with the fetched one.
          thiz.streamsList = obj.streams
        } else if (info === 'data_channel_opened') {
          console.log('** Data Channel open for stream id', obj)
          thiz.isDataChannelOpen = true
        } else if (info === 'data_channel_closed') {
          console.log('** Data Channel closed for stream id', obj)
          thiz.isDataChannelOpen = false
        } else if (info === 'data_received') {
          console.log('** data received')
          thiz.handleNotificationEvent(obj)
        }
      },
      callbackError: function (error, message) {
        // some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

        if (
          error.indexOf('publishTimeoutError') !== -1 &&
          thiz.roomTimerId != null
        ) {
          clearInterval(thiz.roomTimerId)
        }

        console.log('error callback: ' + JSON.stringify(error))
        let errorMessage = JSON.stringify(error)
        if (typeof message !== 'undefined') {
          errorMessage = message
        }

        errorMessage = JSON.stringify(error)
        if (error.indexOf('NotFoundError') !== -1) {
          errorMessage =
            'Camera or Mic are not found or not allowed in your device.'
        } else if (
          error.indexOf('NotReadableError') !== -1 ||
          error.indexOf('TrackStartError') !== -1
        ) {
          errorMessage =
            'Camera or Mic is being used by some other process that does not not allow these devices to be read.'
        } else if (
          error.indexOf('OverconstrainedError') !== -1 ||
          error.indexOf('ConstraintNotSatisfiedError') !== -1
        ) {
          errorMessage =
            'There is no device found that fits your video and audio constraints. You may change video and audio constraints.'
        } else if (
          error.indexOf('NotAllowedError') !== -1 ||
          error.indexOf('PermissionDeniedError') !== -1
        ) {
          errorMessage = 'You are not allowed to access camera and mic.'
          // screen_share_checkbox.checked = false
          //   camera_checkbox.checked = false
        } else if (error.indexOf('TypeError') !== -1) {
          errorMessage = 'Video/Audio is required.'
        } else if (error.indexOf('UnsecureContext') !== -1) {
          errorMessage =
            'Fatal Error: Browser cannot access camera and mic because of unsecure context. Please install SSL and access via https'
        } else if (error.indexOf('WebSocketNotSupported') !== -1) {
          errorMessage = 'Fatal Error: WebSocket not supported in this browser'
        } else if (error.indexOf('no_stream_exist') !== -1) {
          // TODO: removeRemoteVideo(error.streamId);
        } else if (error.indexOf('data_channel_error') !== -1) {
          errorMessage = 'There was a error during data channel communication'
        } else if (error.indexOf('ScreenSharePermissionDenied') !== -1) {
          errorMessage = 'You are not allowed to access screen share'
          //   screen_share_checkbox.checked = false
          //   camera_checkbox.checked = true
          notification.open({ message: errorMessage })
        }
      }
    })
  }

  copiedMessage = () => {
    message.info('Copied!')
  }

  toggleChatPanel = () => {
    this.setState((prevState) => ({
      openChatPanel: !prevState.openChatPanel
    }))
    console.log('openChatPanel: ', this.openChatPanel)
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
  }

  showSettingModal = () => {
    this.setState({
      isModalVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
  }

  render() {
    // console.log(
    //   '************************** this is state value',
    //   this.state,
    //   '****************************'
    // )
    return (
      <div className="mb-8 bg-gray-800">
        <HeaderHome></HeaderHome>

        {this.state.isModalVisible && (
          <SettingModal
            isModalVisible={this.state.isModalVisible}
            handleCancel={this.handleCancel}
            audioDevices={this.state.audioDevices}
            videoDevices={this.state.videoDevices}
            handleVideoChange={this.handleVideoChange}
            handleAudioChange={this.handleAudioChange}
            handleOk={this.handleOk}
          />
        )}

        <div className="my-10 pt-4 flex flex-col  items-center">
          {/* <h2 className="text-xl semibold">About the Conference</h2> */}
          <div className="flex border-b-2 border-gray-500 p-4 w-full justify-between text-white">
            <div className="flex items-center">
              {/* chat part begins */}

              <Popover
                content={
                  <div className="w-72 text-gray-600 ml-3">
                    <Input
                      readOnly
                      value={this.state.link}
                      suffix={
                        <CopyToClipboard
                          text={this.state.link}
                          onCopy={() => this.copiedMessage()}
                        >
                          <span className="cursor-pointer">
                            <FaCopy />
                          </span>
                        </CopyToClipboard>
                      }
                    />
                  </div>
                }
                title="Invitation Link"
                trigger="click"
                className="flex items-end"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                <div
                  className="cursor-pointer"
                  onClick={(e) => this.generateInvitationLink()}
                >
                  <BiUserPlus className="w-8 h-8  mx-2"></BiUserPlus>
                  Invite to the call.
                </div>
              </Popover>
            </div>

            <div className="flex items-center">
              <div className="cursor-pointer flex items-center">
                Conference Pass Code:
                <span className="bg-gray-200 text-blue-800 px-3 mx-2 rounded-sm">
                  {this.state.passCode}
                </span>
              </div>
              {!this.state.publish_button && (
                <div className="cursor-pointer flex items-center">
                  <BiGroup className="w-8 h-8 mx-1"></BiGroup>
                  {/* Blink div begins here */}
                  <div className="div-blinker"></div>
                  {/* <span className="bg-gray-200 text-blue-800 px-3 mx-2 rounded-sm">
                  LIVE
                </span> */}
                  {/* Blink div ends here */}
                </div>
              )}
              <div>
                {this.state.publish_button ? (
                  <Button
                    className="mx-4"
                    type="primary"
                    disabled={this.state.leaveRoom_disable}
                    onClick={(e) => this.publishToPublic()}
                    id="join_publish_Button"
                  >
                    Prepare to Broadcast
                  </Button>
                ) : (
                  <Button
                    className="mx-4"
                    type="primary"
                    onClick={(e) => this.unpublish()}
                    id="join_publish_Button"
                  >
                    Stop Broadcast
                  </Button>
                )}
              </div>

              <div
                className="flex items-center"
                onClick={this.showSettingModal}
              >
                <span className=" cursor-pointer flex items-center justify-center">
                  <AiFillSetting className="w-7 h-7 ml-4 mr-2" />
                  Setting
                </span>
              </div>
            </div>
          </div>

          {/* video player container begins */}

          <div className="video_player_container">
            {/* first row */}
            <div className="video_player_content">
              <div className="video_player_inner">
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-female-boxer-resting-after-her-training-40264-large.mp4"
                  id="localVideo"
                  className="videoPlayer"
                  autoPlay
                  muted
                  playsinline
                ></video>
              </div>
              <div className="video_player_inner" id="video_2">
                <div className="avatar_style">
                  <img
                    src={userIcon}
                    alt="user avatar"
                    className="user_icon_style"
                  />
                </div>
              </div>
            </div>
            {/* second row  */}
            <div className="video_player_content mt-2">
              <div className="video_player_inner" id="video_3">
                <div className="avatar_style">
                  <img
                    src={userIcon}
                    alt="user avatar"
                    className="user_icon_style"
                  />
                </div>
              </div>
              <div className="video_player_inner" id="video_4">
                <div className="avatar_style">
                  <img
                    src={userIcon}
                    alt="user avatar"
                    className="user_icon_style"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* video player container ends */}

          <div className="max-w-80 flex mb-4 justify-between text-gray-50 mt-8">
            <button className="mx-2">
              {this.isCameraOff ? (
                <BiVideoOff
                  onClick={(e) => this.toggleLocalCamera()}
                  className="w-12 h-12"
                ></BiVideoOff>
              ) : (
                <BiVideo
                  onClick={(e) => this.toggleLocalCamera()}
                  className="w-12 h-12"
                ></BiVideo>
              )}
            </button>
            <button
              onClick={(e) => this.leaveRoom()}
              className="bg-red-700 font-semibold text-white px-2 mx-2 shadow-sm rounded-md hover:bg-red-900"
            >
              End Call
            </button>

            <button
              onClick={(e) => this.switchVideoMode('screen+camera')}
              className="bg-gray-500 font-semibold text-white px-2 mx-2 shadow-sm rounded-md hover:bg-gray-700"
            >
              <div className="mx-2 w-12 h-12 flex justify-center items-center">
                <MdScreenShare className="text-2xl text-gray-300" />
              </div>
            </button>
            <button className="mx-2" onClick={(e) => this.toggleLocalMic()}>
              {this.isMicMuted ? (
                <AiOutlineAudioMuted className="w-12 h-12"></AiOutlineAudioMuted>
              ) : (
                <AiOutlineAudio className="w-12 h-12"></AiOutlineAudio>
              )}
            </button>
          </div>
          <div className="my-4"></div>
        </div>
        <div className="h-20"></div>

        {/* chat part begins */}

        {!this.state.openChatPanel && (
          <div className="w-72 h-16 fixed bottom-2 right-2">
            <div
              className="flex items-center justify-between chat-panel-btn bg-gray-800 hover:bg-gray-700"
              onClick={() => this.toggleChatPanel()}
            >
              <button className="text-gray-200">Open chat</button>
              <span className="mx-3 text-gray-200">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
        )}

        {this.state.openChatPanel && (
          <ChatPanel
            incomingChats={this.state.incomingChats}
            chatMessage={this.state.chatMessage}
            handleMessageChange={this.handleMessageChange}
            canSendMessage={false}
            handleSendMessage={this.handleSendMessage}
            typing={this.state.typing}
            openChatPanel={this.state.openChatPanel}
            toggleChatPanel={this.toggleChatPanel}
          />
        )}

        {/* chat part ends */}
      </div>
    )
  }
}

Conference.propTypes = {
  location: PropTypes.any
}

export default Conference
