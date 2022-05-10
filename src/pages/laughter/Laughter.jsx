import { Spin } from 'antd'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SideNav from '../../partials/sideNav/SideNav'
import { laughterService } from '../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'
import HomeContainer from './home/HomeContainer'

import {statusData, sidebarItems} from './sidebarItems'

import './laughter_style.css'

const Laughter = () => {



  const history = useHistory()
  let page = 1

  const [pageSize, setPageSize] = useState(6)
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

  useEffect(() => {
    getAllVideos()
    window.addEventListener('scroll', handleScroll)

    return () => {}
  }, [])

  const handleScroll = (e) => {
    const _scrollHeight = e.target.documentElement.scrollTop
    const _elementHeight = window.innerHeight

    const _elementHeightTotal = _scrollHeight + _elementHeight + 1

    const screenHeight = e.target.documentElement.scrollHeight
    if (_elementHeightTotal >= screenHeight) {
      getAllVideos()
    }
  }

  const getAllVideos = () => {
    setLoading(true)
    laughterService.laughterVideos(page, pageSize).then((res) => {
      
      const success = res.data?.success
      const videos = res.data?.videos

      if (success) {
        const { count, rows } = videos
        setTotal(count)
        setDataSource((prevData) => [...prevData, ...rows])
      }

      setLoading(false)
    })

      page += 1
  
  }

  const goToDetail = (id) => {
    // const user = JSON.parse(localStorage.getItem('user'))
    // if (!user || user.role !== 'VIEWER') {
    //   history.push('/login')
    // } else {
    //   history.push('/laughter/video-player')
    // }
      history.push('/laughter/video-player')
    
  }

  const RenderLaughterVideos = () => {

    return (
      <div className="px-1 relative">
        <div className="flex flex-wrap">
          {dataSource.map((data, index) => {
            return (
              <div
                className="p-1 flex flex-wrap md:w-1/3 w-1/2 h-44"
                key={index}
                onClick={() => goToDetail(data.id)}
              >
                <img
                  className="w-full h-full"
                  src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_BSXPlBjoBeJruSaCamv7kQuMNjoIIWX0CITXUVoapFCbRM9g"
                  alt="Messi"
                />
                {/* <video className="block w-full h-full" controls>
                    <source src={data.gifPath} type="video/mp4" />
                  </video> */}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="pt-2 sm:ml-14 mt-12">
      <SideNav></SideNav>
      <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
        <div className="w-full">
          <HomeContainer
            sidebarItems={sidebarItems}
            title="SEND LAUGHTER"
            statusData={statusData}
            sidebarColor="purple-700"
            backgroundImage="https://savageuniversal.com/wp-content/uploads/2014/08/young-woman-laughing.jpg"
          />
        </div>

        <div className="w-full">
          {loading ? (
            <div className="absolute top-1/2 left-1/2 w-20 h-12 flex items-center justify-center">
              <Spin indicator={antIcon} />
            </div>
          ) : (
            <RenderLaughterVideos />
          )}
        </div>
      </div>
    </div>
  )
}

export default Laughter
