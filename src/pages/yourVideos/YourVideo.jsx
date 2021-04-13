import { Button, message, Popconfirm, Space, Table, Tabs } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import videoService from '../../_services/video.service'
import SideNav from '../../partials/sideNav/SideNav'
const { TabPane } = Tabs
const YourVideo = () => {
  const history = useHistory()
  const [videos, setvideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setpagination] = useState({
    current: 1,
    pageSize: 5
  })
  const [key, setkey] = useState(0)

  useEffect(() => {
    console.log(key)
    getVideos({ ...pagination, streamed: key })
    return () => {}
  }, [key])

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100
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
          {record.status !== 'PENDING' && record.status !== 'FAILED' && (
            <Popconfirm
              title={
                record.status === 'PUBLISHED'
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
                type={record.status === 'PUBLISHED' ? 'danger' : 'primary'}
              >
                {record.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
              </Button>
            </Popconfirm>
          )}
          {record.status === 'PENDING' && (
            <Button type="primary">Processing</Button>
          )}
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
          message.success('Video is deleted Successfull!.')
          getVideos({ ...pagination, streamed: key })
        }
      })
      .catch((err) => {
        message.error('Failed to delete!.')
        console.log(err)
      })
  }
  const publishVideo = (video) => {
    if (!video.trailer || !video.thumbnial) {
      message.info(
        'Video should have trailer and thumbnail before publish, edit add thumbnail and trailer.'
      )
      return
    }
    videoService
      .togglePublishVideo(video.id)
      .then((data) => {
        if (data.success) {
          message.success('Video changed successfull!.')
          getVideos({ ...pagination, streamed: key })
        } else {
          message.success('Video Failed to changed!.')
        }
      })
      .catch((err) => {
        message.error('Failed to change!.')
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
    getVideos({ ...pagination, streamed: false })
  }
  const currentKey = (skey) => {
    setkey(parseInt(skey))
    // getVideos({ ...pagination, streamed: key })
  }
  return (
    <div>
      <SideNav />
      <div className="sm:ml-16 mt-20 m-4">
        <div className="flex flex-col items-start m-2">
          <h2 className="text-xl text-gray-700 font-medium">
            Your Video Content{' '}
          </h2>
          <p className="font-normal text-gray-500">
            Analyse,Manage,Edit,Delete
          </p>
        </div>
        <Tabs className="m-2" defaultActiveKey="0" onChange={currentKey}>
          <TabPane tab="Uploaded" key="0">
            <Table
              scroll={{ x: 720 }}
              pagination={pagination}
              loading={loading}
              columns={columns}
              onChange={handleTableChange}
              rowKey={(record) => record.id}
              dataSource={videos}
            />
          </TabPane>
          <TabPane tab="Live" key="1">
            <Table
              scroll={{ x: 720 }}
              pagination={pagination}
              loading={loading}
              columns={columns}
              onChange={handleTableChange}
              rowKey={(record) => record.id}
              dataSource={videos}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default YourVideo
