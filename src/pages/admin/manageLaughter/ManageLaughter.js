import { Table } from 'antd'
import React from 'react'
import Home from '../Home'

const ManageLaughter = () => {
  const columns = [
    {
      title: 'Laughter',
      dataIndex: 'video',
      key: 'video',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Views',
      key: 'views',
      dataIndex: 'views'
    },
    {
      title: 'Likes',
      key: 'likes',
      dataIndex: 'likes'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex gap-2">
          <button className="px-3 py-1 text-white bg-yellow-400 rounded-md">Edit</button>
          <button className="px-3 py-1 text-white bg-red-400 rounded-md">Delete</button>
          <button className="px-3 py-1 text-white bg-red-400 rounded-md">Publish</button>

        </div>
      ),
    },
  ];


  const data = [
    {
      key: '1',
      video: 'video source here',
      date: "2022-05-12",
      price: "0.23",
      views: '1234K',
      likes: '23K',
      status: 'PUBLISHED'
    },
    {
      key: '2',
      video: 'video source here',
      date: "2022-05-12",
      price: "0.23",
      views: '1234K',
      likes: '23K',
      status: 'PUBLISHED'
    },
    {
      key: '3',
      video: 'video source here',
      date: "2022-05-12",
      price: "0.23",
      views: '1234K',
      likes: '23K',
      status: 'PUBLISHED'
    },
    {
      key: '4',
      video: 'video source here',
      date: "2022-05-12",
      price: "0.23",
      views: '1234K',
      likes: '23K',
      status: 'PUBLISHED'
    },
  ];
  return (
    <Home>
      <div className="p-5">
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </Home>
  )
}

export default ManageLaughter