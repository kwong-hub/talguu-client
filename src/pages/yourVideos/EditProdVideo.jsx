import { Button, Input, PageHeader } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FaDollarSign, FaInfo } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router-dom'

import videoService from '../../_services/video.service'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import Thumbnail from '../../components/videos/Thumbnail'
import Trailer from '../../components/videos/Trailer'
import SideNav from '../../partials/sideNav/SideNav'

const EditProdVideo = (props) => {
  const history = useHistory()
  const { vidId } = useParams()
  const [video, setVideo] = useState(props.location.state)
  const [title, setTitle] = useState(video?.title)
  const [describe, setDescribe] = useState(video?.describe)
  const [price, setPrice] = useState(0.23)
  useEffect(() => {
    if (vidId) {
      getVideoById(vidId)
      window.scrollTo(0, 0)
    }
    return () => {}
  }, [])

  const getVideoById = (id) => {
    console.log(id, 'from get video by id')
    videoService
      .getProdVideoById(id)
      .then((data) => {
        setVideo(data)
        setTitle(data.title)
        setDescribe(data.describe)
        setPrice(data.video_price)
      })
      .catch((err) => console.log('err', err))
  }

  const editVideo = () => {
    videoService
      .updateVideo({
        id: video.id,
        title: title,
        describe: describe,
        video_price: price
      })
      .then((data) => {
        if (data[0]) {
          history.push('/your_video')
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    aspectRatio: '16:9',
    responsive: true,
    sources: [
      {
        src: video?.video_link,
        type: video?.video_type
      }
    ]
  }
  return (
    <div className="ml-0 sm:ml-16 mt-24 sm:mt-16 relative">
      <SideNav />
      {/* <Header /> */}
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Edit Video"
        subTitle="Add extra additional infromation"
      />
      <Button
        className="absolute top-12 sm:top-3 right-2"
        onClick={editVideo}
        key="1"
        type="primary"
      >
        Save Changes
      </Button>
      <div className="flex flex-col-reverse sm:flex-row mx-4">
        <div className="w-full">
          <div className="my-4">
            <span className="flex text-lg text-gray-600">Title</span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2"
              placeholder="Title*"
            />
          </div>

          <div className="my-4">
            <span className="flex text-lg text-gray-600">Description</span>
            <TextArea
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2   "
              prefix={<FaInfo className="site-form-item-icon" />}
              placeholder="Description*"
            />
          </div>

          <div className="my-4">
            <span className="flex text-lg text-gray-600">Price</span>

            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-lg text-gray-700 text-lg p-2"
              prefix={<FaDollarSign className="site-form-item-icon" />}
              placeholder="0.23"
            />
          </div>

          <div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Change Thumbnail</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a picture that shows what&apos;s in your video.
                A good thumbnail stands out and draws viewers&apos; attention.
              </h3>
              <Thumbnail videoId={video?.id} thumbnails={video?.thumbnial} />
            </div>
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-lg">Change Trailer</h2>
              <h3 className="text-md text-gray-600 items-start m-0 p-0 text-justify">
                Select or upload a trailer that shows what&apos;s in your video
                in a minute. A good trailer draws viewers&apos; attention.
              </h3>
              <Trailer videoId={video?.id} />
              {video?.trailer && (
                <div className="w-2/3 lg:w-2/6 p-4 ">
                  <VideoPlayer
                    {...{
                      ...videoJsOptions,
                      sources: [
                        { src: video?.trailer, type: video?.video_type }
                      ],
                      randomStr: new Date().getTime().toString()
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {video && video.video_link && (
          <div className="w-3/4 p-4 ">
            <VideoPlayer {...videoJsOptions} />
          </div>
        )}
      </div>
    </div>
  )
}

EditProdVideo.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string
  })
}

export default EditProdVideo
