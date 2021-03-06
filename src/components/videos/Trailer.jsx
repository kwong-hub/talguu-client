import { UploadOutlined } from '@ant-design/icons'
import { Button, message, notification, Upload } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import videoService from '../../_services/video.service'

class Trailer extends Component {
  state = {
    fileList: [],
    uploading: false
  }

  resetForm = () => {
    this.setState({ fileList: [], uploading: false })
  }

  successMessage = () => {
    message.success('Successfully Uploaded')
  }

  failedMessage = () => {
    message.error('Failed to upload')
  }

  handleUpload = () => {
    this.setState({
      uploading: true
    })
    const { fileList } = this.state
    const fileName =
      Date.now() + 'trailer' + '.' + fileList[0].name.split('.')[1]

    let trailer

    videoService
      .getUploadUrl({ fileName })
      .then((res) => {
        const options = { ...res.signedRequest.fields }
        const formData = new FormData()
        Object.keys(options).map((key) => {
          formData.append(key, options[key])
          return key
        })
        // console.log(fileList);
        formData.append('file', fileList[0])
        trailer = res.signedRequest.url + '/' + fileName
        return videoService.uploadVideoToS3(res.signedRequest.url, formData, {
          ...res.config
        })
      })
      .then((res) => {
        return videoService.updateVideo({ id: this.props.videoId, trailer })
      })
      .then((res) => {
        this.setState({ uploading: false, uploaded: false })
        this.resetForm()
        this.successMessage()
      })
      .catch(() => {
        this.resetForm()
        this.failedMessage()
      })
  }

  render() {
    const { uploading, fileList } = this.state
    const propsVideo = {
      accept: 'video/*, .mkv',
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file)
          const newFileList = state.fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList
          }
        })
      },
      beforeUpload: (file) => {
        if (file.size > 100000000) {
          notification.info({
            message: 'Max file size is 100MB.',
            placement: 'bottomRight',
            duration: 3.3
          })
          return false
        } else if (!file.type.toString().startsWith('video')) {
          notification.info({
            message:
              'Unsupported file type! File type should be .MP4 .MOV, .MKV .MPEG',
            placement: 'bottomRight',
            duration: 3.3
          })
          return false
        }

        this.setState((state) => ({
          fileList: [file]
        }))
        return false
      },
      fileList
    }
    return (
      <div>
        <Upload accept=".mp4" {...propsVideo} className="flex my-4 w-auto">
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        {fileList.length !== 0 && (
          <Button
            className="flex my-4 w-auto"
            type="primary"
            onClick={this.handleUpload}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        )}
      </div>
    )
  }
}

Trailer.propTypes = {
  videoId: PropTypes.any
}

export default Trailer
