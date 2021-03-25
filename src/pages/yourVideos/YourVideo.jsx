import { Button, message, Popconfirm, Space, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import videoService from '../../_services/video.service'
import SideNav from '../../partials/sideNav/SideNav'

const YourVideo = () => {
  const history = useHistory()
  const [videos, setvideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setpagination] = useState({
    current: 1,
    pageSize: 5
  })

  useEffect(() => {
    getVideos(pagination)
    return () => {}
  }, [])

  const columns = [
    {
      title: 'Video',
      dataIndex: 'thumbnial',
      key: 'thumbnial',
      width: 150,
      fixed: 'left',
      render: (text) => (
        <div className="hover:bg-blue-200 cursor-pointer">
          <img src={text} className="w-32" alt="thumbnail" />
        </div>
      )
    },
    {
      title: '',
      dataIndex: 'title',
      width: 200,
      fixed: 'left',
      key: 'title',
      render: (text, record) => <a onClick={(e) => editVideo(record)}>{text}</a>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (text) => (
        <div className="flex flex-col">
          <span>{moment(text).format('LL')}</span>
          <span className="font-extralight text-sm">Published</span>
        </div>
      )
    },
    {
      title: 'Price',
      dataIndex: 'video_price',
      key: 'video_price',
      width: 80,
      render: (text) => (
        <div>
          $ <span>{text}</span>
        </div>
      )
    },
    {
      title: 'View',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 70
    },
    {
      title: 'Likes',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 70
    },
    {
      title: 'Comments',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 70
    },

    {
      title: 'Action',
      key: 'action',
      width: 240,
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={(e) => editVideo(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this video?"
            onConfirm={(e) => deleteVideo(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
          <Popconfirm
            title={
              record.published
                ? 'Are you sure to unpublish this video?'
                : 'Are you sure to publish this video?'
            }
            onConfirm={(e) => publishVideo(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              className="w-24"
              type={record.published ? 'danger' : 'primary'}
            >
              {record.published ? 'Unpublish' : 'Publish'}
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  function cancel(e) {
    // console.log(e);
    // message.error('Click on No');
  }

  const editVideo = (video) => {
    history.push(`/edit/${video.id}`)
    // history.go(0);
  }

  const deleteVideo = (video) => {
    videoService
      .deleteVideo(video.id)
      .then((data) => {
        if (data) {
          message.success('Videos deleted!.')
          getVideos(pagination)
        }
      })
      .catch((err) => {
        message.error('Failed to delete!.')
        console.log(err)
      })
  }
  const publishVideo = (video) => {
    videoService
      .togglePublishVideo(video.id)
      .then((data) => {
        if (data) {
          message.success('Video Published!.')
          getVideos(pagination)
        }
      })
      .catch((err) => {
        message.error('Failed to delete!.')
        console.log(err)
      })
  }

  const getVideos = (query) => {
    setLoading(true)
    videoService
      .getVideos(query)
      .then((data) => {
        setLoading(false)
        setvideos(data.rows)
        setpagination({ ...query, total: data.count })
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const handleTableChange = (pagination, filters, sorter) => {
    getVideos(pagination)
  }
  return (
    <div>
      <SideNav />
      <div className="ml-20 mt-20 m-4">
        <div className="flex flex-col items-start m-4">
          <h2 className="text-xl text-gray-700 font-medium">
            Your Video Content{' '}
          </h2>
          <p className="font-normal text-gray-500">
            Analyse,Manage,Edit,Delete
          </p>
        </div>
        <Table
          scroll={{ x: 720 }}
          pagination={pagination}
          loading={loading}
          columns={columns}
          onChange={handleTableChange}
          rowKey={(record) => record.id}
          dataSource={videos}
        />
      </div>
    </div>
  )
}

export default YourVideo
