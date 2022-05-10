import React, {useEffect, useState} from 'react'

import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import SideNav from '../../../partials/sideNav/SideNav';
import { laughterService } from '../../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'

export const Producer = () => {

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

        return () => {

        }
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
            const { success, videos } = res.data
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
        history.push("/laughter/video-player")
    }

    const producerProfile = () => {
        history.push("/producer/profile")
    }



    const RenderLaughterVideos = () => {
        return (

            <div className='my-5 px-5'>
                <div className='px-1'>
                    <div className='flex flex-wrap'>
                        {
                            dataSource.map((thumb, index) => {

                                return (

                                    <div className='p-1 w-1/2 overflow-hidden h-52'
                                        key={index}
                                        onClick={() => goToDetail(thumb.id)}
                                    >
                                        <div className='relative flex justify-center h-full'>
                                            <img
                                                className='block w-full h-full'
                                                src={thumb.video_url}
                                                alt='' />
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
                        <RenderLaughterVideos />
                    }
                </div>
            </div>
        </div>
    )
}
export default Producer