import { Button, Form, Input, message, PageHeader, Spin } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy, FaInfo } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

// import { liveVideoURL } from '../../environment/config'
import videoService from '../../_services/video.service'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import SideNav from '../../partials/sideNav/SideNav'
import ThumbnailStream from '../../components/stream/Thumbnail-stream'

const Stream = (props) => {
  const [property, setProperty] = useState(props.location.state?.data)
  // console.log("property", property);
  // const [streamKey] = useState(property?.stream_key)
  // const [title, setTitle] = useState(property?.title)
  // const [describe, setDescribe] = useState(property?.description)
  const [streamURL] = useState('rtmp://8mspaa.com/show')
  const history = useHistory()
  useEffect(() => {
    getStreamed()
    return () => {}
  }, [])
  const saveStreamInfo = (values) => {
    videoService
      .editStream({ key: property.stream_key, ...values })
      .then((data) => {
        if (data === true) {
          message.success('Saved successfully')
        } else {
          message.error('Unable to save')
        }
      })
      .catch((err) => console.log('err', err))
  }
  const copiedMessage = () => {
    message.info('Copied!')
  }
  const endStream = () => {
    videoService
      .endStream(property?.stream_key)
      .then(() => history.push('/live_video'))
      .catch((err) => console.log('err', err))
  }
  const getStreamed = () => {
    videoService
      .getStreamed()
      .then((data) => {
        if (data.success) {
          setProperty(data)
        } else {
          history.push('/stream_video')
        }
      })
      .catch((err) => {
        console.log(err)
        history.push('/stream_video')
      })
  }
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: '16:9',
    responsive: true,
    sources: [
      {
        src: `/hls/${property?.stream_key}.m3u8`,
        type: 'application/x-mpegURL'
      }
    ],
    randomStr: new Date().getTime().toString()
  }
  return (
    <div>
      <div className="ml-0 mt-24 sm:mt-20 sm:ml-12 relative">
        <SideNav />
        {/* <Header /> */}
        {property ? (
          <>
            <PageHeader
              className="site-page-header"
              onBack={() => history.push('/')}
              title="Live"
              subTitle="Add extra additional infromation"
            />
            <Button
              className="absolute top-12 md:top-3 right-2"
              onClick={(e) => endStream()}
              key="1"
              type="danger"
            >
              End Stream
            </Button>
            <div className="flex flex-col md:flex-row mx-4">
              <div className="w-full md:w-2/5 p-4 ">
                <VideoPlayer {...videoJsOptions} />
                <p className="py-2">
                  Start streaming your video from your software to go live.
                </p>
                <div className="flex flex-col items-start my-4">
                  <h2 className="text-lg font-semibold">Stream Setting</h2>
                  <div className="flex flex-col items-start my-2">
                    <span>Stream Key</span>
                    <Input
                      readOnly
                      value={property?.stream_key}
                      suffix={
                        <CopyToClipboard
                          text={property?.stream_key}
                          onCopy={() => copiedMessage()}
                        >
                          <span className="cursor-pointer">
                            <FaCopy />
                          </span>
                        </CopyToClipboard>
                      }
                    />
                  </div>
                  <div className="flex flex-col items-start my-2">
                    <span>Stream URL</span>
                    <Input
                      readOnly
                      value={streamURL}
                      suffix={
                        <CopyToClipboard
                          text={streamURL}
                          onCopy={() => copiedMessage()}
                        >
                          <span className="cursor-pointer">
                            <FaCopy />
                          </span>
                        </CopyToClipboard>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-3/5">
                <Form
                  layout="vertical"
                  name="normal_login"
                  className="login-form"
                  initialValues={{
                    title: property?.title,
                    description: property?.description
                  }}
                  onFinish={saveStreamInfo}
                >
                  <Form.Item
                    label="Title"
                    name="title"
                    className="text-lg text-gray-600"
                    rules={[
                      { required: true, message: 'Please input your Title!' }
                    ]}
                  >
                    <Input
                      className="rounded-lg text-gray-700 text-lg p-2"
                      placeholder="Title*"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: false,
                        message: 'Please input your Description!'
                      }
                    ]}
                  >
                    <TextArea
                      className="rounded-lg text-gray-700 text-lg p-2"
                      prefix={<FaInfo className="site-form-item-icon" />}
                      placeholder="Description*"
                    />
                  </Form.Item>
                  <div className="flex justify-end">
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        className="login-form-button "
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </div>
                </Form>

                <div>
                  <div className="flex flex-col items-start justify-start">
                    <h2 className="text-lg">Thumbnail</h2>
                    <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                      Select or upload a picture that shows what&apos;s in your
                      video. A good thumbnail stands out and draws viewers&apos;
                      attention.
                    </h3>
                    <ThumbnailStream
                      stream_key={property?.stream_key}
                      thumbnails={property?.thumbnail}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/5 flex flex-col items-center">
                <h2 className="font-semibold text-base">Stream Analytics</h2>
                <div>
                  <div className="rounded-lg w-32 p-4 m-2 shadow-lg bg-white ">
                    <b>0</b>
                    <p>Current Views </p>
                  </div>
                  <div className="rounded-lg w-32 p-4 m-2 shadow-lg bg-white ">
                    <b>0</b>
                    <p>Current Likes </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Spin
            size="large"
            className="flex items-center justify-center h-screen text-4xl"
          />
        )}
      </div>
    </div>
  )
}

Stream.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      data: PropTypes.any
    })
  })
}

export default Stream
