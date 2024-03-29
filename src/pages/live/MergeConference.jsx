import { Button, notification, Avatar } from 'antd'
import React, { Component } from 'react'
import { wssURL } from '../../environment/config'

import WebRTCAdaptor from '../../_helpers/webrtc_adapter'
import StreamMerger from '../../_helpers/streaam_merger'
import videoService from '../../_services/video.service'
import HeaderHome from '../../partials/header/HeaderHome'
import { history } from '../../_helpers'

import userIcon from '../../assets/images/user_avatar_2.png'

import './Player.css'


export class MergerConference extends Component {
  webRTCAdaptor = null
  roomOfStream = []
  streamsList = []
  streamCurrent = []
  publishStreamId
  isDataChannelOpen = false
  isMicMuted = false
  isCameraOff = false
  roomTimerId = -1
  merger = new StreamMerger(1020, 720, true)
  playOnly = false
  token = ''
  streamId = 'krbTzc_nrNyn2L6aB01'
  oldId = null
  xindex = 0
  yindex = 0
  noStream = false
  streamCount = 0
  state = {
    mediaConstraints: {
      video: true,
      audio: true
    },
    // eslint-disable-next-line react/prop-types
    streamName: 'mergerStream21',
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
    roomName: new URLSearchParams(this.props.location.search).get('roomId'),
    // playOnly: true,
    isCameraOff: true,

    // buttons
    on_camera_disable: true,
    off_camera_disable: false,
    unmute_mic_disable: true,
    mute_mic_disable: false,
    join_disable: false,
    leaveRoom_disable: false,
    xindex: 0,
    yindex: 0,
    oldId: null
  }

  componentDidMount() {
    // console.log(this.props)
    var thiz = this
    window.addEventListener('beforeunload', function (event) {
      // this.alert('hisisisi')
      // if (!thiz.state.join_disable) {
      // thiz.leaveRoom()
      // }
      if (thiz.state.join_disable) {
        thiz.unpublish()
      }
    })
    this.getStreamed()
    this.webRTCAdaptor = this.intianteWebRTC()
  }

  unpublish = () => {
    videoService
      .endStream(this.streamId)
      .then(() => {
        this.leaveRoom()
      })
      .catch((err) => console.log('err', err))
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
    console.log('this.streamId', this.streamId)
    this.webRTCAdaptor.joinRoom(this.state.roomName, this.streamId)
    this.publishLive()
  }

  getStreamed = () => {
    videoService
      .getStreamed()
      .then((data) => {
        if (data.success) {
          console.log(data)
          this.setState({ streamName: data.stream_key })
          console.log('streamName', this.state.streamName)
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

  publishLive = (streamKey) => {
    videoService
      .editStream({
        key: this.state.streamName,
        status: 'LIVE',
        type: 'WEBCAM'
      })
      .then((data) => {
        console.log(data)
        notification.open({ message: 'Published successfully' })
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
        thiz.publish(thiz.publishStreamId)
        thiz.noStream = false
      } else {
        notification.open({
          message: 'There is no stream available in the room'
        })
        thiz.noStream = true
      }
    }, delayInMilliseconds)
  }

  publish(streamName, token) {
    this.publishStreamId = this.streamId
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
      '"controls autoplay playsinline></video>'
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

  remoteVideo = (streamId) => (
    <div className="flex flex-col" id={'player' + streamId}>
      <video id={'remoteVideo' + streamId} controls autoPlay></video>
    </div>
  )

  removeRemoteVideoxy = (streamId) => {
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
      localVideoId: 'localVideo',
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
          const tempRoomStreamList = []
          // Check stream is in room
          // PS: Old room list mean streams doesn't have own stream ID
          if (thiz.streamsList != null) {
            for (let i = 0; i < thiz.streamsList.length; i++) {
              const oldStreamListItem = thiz.streamsList[i]

              // const oldRoomItemIndex = streamsList.indexOf(oldStreamListItem)
              const newRoomItemIndex = obj.streams.indexOf(oldStreamListItem)

              // If streams item is in obj.streams, it's
              if (obj.streams.includes(oldStreamListItem)) {
                if (newRoomItemIndex > -1) {
                  obj.streams.splice(newRoomItemIndex, 1)
                }
                tempRoomStreamList.push(oldStreamListItem)
              } else {
                thiz.removeRemoteVideo(oldStreamListItem)
              }
            }
          }

          // Play new streams in list
          if (obj.streams != null) {
            obj.streams.forEach(function (item) {
              tempRoomStreamList.push(item)
              console.log('Stream joined with ID: ' + item)
              thiz.webRTCAdaptor.play(item, thiz.token, thiz.state.streamName)
            })
          }
          thiz.streamsList = tempRoomStreamList
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
      <div className="pt-16 bg-gray-800 text-white ">
        <HeaderHome></HeaderHome>
        <div className="flex flex-col w-full items-center h-screen">
          <h2 className="text-xl text-white py-2">
            ENJOY THE POWER OF CONFERENCE BROADCASTING
          </h2>

          <div className="video_player_container_merger">
            {/* first row */}
            <div className="video_player_content_merger">
              <div className="video_player_inner_merger">
                <video
                  src="https://assets.mixkit.co/videos/preview/mixkit-female-boxer-resting-after-her-training-40264-large.mp4"
                  id="localVideo"
                  className="videoPlayer_merger"
                  autoPlay
                  muted
                  playsinline
                ></video>
              </div>
            </div>
          </div>

          {/* video player container ends */}

          {/* <div className="flex items-start">
            <video
              id="localVideo"
              className="flex-1 my-6"
              autoPlay
              muted
              controls
              playsinline
            ></video>
            <div
              id="players"
              className="my-4 py-2 flex flex-1 flex-wrap-reverse"
            ></div>
          </div> */}

          <div className="my-4 z-10">
            <Button
              className="mx-4 px-5 py-2 text-center leading-3"
              type="primary"
              disabled={this.state.join_disable}
              onClick={(e) => this.joinRoom()}
              id="join_publish_Button"
            >
              Start
            </Button>
            <Button
              className="px-5 py-2 text-center leading-3"
              type="primary"
              onClick={(e) => window.close()}
              disabled={this.state.leaveRoom_disable}
              id="stop_publish_Button"
            >
              Stop
            </Button>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    )
  }
}

export default MergerConference
