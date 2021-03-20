import { Button, message, Popconfirm, Space, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import videoService from '../../_services/video.service'
import SideNav from '../../partials/sideNav/SideNav'

const YourVideo = () => {
  const history = useHistory()
  const [videos, setvideos] = useState([])
  const [loading] = useState(false)
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
        <div className='hover:bg-blue-200 cursor-pointer'>
          <img src={text} className='w-32' alt='thumbnail' />
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
      width: 150,
      render: (text) => (
        <div className='flex flex-col'>
          <span>{moment(text).format('LL')}</span>
          <span className='font-extralight text-sm'>Published</span>
        </div>
      )
    },
    {
      title: 'Price',
      dataIndex: 'video_price',
      key: 'video_price',
      width: 90,
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
      width: 100
    },
    {
      title: 'Likes',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 100
    },
    {
      title: 'Comments',
      dataIndex: 'likeCount',
      key: 'likeCount',
      width: 120
    },

    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (text, record) => (
        <Space size='middle'>
          <Button onClick={(e) => editVideo(record)}>Edit</Button>
          <Popconfirm
            title='Are you sure to delete this video?'
            onConfirm={(e) => deleteVideo(record)}
            onCancel={cancel}
            okText='Yes'
            cancelText='No'>
            <Button>Delete</Button>
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

  const getVideos = (query) => {
    videoService
      .getVideos(query)
      .then((data) => {
        // console.log("data", data);
        setvideos(data.rows)
        setpagination({ ...query, total: data.count })
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const handleTableChange = (pagination, filters, sorter) => {
    getVideos(pagination)
  }
  return (
    <div>
      <SideNav />
      <div className='ml-20 mt-20 m-4'>
        <div className='flex flex-col items-start m-4'>
          <h2 className='text-xl text-gray-700 font-medium'>Your Video Content </h2>
          <p className='font-normal text-gray-500'>Analyse,Manage,Edit,Delete</p>
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
