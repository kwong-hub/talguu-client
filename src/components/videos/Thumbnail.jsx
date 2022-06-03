import { Button, message, Modal, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { Component } from 'react'
import { FaPlus } from 'react-icons/fa'
import PropTypes from 'prop-types'

import videoService from '../../_services/video.service'

const intialState = {
  formatError: '',
  uploading: false,
  uploaded: false,
  previewVisible: false,
  previewImage: '',
  previewTitle: '',
  previousImage: false,
  previousImageUrl: '',

  fileList: []
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export class Thumbnail extends Component {
  state = intialState
  beforeCrop = (file) => {
    this.setState(intialState)
    if (file.size > 1000000) {
      this.setState({ formatError: 'Max file size is 1MB.' })
      return false
    } else if (
      file.type !== 'image/png' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'images/jpg'
    ) {
      this.setState({
        formatError: 'Unsupported file type! File type should be .png .jpeg, .jpg'
      })
      return false
    }
    return true
  }

  handleCancel = () => this.setState({ previewVisible: false })

  componentDidMount() {
    if (this.props.thumbnails) {
      this.setState({
        previousImage: true,
        previewImageUrl: this.props.thumbnails
        // uploading: false,
      })
    }
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }

  handleChange = ({ fileList }) => {
    this.setState({ uploading: true })
    this.setState({ fileList })
  }

  successMessage = () => {
    message.success('Successfully Uploaded')
  }

  onUpload = () => {
    this.setState({ uploaded: true })
    const fileName = Date.now() + 'image' + '.' + this.state.fileList[0].name.split('.')[1]
    const callBack = (res) => {
      // console.log(res);
    }

    let thumbnial

    videoService
      .getUploadUrl({ fileName })
      .then((res) => {
        const options = { ...res.signedRequest.fields }
        const formData = new FormData()
        Object.keys(options).map((key) => {
          formData.append(key, options[key])
          return key
        })
        formData.append('file', this.state.fileList[0].originFileObj)
        thumbnial = res.signedRequest.url + '/' + fileName
        return videoService.uploadVideoToS3(res.signedRequest.url, formData, {
          ...res.config,
          onUploadProgress: callBack
        })
      })
      .then((res) => {
        // console.log(res);
        return videoService.updateVideo({ id: this.props.videoId, thumbnial })
      })
      .then((res) => {
        this.setState({ uploading: false, uploaded: false })
        this.successMessage()
      })
  }

  render() {
    // console.log(this.props);
    const { previewVisible, previewImage, fileList, previewTitle } = this.state
    const uploadButton = (
      <div>
        <FaPlus />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
    return (
      <>
        <div className="flex items-center justify-center">
          {/* 245 / 164 */}
          {this.props.thumbnails && (
            <img src={this.props.thumbnails} className="max-h-24" alt="thumbnail" />
          )}
          <ImgCrop rotate aspect={this.props.videoType==="LAUGHTER" ? (270 / 480) : (245 / 164)} beforeCrop={this.beforeCrop}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              className="w-auto m-2"
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </ImgCrop>
        </div>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <p className="bg-gray-100 text-red-600 text-sm">
          {this.state.formatError}
        </p>
        {this.state.uploading && (
          <Button
            className="flex my-4 w-auto"
            type="primary"
            onClick={this.onUpload}
            loading={this.state.uploaded}
            style={{ marginTop: 16 }}
          >
            {this.state.uploaded ? 'Uploading' : 'Start Upload'}
          </Button>
        )}
      </>
    )
  }
}

Thumbnail.propTypes = {
  thumbnails: PropTypes.any,
  videoId: PropTypes.any
}

export default Thumbnail
