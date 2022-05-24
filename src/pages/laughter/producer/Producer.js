import React, { useEffect, useState } from 'react'

import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import SideNav from '../../../partials/sideNav/SideNav';
import { laughterService } from '../../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'
import { swipeDetect } from '../swipeDetector';
import { useSwipeable } from 'react-swipeable';

export const Producer = () => {

    const history = useHistory()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [once, setOnce] = useState(true)

    const log = console.log

    const config = {
        delta: 10,
        preventScrollOnSwipe: false,
        trackTouch: true,
        trackMouse: false,
        rotationAngle: 0,
        swipeDuration: Infinity,
        touchEventOptions: { passive: true }

    }

    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />


    useEffect(() => {
        getAllVideos(page, pageSize)

        return () => {
            setHasMore(false)
        }
    }, [page, pageSize])




    const handlers = useSwipeable({
        onSwiped: () => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
        },
        ...config,
    });


    const getAllVideos = (page, pageSize) => {
        setLoading(true)
        laughterService.laughterVideos(page, pageSize).then((res) => {
            const success = res.data?.success
            const videos = res.data?.videos
            console.log("Videos: ", videos)
            if (success) {
                const { count, rows } = videos
                setTotal(count)
                setDataSource(rows)
            }
            setLoading(false)
        })
    }


    const goToDetail = (id) => {
        history.push("/laughter/video-player")
    }

    const producerProfile = () => {
        history.push("/producer/profile")
    }




    const RenderLaughterVideos = () => {
        return (
            <div className='my-5 px-5'>
                <div className='px-1'>
                    <p>Total: {total}</p>
                    <div className='flex flex-wrap mb-14'>
                        {
                            dataSource.map((thumb, index) => {
                                return (

                                    <div className='p-1 w-1/2 overflow-hidden h-44'
                                        key={index}
                                        onClick={() => goToDetail(thumb.id)}
                                    >
                                        <div className='relative flex justify-center h-full'>
                                            <img
                                                className='block w-full h-full'
                                                src={thumb.gifPath}
                                                alt={thumb.gifPath} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>

        )
    }

    return (
        <div {...handlers}>
            <div className="pt-2 sm:ml-14 mt-12">
                <SideNav></SideNav>
                <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">

                    <div className='flex items-center justify-between px-2 w-full'>
                        <div className='flex items-center'>
                            <Avatar size={40} icon={<UserOutlined />} />

                            <div className='flex flex-col items-center px-3 py-3'>
                                <h3 className='text-xl text-gray-600'>
                                    Samson John
                                </h3>
                                <p className='text-sm text-gray-700'>
                                    samsonJohn@gmail.com
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => producerProfile()}
                            type='primary'
                            className='outline outline-2'>
                            View profile
                        </Button>
                    </div>

                    <div className="w-full">
                        {loading ? (
                            <div className="absolute top-1/2 left-1/2 w-20 h-12 flex items-center justify-center">
                                <Spin indicator={antIcon} />
                            </div>
                        ) :
                            <div className="">
                                <RenderLaughterVideos />
                                {
                                    !hasMore &&
                                    <p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Producer