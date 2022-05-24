import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import SideNav from '../../../partials/sideNav/SideNav'
import { useHistory } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { laughterService } from '../../../_services/laughter.service'

import InfiniteScroll from 'react-infinite-scroll-component'

import './laughter_style.css'

const AuthLaugher = () => {

    const history = useHistory()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const log = console.log
    const [hasMore, setHasMore] = useState(true)


    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

    useEffect(() => {
        getAllVideos(page, pageSize)

    }, [page, pageSize])



    const handleScroll = (e) => {
        const _scrollHeight = e.target.documentElement.scrollTop
        const _elementHeight = window.innerHeight

        const _elementHeightTotal = _scrollHeight + _elementHeight + 1

        const screenHeight = e.target.documentElement.scrollHeight
        if (_elementHeightTotal >= screenHeight) {
            getAllVideos()
        }
    }

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
        log('fetchMore called!')

        // setLoading(true)
        // if (dataSource.length === total) {
        //     setHasMore(false)
        //     return
        // }
        setPage(page + 1)
    }

    const goToDetail = (id) => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log("user: " + user)
        if (!user || user.role !== 'VIEWER') {
            history.push({
                pathname: '/login',
                search: `?return_url=/watch/${id}`
            })
        } else {
            history.push('/laughter/video-player')
        }
    }


    return (
        <div className="pt-2 sm:ml-14 mt-12">
            <SideNav></SideNav>
            <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
                <div className="w-full px-3">
                    <InfiniteScroll
                        dataLength={dataSource.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        className="scroll-style"
                        loader={
                            <div className="flex items-center justify-center">
                                <Spin indicator={antIcon} />
                            </div>
                        }
                        endMessage={
                            <div
                                className="w-full mb-14 mt-5 p-5 flex items-center justify-center"
                            >
                                <p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>
                            </div>
                        }>

                        {dataSource.length > 0 ? (
                            <div className="flex flex-wrap">
                                {dataSource.map((data, index) => {
                                    log("gifPath: ", data.gifPath)
                                    return (
                                        <div
                                            className="p-1 flex md:w-1/4 w-1/2 h-44"
                                            key={index}
                                            onClick={() => goToDetail(data.id)}
                                        >
                                            <img
                                                className="w-full h-full"
                                                src={data.gifPath}
                                                alt={data.gifPath}
                                            />

                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div>
                                <p className="text-red-500 text-md">
                                    There is no video available
                                </p>
                            </div>
                        )}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}

export default AuthLaugher