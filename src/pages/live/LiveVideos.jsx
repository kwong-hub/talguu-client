import './LiveVideos.css'

import { Modal, Radio, Tooltip } from 'antd'
import React, { Component } from 'react'
import { FaDollarSign, FaPlayCircle } from 'react-icons/fa'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import mastercard from '../../assets/images/mastercard.png'
import visa from '../../assets/images/visa.png'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import SideNav from '../../partials/sideNav/SideNav'
import { PURCHASE_VIDEO_ASYNC, VIEWER_LIVE_ASYNC } from '../../redux/types'
import { liveVideoURL } from '../../config/config'

export class LiveVideos extends Component {
  state = {
    videos: [],
    currentVideo: null,
    autoplay: false,
    paymentModalVisible: false,
    tempVideo: {},
    paymentMethod: 'mastercard',
    currentLive: null
  }

  constructor(props) {
    super(props)
    this.playerRef = React.createRef()
    props.dispatch({ type: VIEWER_LIVE_ASYNC, payload: '' })
    // console.log(this.props.liveVideos);
  }

  paymentMethodChange = (event) => {
    this.setState({ paymentMethod: event.target.value })
  }

  playVideo = (video) => {
    // console.log("video", video);
    this.setState({ currentLive: video })
  }

  playTrailer = (video) => {
    // console.log(video);
  }

  onSearch = (value) => {
    // console.log(value);
  }

  scrollToPlayer = () => this.playerRef.current.scrollIntoView()

  saveLater = (event) => {
    event.stopPropagation()
  }

  paymentModalVisible = (value, video, event) => {
    if (event) event.stopPropagation()
    if (!localStorage.getItem('user')) this.props.history.push('/login')
    if (video && video.paid) {
      this.props.history.push(`/watch/${video.id}`)
    } else {
      if (value) this.setState({ paymentModalVisible: value, tempVideo: video })
      else this.setState({ paymentModalVisible: value })
    }
  }

  purchaseVideo = (id) => {
    this.props.dispatch({ type: PURCHASE_VIDEO_ASYNC, payload: id })
    this.playVideo({
      ...this.state.tempVideo,
      video_link: this.props.video_link
    })
    this.paymentModalVisible(false)
  }

  renderVideos = () => {
    return this.props.liveVideos.length === 0 ? (
      <>
        <div
          className={
            'flex justify-center w-full p-2 cursor-pointer video_thumbnail self-stretch'
          }
        >
          <p className="text-gray-600 text-md py-4 w-96">
            Currently there is no live video.
          </p>
        </div>
      </>
    ) : (
      this.props.liveVideos.map((video) => {
        video.paid = true
        video.viewCount = 0
        return (
          <div
            key={video.stream_key}
            onClick={() => this.playVideo(video)}
            className={`flex-col w-full md:w-4/12 lg:w-3/12 ${
              this.state.currentVideo ? 'lg:w-full' : ''
            } sm:w-6/12 p-2 cursor-pointer video_thumbnail self-stretch`}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt=""
                className="min-w-full min-h-full"
              />
              <div className="absolute thumbnail_button_container">
                <Tooltip
                  placement="bottom"
                  title={video.paid ? '' : 'Watch Trailer'}
                >
                  <FaPlayCircle className="text-gray-600 thumbnail_button" />
                </Tooltip>
              </div>
              {/* <div
              onClick={(event) => this.saveLater(event)}
              className="watch_later bg-gray-700 p-2 rounded-sm absolute right-2 top-2 bg-opacity-25">
              <FaClock className="text-white text-base" />
            </div> */}
              {/* <div className="bg-gray-600 rounded-sm absolute bottom-1 right-1 py-0 px-4 bg-opacity-40"></div>
            {video.paid ? (
              ""
            ) : (
              <div className="absolute bottom-1 left-1 py-0 invisible watch_video_buttons">
                <Button
                  onClick={(event) => this.paymentModalVisible(true, video, event)}
                  className="mr-1 rounded-2xl text-xs px-2 py-0 opacity-80">
                  Watch Full Video
                </Button>
              </div>
            )}
            {!video.paid ? (
              <div className="flex items-center bg-white text-gray-700 rounded-sm absolute top-1 left-1 py-0 px-4">
                <FaDollarSign className="text-gray-700 text-xs" /> {0.23}
              </div>
            ) : (
              ""
            )} */}
              {/* <div className="flex items-center bg-white text-gray-700 rounded-sm absolute bottom-1 right-1 py-0 px-4">
              {moment(video?.video_duration?.split(".")[0], [
                moment.ISO_8601,
                "HH:mm:ss",
              ]).format("H:m:ss")}
            </div> */}
            </div>
            <div className="flex-col">
              <h4 className="my-2 text-left text-md text-gray-600 video_title">
                {video.title}
              </h4>
              <div className="flex">
                <span className="flex items-center text-gray-400 cursor-pointer hover:text-blue-400 text-lg ml-2">
                  {video.viewCount} views
                </span>
              </div>
            </div>
          </div>
        )
      })
    )
  }

  renderPaymentModal = () => {
    return (
      <Modal
        className="max-w-xs h-auto px-5 opacity-95"
        centered
        closable={false}
        mask={false}
        footer={null}
        visible={this.state.paymentModalVisible}
        onOk={() => this.paymentModalVisible(false)}
        onCancel={() => this.paymentModalVisible(false)}
      >
        <div className="absolute -left-8 top-1 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
          <FaDollarSign /> {0.23}
        </div>
        <h3 className="text-gray-600 uppercase text-center w-full text-lg mb-3">
          Payment
        </h3>
        <div>
          <img src={this.state.tempVideo.thumbnial} alt="" />
        </div>
        <Radio.Group
          onChange={this.paymentMethodChange}
          value={this.state.paymentMethod}
          className="w-full flex-col my-2"
        >
          <Radio
            className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
            value="mastercard"
          >
            <img src={mastercard} alt="" className="h-10 ml-1" />
            <span className="ml-1">Mastercard</span>
          </Radio>

          <Radio
            className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
            value="visa"
          >
            <img src={visa} alt="" className="h-10 ml-1" />{' '}
            <span className="ml-1">Visa</span>
          </Radio>
        </Radio.Group>
        <p className="text-gray-700 text-xs text-center w-full mb-2">
          Notice: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          illo quas, facilis
        </p>
        <div
          onClick={() => this.purchaseVideo(this.state.tempVideo.id)}
          className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button"
        >
          Pay <FaDollarSign />
          {0.23}
        </div>
      </Modal>
    )
  }

  render = () => {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      aspectRatio: '21:9',
      responsive: true,
      sources: [
        {
          src: `${liveVideoURL}/hls/${this.state.currentLive?.stream_key}.m3u8`,
          type: 'application/x-mpegURL'
        }
      ],
      randomStr: new Date().getTime().toString()
    }
    return (
      <div className="pt-4 ml-0 sm:ml-14" ref={this.playerRef}>
        <SideNav></SideNav>
        <div className="flex relative items-end px-4 py-4 mt-16 sm:mt-24 -mb-10 sm:mb-0">
          <p className="absolute text-lg font-semibold text-blue-700">
            Live Videos
          </p>
        </div>
        {this.state.currentLive && (
          <div className="flex flex-col items-start ml-2 my-6 sm:max-w-full lg:max-w-3xl xl:max-w-4xl">
            <VideoPlayer {...videoJsOptions}></VideoPlayer>
            <p className="text-xl py-2 ">{this.state.currentLive?.title}</p>
          </div>
        )}
        <div className="flex relative mt-12 md:mt-0 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
          {this.renderVideos()}
        </div>
        {this.renderPaymentModal()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    liveVideos: state.video.liveVideos,
    video_link: state.video.video_link
  }
}

LiveVideos.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  video_link: PropTypes.string,
  liveVideos: PropTypes.any
}

export default connect(mapStateToProps, null)(withRouter(LiveVideos))
