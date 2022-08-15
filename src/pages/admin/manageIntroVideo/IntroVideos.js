import { Table } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import Home from '../Home'

const IntroVideos = () => {

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
      render: (price) => (
      <div>
        $ <span>{price}</span>
      </div>
    )
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
      dataIndex: 'status',
      render:(status) => (
        <div className = {`${status === "PUBLISHED" ? "text-blue-500" : "text-red-400"}`}>
            {status}
        </div>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="flex gap-2">
          <button className="px-3 py-1 text-yellow-400 hover:text-gray-900 outline-gray">Edit</button>
          <button className="px-3 py-1 text-red-400  hover:text-gray-900 outline-gray">Delete</button>
          <button className="px-3 py-1 text-blue-400 hover:text-gray-900 outline-gray">Publish</button>
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
      <div className="p-5 flex flex-col m-4">
      
        <div className="flex items-center justify-between">
               <div className="flex flex-col items-start">
            <h2 className="text-xl text-gray-700 font-medium">
              Intro Video Content{' '}
            </h2>
            <p className="font-normal text-gray-500">
              Analyze,Manage,Edit,Delete
            </p>
          </div>
          <Link
            to={'/admin-upload-intro-video'}
            className="outline outline-offset-2 outline-1 border-2 p-2 rounded-xl text-gray-100 bg-blue-500 hover:text-gray-300">
            Upload Intro
          </Link>
        </div>
      
        <div className="mt-3">
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </Home>
  )
}

export default IntroVideos