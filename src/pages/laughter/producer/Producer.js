import React, { useEffect, useState } from 'react'

import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import SideNav from '../../../partials/sideNav/SideNav';
import { laughterService } from '../../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'
import { swipeDetect } from '../swipeDetector';
import { useSwipeable } from 'react-swipeable';
import { config } from '../swiperConfig';
import { userService } from '../../../_services/user.service';
import RenderLaughterVideos from '../RenderLaughterVideos';

import { AiOutlineDoubleLeft, AiOutlineLeft } from 'react-icons/ai'

import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

export const Producer = () => {

    const history = useHistory()

    const { producerId } = useParams()

    const location = useLocation()

    const { vidId } = location.state


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
            if (page === 1) {
                setHasMore(false)
                return
            } else {
                setPage(page - 1)
            }
        },
        onSwipedUp: () => {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log('user: ' + user)
            if (!user || user.role !== 'VIEWER') {
                history.push('/laughter-home')
            } else {
                history.push(`/laughter`)
            }
        },
        onSwipedDown: () => {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log('user: ' + user)
            if (!user || user.role !== 'VIEWER') {
                history.push('/laughter-home')
            } else {
                history.push(`/laughter`)
            }
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
                setDataSource((prevData) => [...prevData, ...rows])
            } else {
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


    const fetchMoreData = () => {
        log('fetchMore called!')

        // setLoading(true)
        // if (dataSource.length === total) {
        //   setHasMore(false)
        //   return
        // }
        setPage(page + 1)
    }

    // const RenderLaughterVideos = () => {
    //     return (
    //         <div className='my-5 px-5'>
    //             <div className='px-1'>
    //                 <div className='flex flex-wrap mb-14 items-center justify-center w-full lg:justify-start md:justify-start'>
    //                     {
    //                     dataSource.length > 0 ?
    //                     dataSource.map((video, index) => {
    //                         return (
    //                             <div
    //                                 className="laughter_video_thumb_style laughter_video_thumbnail"
    //                                 key={index}
    //                                 onClick={() => watchVideo(video)}
    //                             >
    //                                 <img
    //                                     src={
    //                                         video.main_gif
    //                                     }
    //                                     className="w-full h-full"
    //                                     alt=""
    //                                 />
    //                             </div>
    //                         )
    //                     }): (
    //                         <p> There are no videos available</p>
    //                     )
    //                 }
    //                 </div>
    //             </div>

    //         </div>

    //     )
    // }

    const back = () => {
        history.push(`/laughter/watch/${vidId}`)
    }


    return (
        <div>
            <div className="pt-2 sm:ml-14 mt-12">
                <SideNav></SideNav>
                <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
                    {/* <div className='w-full flex flex-col items-start'>
                        <button
                            type='button'
                            className='px-6 mr-5 mt-5 w-20'
                            onClick={back}
                        >
                            <AiOutlineLeft className='w-8 h-8 text-purple-800' />
                        </button>

                    </div> */}
                    <div className='flex items-center justify-between w-full'>
                        {
                            isLoading ? (
                                // <><Spin indicator={antIcon} /></>
                                null
                            ) : (
                                <>
                                    <div className='w-10 mx-2'>
                                        <button
                                            type='button'
                                            className='w-full'
                                            onClick={back}
                                        >
                                                <BsFillArrowLeftCircleFill className='w-8 h-8 text-purple-800' />
                                        </button>

                                    </div>

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
                                            className='outline outline-2 mr-2'>
                                            Profile
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </div>

                    <div className="w-full mt-4">

                        <RenderLaughterVideos
                            dataSource={dataSource}
                            antIcon={antIcon}
                            fetchMoreData={fetchMoreData}
                            hasMore={hasMore}
                            loading={loading}
                            type="producerVideos"
                        />

                        {/* {loading ? (
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
                        } */}
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Producer