import { Button, message, notification, Progress } from 'antd'
import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa'
import { RiArrowRightCircleLine } from 'react-icons/ri'
import { AiOutlineInbox } from 'react-icons/ai'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import videoService from '../../_services/video.service'
import SideNav from '../../partials/sideNav/SideNav'
import Dragger from 'antd/lib/upload/Dragger'

import { Select } from 'antd'

// const { Dragger } = Upload;
const initialState = {
  file: null,
  fileSelected: false,
  drag: false,
  upload: false,
  title: 'Title of the video',
  describe: '',
  files: {},
  progress: 0,
  active: ''
}

class UploadVideo extends Component {
  fileList = []
  Option = Select.Option

  state = {
    file: null,
    fileSelected: false,
    drag: false,
    upload: false,
    title: 'Title of the video',
    describe: '',
    files: {},
    progress: 0,
    videoType: 'VIDEO',
    active: '',
    uploadProps: {
      accept: '.mp4, .flv, .mkv, .mpeg, .mov',
      name: 'file',
      multiple: false,
      action: '',
      showUploadList: true,
      customRequest: (data) => {
        return this.fileSelected(data.file)
      }
    },
    video: {}
  }

  cancelUpload = () => {
    this.setState(initialState)
  }

  handleChange = (value) => {
    this.setState({
      videoType: value
    })
  }

  uploadFileS3 = () => {
    const arr = this.state.file.name.split('.')
    const fileType = arr[arr.length - 1]
    const fileName = Date.now() + 'video' + '.' + fileType
    const callBack = (res) => {
      this.setState({ progress: Math.ceil((res.loaded / res.total) * 100) })
    }
    videoService
      .getUploadUrl({ fileName })
      .then((res) => {
        const options = { ...res.signedRequest.fields }
        const formData = new FormData()
        Object.keys(options).map((key) => {
          formData.append(key, options[key])
          return key
        })
        formData.append('file', this.state.file)
        return videoService.uploadVideoToS3(res.signedRequest.url, formData, {
          ...res.config,
          onUploadProgress: callBack
        })
      })
      .then((res) => {
        // console.log(res);
        const videoLink = res.config.url + '/' + fileName
        const { title, describe, videoType } = this.state
        const { size, type } = this.state.file
        const videoObj = {
          video_link: videoLink,
          title,
          describe,
          video_size: size,
          video_type: type,
          type: videoType
        }
        return videoService.addVideo(videoObj)
      })
      .then((res) => {
        const videOb = {...res.data.video}
        this.setState({ video: videOb })

        this.props.history.push({
          pathname: '/finish-upload',
          state: {video: this.state.video}
        })
      })
      .catch((err) => console.log(err))
  }

  fileSelected = (file) => {
    this.setState({ file, fileSelected: true })
  }

  errorMessage = (msg) => {
    message.error(msg)
  }

  handleOnclick = (e) => {
    this.fileInput.current.click()
  }

  resetState() {
    this.setState(initialState)
  }

  checkFile = () => {
    if (this.state.file.size > 1200000000) {
      notification.info({
        message: 'File size should be less than 1.5GB.',
        placement: 'bottomRight',
        duration: 3.3
      })
      return false
    } else if (!this.state.file.type.toString().startsWith('video')) {
      notification.info({
        message: 'Unsupported file type! File type should be video',
        placement: 'bottomRight',
        duration: 3.3
      })
      return false
    }
    return true
  }

  submit = (e) => {
    e.preventDefault()
    if (!this.state.title || !this.state.describe || !this.state.file) {
      this.errorMessage('Please fill required filled first')
      return
    }
    if (!this.checkFile()) return
    this.uploadFileS3()
  }

  nextClick = (to) => {
    this.setState({ active: to })
    this.props.history.push({
      pathname: '/finish-upload',
      state: {video: this.state.video}
    })
  }

  uploadButton = () => (
    <div>
      <FaPlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  render() {
    return (
      <>
        <SideNav></SideNav>
        <div className="flex flex-col mt-20 m-4 mx-auto w-full max-w-4xl justify-center ">
          <div className="flex justify-around mx-4 my-4 ">
            <p className="text-2xl text-gray-600 m-2">
              One Step to Publish your video!{' '}
            </p>
          </div>

          {!this.state.progress > 0 && this.state.active === '' && (
            <div>
              <form
                onSubmit={this.submit}
                className="flex flex-col w-full items-center my-8 text-md text-gray-500"
              >
                <div className="w-full p-2">
                  {!this.state.fileSelected && (
                    <Dragger
                      className="max-w-lg mx-auto"
                      {...this.state.uploadProps}
                    >
                      <p className="flex w-full justify-center ant-upload-drag-icon">
                        <AiOutlineInbox className="text-4xl font-bold" />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Be sure to upload only video files like .mp4 .flv .mkv
                        .mpeg .mov...
                      </p>
                    </Dragger>
                  )}
                  {this.state.fileSelected && (
                    <div className="mx-auto flex justify-center items-center border-2 border-gray-200 p-2 max-w-lg flex-wrap">
                      {this.state.file.name}
                      <div className="w-48 m-1">
                        <Button onClick={this.cancelUpload} danger>
                          Select a new file
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 w-3/4">
                  <label className="flex flex-col sm:flex-row items-baseline w-3/4 my-2">
                    Select Type
                    <Select
                      placeholder="Select video type"
                      defaultValue="VIDEO"
                      onChange={this.handleChange}
                      style={{
                        width: '30%',
                        paddingLeft: 10
                      }}
                    >
                      <Select.Option value="VIDEO">VIDEO</Select.Option>
                      <Select.Option value="LAUGHTER">LAUGHTER</Select.Option>
                    </Select>
                  </label>

                  <label className="flex flex-col sm:flex-row items-baseline w-full">
                    Title
                    <input
                      className="border p-2 m-2 w-full rounded-xl focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                      type="text"
                      value={this.state.title}
                      onChange={(e) => {
                        this.setState({ title: e.target.value })
                      }}
                    />
                  </label>

                  <label className="flex flex-col sm:flex-row items-baseline w-full">
                    Description
                    <textarea
                      className="border w-full p-1 m-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                      type="text"
                      value={this.state.describe}
                      onChange={(e) => {
                        this.setState({ describe: e.target.value })
                      }}
                    ></textarea>
                  </label>
                </div>
                <Button
                  size={60}
                  type="primary"
                  shape="round"
                  icon={<RiArrowRightCircleLine />}
                  onClick={this.submit}
                  className="w-64 my-4 py-5 flex justify-center items-center text-md p-4 transform hover:scale-110 motion-reduce:transform-none"
                >
                  Next
                </Button>
              </form>
            </div>
          )}
        </div>

        {this.state.progress > 0 && this.state.active === '' && (
          <div className="flex-col justify-center mt-4 w-64 mx-auto">
            <p className="text-gray-500 font-thin text-base">Uploading file</p>
            <Progress
              type="line"
              percent={this.state.progress}
              status="active"
            />
          </div>
        )}
      </>
    )
  }
}

const mapStateToProps = (props) => {
  // console.log(props);
  return {
    ...props.video
  }
}

UploadVideo.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}

export default withRouter(connect(mapStateToProps, null)(UploadVideo))
