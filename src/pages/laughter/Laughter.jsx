import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import SideNav from '../../partials/sideNav/SideNav'
import { laughterService } from '../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'


import './laughter_style.css'

import RenderLaughterVideos from './RenderLaughterVideos'

const Laughter = () => {
  const history = useHistory()
  // let page = 1

  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(false)
  const [hasMore, setHasMore] = useState(true)


  const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

      const location = useLocation()


  useEffect(() => {
    getAllVideos(page, pageSize)

    // return () => {
    //   setHasMore(false)
    // }
  }, [page, pageSize])

  

  const getAllVideos = (page, pageSize) => {
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
  }

  const fetchMoreData = () => {
    // setLoading(true)
    // if (dataSource.length === total) {
    //   setHasMore(false)
    //   return
    // }
    setPage(page + 1)
  }

  // const { showVideoPlayer } = useSelector((state) => state.showPlayer)
  
  return (
    <div className="pt-2 sm:ml-14 mt-12">
      <SideNav></SideNav>
      <div className="flex relative pb-20 mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white ">
        {/* <div className="w-full">
          <HomeContainer
            sidebarItems={sidebarItems}
            title="SEND LAUGHTER"
            statusData={statusData}
            sidebarColor="purple-700"
            backgroundImage="https://savageuniversal.com/wp-content/uploads/2014/08/young-woman-laughing.jpg"
            updateDataStatus={updateDataStatus}
          />
        </div> */}


        <RenderLaughterVideos
          dataSource={dataSource}
          antIcon={antIcon}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
          loading={loading}
          type="publicLaughter"
          page={page}
          pageSize={pageSize}
        />

      </div>
    </div>
  )
}

export default Laughter
