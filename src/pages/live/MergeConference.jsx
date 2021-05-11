import { Button, notification } from 'antd'
import React, { Component } from 'react'
import { wssURL } from '../../environment/config'

import SideNav from '../../partials/sideNav/SideNav'
import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import StreamMerger from '../../_helpers/streaam_merger'
import videoService from '../../_services/video.service'

export class MergerConference extends Component {
  webRTCAdaptor = null
  roomOfStream = []
  streamsList = []
  streamCurrent = []
  publishStreamId
  publishStreamId2
  isDataChannelOpen = false
  isMicMuted = false
  isCameraOff = false
  roomTimerId = -1
  merger = new StreamMerger(640, 480, true)
  playOnly = false
  token = ''
  streamId = null
  oldId = null
  state = {
    mediaConstraints: {
      video: true,
      audio: true
    },
    // eslint-disable-next-line react/prop-types
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
    roomName: 'room1',
    // playOnly: true,
    isCameraOff: true,

    // buttons
    on_camera_disable: true,
    off_camera_disable: false,
    unmute_mic_disable: true,
    mute_mic_disable: false,
    join_disable: false,
    leaveRoom_disable: false,
    noStream: true,
    xindex: 0,
    yindex: 0,
    oldId: null
  }

  componentDidMount() {
    // console.log(this.props)
    this.webRTCAdaptor = this.intianteWebRTC()
  }

  turnOffLocalCamera = () => {
    this.webRTCAdaptor.turnOffLocalCamera()
    this.isCameraOff = true
    this.handleCameraButtons()
    this.sendNotificationEvent('CAM_TURNED_OFF')
  }

  turnOnLocalCamera = () => {
    this.webRTCAdaptor.turnOnLocalCamera()
    this.isCameraOff = false
    this.handleCameraButtons()
    this.sendNotificationEvent('CAM_TURNED_ON')
  }

  muteLocalMic = () => {
    this.webRTCAdaptor.muteLocalMic()
    this.isMicMuted = true
    this.handleMicButtons()
    this.sendNotificationEvent('MIC_MUTED')
  }

  unmuteLocalMic = () => {
    this.webRTCAdaptor.unmuteLocalMic()
    this.isMicMuted = false
    this.handleMicButtons()
    this.sendNotificationEvent('MIC_UNMUTED')
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
      //   turn_off_camera_button.disabled = false
      //   turn_on_camera_button.disabled = true
    }
  }

  handleMicButtons = () => {
    if (this.isMicMuted) {
      this.setState({
        mute_mic_disable: true,
        unmute_mic_disable: false
      })
      //   mute_mic_button.disabled = true
      //   unmute_mic_button.disabled = false
    } else {
      this.setState({
        mute_mic_disable: false,
        unmute_mic_disable: true
      })
      //   mute_mic_button.disabled = false
      //   unmute_mic_button.disabled = true
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
    notification.open({ message: 'Joined successfully' })
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
      .catch((err) => notification.error(JSON.stringify(err)))
  }

  leaveRoom = () => {
    this.webRTCAdaptor.leaveFromRoom(this.state.roomName)
    this.merger.stop()
    for (const node in document.getElementById('players').childNodes) {
      if (node.tagName === 'DIV' && node.id !== 'localVideo') {
        document.getElementById('players').removeChild(node)
      }
    }
  }

  mergeStreams = () => {
    const delayInMilliseconds = 1500
    const thiz = this
    setTimeout(function () {
      thiz.merger.start()
      const result = thiz.merger.getResult()
      thiz.webRTCAdaptor.gotStream(result)
      console.log('streamslist = ' + thiz.streamsList)
      if (thiz.streamsList.length > 0) {
        thiz.publish(thiz.publishStreamId2)
        thiz.setState({ noStream: false })
      } else {
        notification.open({
          message: 'There is no stream available in the room'
        })
        thiz.setState({ noStream: false })
      }
    }, delayInMilliseconds)
  }

  publish(streamName, token) {
    this.publishStreamId = streamName
    this.webRTCAdaptor.publish(streamName, token)
  }

  streamInformation(obj) {
    this.webRTCAdaptor.play(obj.streamId, this.token, this.state.roomName)
  }

  createRemoteVideoOld = (streamId) => {
    const player = document.createElement('div')
    player.className = 'col-sm-3'
    player.id = 'player' + streamId
    player.innerHTML =
      '<video id="remoteVideo' +
      streamId +
      '"controls autoplay playsinline></video>'
    document.getElementById('players').appendChild(player)
  }

  remoteVideo = (streamId) => (
    <div className="flex flex-col" id={'player' + streamId}>
      <video id={'remoteVideo' + streamId} controls autoPlay></video>
    </div>
  )

  removeRemoteVideo = (streamId) => {
    const video = document.getElementById('remoteVideo' + streamId)
    if (video != null) {
      const player = document.getElementById('player' + streamId)
      video.srcObject = null
      document.getElementById('players').removeChild(player)
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

    if (video == null) {
      this.createRemoteVideoOld(obj.streamId)
      video = document.getElementById('remoteVideo' + obj.streamId)
    }

    video.srcObject = obj.stream
  }

  createCanvas = () => {
    const canvas = document.createElement('canvas')
    canvas.getContext('2d')
  }

  intianteWebRTC = () => {
    const thiz = this
    return new WebRTCAdaptor({
      websocket_url: this.state.websocketURL,
      mediaConstraints: this.state.mediaConstraints,
      peerconnection_config: this.state.pc_config,
      sdp_constraints: this.state.sdpConstraints,
      localVideoId: 'mglocalVideo',
      isPlayMode: true,
      debug: false,
      callback: (info, obj) => {
        if (info === 'initialized') {
          console.log('initialized')
          this.setState({
            join_disable: false,
            leaveRoom_disable: true
          })
        } else if (info === 'joinedTheRoom') {
          thiz.mergeStreams()
          const room = obj.ATTR_ROOM_NAME
          thiz.roomOfStream[obj.streamId] = room
          console.log('joined the room: ' + thiz.roomOfStream[obj.streamId])
          console.log(obj)

          thiz.publishStreamId = obj.streamId
          this.setState({
            join_disable: false,
            leaveRoom_disable: true
          })
          //   if (thiz.playOnly) {
          //     thiz.isCameraOff = true
          //     thiz.handleCameraButtons()
          //   } else {
          //     thiz.publish(obj.streamId, thiz.token)
          //   }

          if (obj.streams != null) {
            obj.streams.forEach(function (item) {
              console.log('Stream joined with ID: ' + item)
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
          //   thiz.playVideo(obj)
          if (thiz.noStream) {
            thiz.mergeStreams()
          }
          thiz.noStream = false
          if (thiz.oldId !== obj.streamId) {
            thiz.merger.addStream(obj.stream, {
              Xindex: thiz.xindex,
              Yindex: thiz.yindex,
              streamId: obj.streamId
            })
            if (thiz.xindex === 3) {
              thiz.yindex++
              thiz.xindex = 0
            }
            thiz.xindex++
            console.debug('adding stream id = ' + obj.streamId)
          }
          thiz.oldId = obj.streamId
          // thiz.streamCurrent.push(obj)
        } else if (info === 'publish_started') {
          // stream is being published
          console.debug(
            'publish started to room: ' + thiz.roomOfStream[obj.streamId]
          )
          this.setState({
            join_disable: true,
            leaveRoom_disable: false
          })
          //   startAnimation()
        } else if (info === 'publish_finished') {
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
        } else if (info === 'screen_share_stopped') {
          console.log('screen share stopped')
        } else if (info === 'browser_screen_share_supported') {
          //   screen_share_checkbox.disabled = false
          //   camera_checkbox.disabled = false
          //   screen_share_with_camera_checkbox.disabled = false
          //   console.log('browser screen share supported')
          //   browser_screen_share_doesnt_support.style.display = 'none'
        } else if (info === 'leavedFromRoom') {
          const room = obj.ATTR_ROOM_NAME
          console.debug('leaved from the room:' + room)
          if (thiz.roomTimerId != null) {
            clearInterval(thiz.roomTimerId)
          }

          this.setState({
            join_disable: true,
            leaveRoom_disable: false
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
            console.log('Connecton closed: ' + JSON.stringify(obj))
          }
        } else if (info === 'play_finished') {
          console.log('play_finished')
          const video = document.getElementById('remoteVideo' + obj.streamId)
          if (video != null) {
            video.srcObject = null
          }
          thiz.merger.removeStream(obj.streamId)
          thiz.removeRemoteVideo(obj.streamId)
        } else if (info === 'streamInformation') {
          thiz.streamInformation(obj)
        } else if (info === 'roomInformation') {
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
            }
          }
          // Lastly updates the current streamlist with the fetched one.
          thiz.streamsList = obj.streams
        } else if (info === 'data_channel_opened') {
          console.log('Data Channel open for stream id', obj)
          thiz.isDataChannelOpen = true
        } else if (info === 'data_channel_closed') {
          console.log('Data Channel closed for stream id', obj)
          thiz.isDataChannelOpen = false
        } else if (info === 'data_received') {
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

  render() {
    return (
      <div className="mb-16">
        <SideNav></SideNav>
        <div className="my-20 flex flex-col w-full items-center">
          <h2 className="text-xl ">Conference</h2>
          <div className="flex">
            <video
              id="mglocalVideo"
              className="w-full my-6"
              autoPlay
              muted
              controls
              playsinline
            ></video>
            <div id="players" className="my-4 py-2"></div>
          </div>

          <div className="my-4">
            <Button
              className="mx-4"
              type="primary"
              disabled={this.state.join_disable}
              onClick={(e) => this.joinRoom()}
              id="join_publish_Button"
            >
              Join Room
            </Button>
            <Button
              className=""
              type="primary"
              onClick={(e) => this.leaveRoom()}
              disabled={this.state.leaveRoom_disable}
              id="stop_publish_Button"
            >
              Leave Room
            </Button>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    )
  }
}

export default MergerConference