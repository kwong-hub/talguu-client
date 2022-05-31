import React, { useEffect, useState } from 'react'

import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import SideNav from '../../../partials/sideNav/SideNav';
import { laughterService } from '../../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'
import { swipeDetect } from '../swipeDetector';
import { useSwipeable } from 'react-swipeable';
import { config } from '../swiperConfig';
import { userService } from '../../../_services/user.service';




export const Producer = () => {

    const history = useHistory()

    const { producerId } = useParams()

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [once, setOnce] = useState(true)
    const [producerInfo, setProducerInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const log = console.log


    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

    // fetch the producer info first
    // fetch the laughters that belongs to this producer

    // get videos belonging to the producer
    useEffect(() => {
        getAllVideos(page, pageSize)

        return () => {
            setHasMore(false)
        }
    }, [page, pageSize])



    // get producers infos 
    useEffect(() => {
        getProducerInfo()
    }, [])




    const getProducerInfo = () => {
        setIsLoading(true)
        userService.getProducerProfile(producerId).then(resp => {
            const { success, producer } = resp.data
            if (success) {
                const { dataValues, firstName, lastName, email } = producer
                setProducerInfo({
                    ...dataValues,
                    firstName,
                    lastName,
                    email,
                })
            } else {
                setProducerInfo({})
            }
            setIsLoading(false)
        })
    }


    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
        },
        onSwipedRight: () => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
        },
        onSwipedUp: () => {
            history.push('/laughter')
        },
        onSwipedDown: () => {
            history.push('/laughter')
        },
        ...config,
    });


    const getAllVideos = (page, pageSize) => {
        setLoading(true)
        laughterService.getProducerLaughterVideos(producerId, page, pageSize).then((res) => {
            const success = res.data?.success
            const videos = res.data?.videos
            console.log("Videos: ", videos)
            if (success) {
                const { count, rows } = videos
                setTotal(count)
                setDataSource(rows)
            }else{
                setTotal(0)
                setDataSource([])
            }
            setLoading(false)
        })
    }


    const watchVideo = (video) => {
        const user = JSON.parse(localStorage.getItem('user'))
        console.log('user: ' + user)
        if (!user || user.role !== 'VIEWER') {
            history.push({
                pathname: '/login',
                search: `?return_url=/laughter/watch/${video.id}`
            })
        } else {
            history.push(`/laughter/watch/${video.id}`)
        }
    }

    const producerProfile = () => {
        history.push("/producer/profile")
    }




    const RenderLaughterVideos = () => {
        return (
            <div className='my-5 px-5'>
                <div className='px-1'>
                    <div className='flex flex-wrap mb-14'>
                        {
                        dataSource.length > 0 ?
                        dataSource.map((video, index) => {
                            return (
                                <div
                                    className="p-1 flex md:w-1/4 w-1/2 h-52 cursor-pointer video_thumbnail"
                                    key={index}
                                    onClick={() => watchVideo(video)}
                                >
                                    <img
                                        src={
                                            video.thumbnial?.includes('talguu-vout1')
                                                ? video.thumbnial
                                                : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png'
                                        }
                                        alt=""
                                        className="w-full h-full"
                                    />
                                    <img
                                        src={
                                            video.main_gif ? video.main_gif : video.trailer_gif || ''
                                        }
                                        className="hidden h-48 video_gif mx-auto"
                                        alt=""
                                    />
                                </div>
                            )
                        }): (
                            <p> There are no videos available</p>
                        )
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
                        {
                            isLoading ? (
                                <>
                                    <Spin indicator={antIcon} />

                                </>
                            ) : (
                                    <div className='flex items-center justify-between px-2 w-full' >
                                    <div className='flex items-center'>
                                        <Avatar size={40} icon={<UserOutlined />} />

                                        <div className='flex flex-col items-center px-3 py-3'>
                                            <h3 className='text-xl text-gray-600'>
                                                    {producerInfo.firstName} {producerInfo.firstName}
                                            </h3>
                                            <p className='text-sm text-gray-700'>
                                                {producerInfo.email}
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
                            )
                        }
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
                                    !hasMore && dataSource.length > 0 &&
                                    <p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Producer