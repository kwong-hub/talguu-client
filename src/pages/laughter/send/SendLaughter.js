import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import { Form, Input } from 'antd';


import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useSwipeable } from 'react-swipeable';

import VideoPlayer from '../VideoPlayer'
import { laughterService } from '../../../_services/laughter.service';
import { slides } from './sample_gifs';

const SendLaughter = () => {

    // const { TextArea } = Input
    const history = useHistory()
    const { state } = useLocation()
    const playerRef = React.useRef(null);

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(1)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState(slides)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)


    const config = {
        delta: 10,
        preventScrollOnSwipe: false,
        trackTouch: true,
        trackMouse: false,
        rotationAngle: 0,
        swipeDuration: Infinity,
        touchEventOptions: { passive: true }

    }


    useEffect(() => {
        getAllVideos(page, pageSize)

        return () => {
            setHasMore(false)
        }
    }, [page, pageSize])



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


    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };


    const videoJsOptions = {
        autoplay: true,
        controls: true,
        loop: true,
        muted: true,
        aspectRatio: '9:16',
        responsive: true,
        height: 400,
        sources: [{
            src: "https://s3.us-west-2.amazonaws.com/talguu-videos/Short/Snaptik_7040295207123815726_bosede-falode.mp4",
            type: 'video/mp4'
        }]
    }

    const USD_PER_PERSON = 0.20

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePreview = () => {
        console.log("preview: ")
    }

    const handleSend = () => {
        history.push('/login')
    }

    const back = () => {
        history.push('/laughter')
    }



    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
            // we cam access the property of swiped item
            console.log('swiped: ', dataSource)
        },
        ...config,
    });


    const selectedDecorator = (id) => {
        console.log('selectedDecorator: ', id)
    }


    return (
        <div className='w-full relative h-full'>
            <div className='w-full flex flex-col items-start'>
                <button
                    type='button'
                    className='px-6 mr-5 mt-5 w-20'
                    onClick={back}
                >
                    <BsFillArrowLeftCircleFill className='w-8 h-8 text-purple-800' />
                </button>

            </div>

            <div className='mt-3 pt-3 flex flex-col'>

                <div className='flex p-2 mb-3'>
                    <div className='flex flex-col w-1/2'>
                        <p className='text-sm font-bold'>Send this video to my friend (s)</p>
                        <h1 className='text-xl font-bold text-purple-700'>US ${USD_PER_PERSON}/person</h1>

                        <div className='flex flex-col items-center'>
                            <Form
                                labelCol={{ span: 2 }}
                                className='flex flex-col shadow-md p-2 mb-10'
                                initialValues={{}}
                                name="basic"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                layout='horizontal'
                            >
                                <Form.Item
                                    name="email"
                                    className='w-full self-center ant-item'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Input your email',
                                        },
                                    ]}
                                >
                                    <Input placeholder='email' />
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"
                                    className='w-full self-center ant-item'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Input your phone number',
                                        },
                                    ]}
                                >
                                    <Input placeholder='phone' />
                                </Form.Item>

                                <Form.Item
                                    name="senderName"
                                    className='w-full self-center ant-item'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Input sender name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="sender's name" />
                                </Form.Item>
                            </Form>

                        </div>
                    </div>
                    <div className='ml-2 w-1/2 overflow-hidden'>
                        <div className='w-full h-20'>
                            <VideoPlayer
                                options={videoJsOptions}
                                onReady={handlePlayerReady}
                            />
                        </div>
                    </div>
                </div>


                {/* slider with preview and next button */}


                <div className='flex flex-col w-full h-40 items-center' {...handlers}>
                    {/* replace carousel here */}
                    {
                        dataSource.map((data, index) => {
                            const sendLaughterVideoOptions = {
                                autoplay: true,
                                controls: true,
                                loop: true,
                                responsive: true,
                                aspectRatio: '16:9',
                                muted: true,
                                sources: [{
                                    src: `${data.video_url}`,
                                    type: 'video/mp4'
                                }]

                            }
                            return (
                                <div key={index} className='w-4/5 h-full overflow-hidden'>
                                    {/* <VideoPlayer
                                        options={sendLaughterVideoOptions}
                                        onReady={handlePlayerReady}
                                    /> */}
                                    <img
                                        className='block w-full h-full'
                                        onClick={() => selectedDecorator(data.id)}
                                        src={data.gifPath}
                                        alt={data.gifPath} />
                                </div>
                            )
                        })
                    }

                </div>

                <div className='flex items-center justify-center mt-4 p-3'>
                    <button
                        type='button'
                        className='bg-purple-800 text-white uppercase rounded-xl px-6 py-2 mr-5'
                        onClick={handlePreview}
                    >
                        PREVIEW
                    </button>
                    <button
                        type='button'
                        className='bg-purple-800 text-white rounded-xl uppercase px-6 py-2 w-20'
                        onClick={handleSend}
                    >
                        SEND
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SendLaughter