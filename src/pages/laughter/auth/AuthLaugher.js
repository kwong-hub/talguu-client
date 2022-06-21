import React, { useState, useEffect } from 'react'
import SideNav from '../../../partials/sideNav/SideNav'
import { useHistory, useLocation } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { laughterService } from '../../../_services/laughter.service'

import '../laughter_style.css'
import './auth.laughter.css'
import RenderLaughterVideos from '../RenderLaughterVideos'

const AuthLaugher = () => {

    const history = useHistory()

    const location = useLocation()

    const laughterPageOffset = location?.state.laughter_page_offset || 1
    const pageLimit = location?.state.page_limit || 6


    const [page, setPage] = useState(3)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)


    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />
    

    
    useEffect(() => {

        getAllVideos(page, pageSize)

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
        setPage(page + 1)
    }



    return (
        <div className="pt-2 sm:ml-14 mt-12">
            <SideNav></SideNav>
            <div className="flex relative pb-20 mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
               
                <div className="w-full">
                    <RenderLaughterVideos
                        dataSource={dataSource}
                        antIcon={antIcon}
                        fetchMoreData={fetchMoreData}
                        hasMore={hasMore}
                        loading={loading}
                        type="auth"
                        page={page}
                        pageSize={pageSize}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthLaugher