import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Form, Input, message, Spin, Steps, Button } from 'antd';


import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useSwipeable } from 'react-swipeable';

import VideoPlayer from '../VideoPlayer'
import { laughterService } from '../../../_services/laughter.service';
import { slides } from './sample_gifs';
import videoService from '../../../_services/video.service';
import { config } from '../swiperConfig';

const SendLaughter = () => {

    // const { TextArea } = Input
    const history = useHistory()
    const { state } = useLocation()
    const playerRef = React.useRef(null);


    const { vidId } = useParams();

    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(1)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState(slides)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const [currentVideo, setCurrentVideo] = useState({})
    const [randomStr, setRandomStr] = useState('')
    const [playVideo, setPlayVideo] = useState(false)


    const { Step } = Steps;
    const [current, setCurrent] = useState(0);




    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            player.log('player is waiting');
        });

        player.on('dispose', () => {
            player.log('player will dispose');
        });
    };



    useEffect(() => {
        if (vidId) {
            const singleVideoLaughter = () => {
                videoService.getPaidVideoUrl(vidId).then(res => {
                    if (res) {
                        setLoading(false)
                        setCurrentVideo(res)
                    } else {
                        setCurrentVideo({})
                    }
                })
            }

            singleVideoLaughter()
        }

        window.scrollTo(0, 0)

    }, [])


    useEffect(() => {
        setPlayVideo(true)
        setRandomStr(new Date().getTime().toString())
        window.scrollTo(0, 0)
        return () => { }
    }, [currentVideo])



    useEffect(() => {
        getAllVideos(page, pageSize)

        return () => {
            setHasMore(false)
        }
    }, [page, pageSize])



    const SenderInfo = () => {
        return (
            <div className=''>
                <p>Sender Info</p>
            </div>
        )
    }


    const LaughterDecorator = () => {
        return (
            <div className=''>
                <p>Select Decorator </p>
            </div>
        )
    }

    const PreviewLaughter = () => {
        return (
            <div className=''>
                <p>Preview Laughter</p>
            </div>
        )
    }


    const steps = [
        {
            title: 'Info',
            content: <SenderInfo />,
        },
        {
            title: 'Decorator',
            content: <LaughterDecorator />,
        },
        {
            title: 'Preview',
            content: <PreviewLaughter />,
        },
    ];



    const getAllVideos = (page, pageSize) => {
        setLoading(true)
        laughterService.laughterVideos(page, pageSize).then((res) => {
            const success = res.data?.success
            const videos = res.data?.videos
            if (success) {
                const { count, rows } = videos
                setTotal(count)
                setDataSource(rows)
            }
            setLoading(false)
        })
    }


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

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
        message.success("Laughter sent successfully!")
    }

    const back = () => {
        history.push(`/laughter/watch/${vidId}`)
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



    const renderPlayer = () => {

        const videoJsOptions = {
            videoId: currentVideo.id,
            autoplay: false,
            controls: true,
            poster: currentVideo?.thumbnial?.includes('talguu-vout1')
                ? currentVideo?.thumbnial
                : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
            aspectRatio: '9:16',
            responsive: true,
            fill: true,
            sources: [
                {
                    src: currentVideo.trailer ? currentVideo.trailer : '',
                    type: currentVideo.video_type
                }
            ]
        }
        if (currentVideo) {
            return (
                <div 
                    className='w-full md:h-96 lg:h-96 md:w-2/3 lg:w-2/3'
                    key={randomStr}
                >
                    <VideoPlayer
                        options={videoJsOptions}
                        onReady={handlePlayerReady}
                    />
                </div>
            )

        }
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

                <div className='flex p-2 mb-3 py-5'>
                    <div className='flex flex-col w-1/2'>
                        <p className='text-sm font-bold'>Send this video to my friend (s)</p>
                        <h1 className='text-xl font-bold text-purple-700'>US ${USD_PER_PERSON}/person</h1>

                        <div className='flex flex-col items-center'>
                            <Form
                                labelCol={{ span: 2 }}
                                className='flex flex-col p-2 mb-10'
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
                        {playVideo && currentVideo ? (

                            renderPlayer()
                        ) :
                            <div className="w-screen mx-auto mt-40">
                                <Spin size="middle">
                                    <Spin size="large" />
                                </Spin>
                            </div>
                        }
                    </div>
                </div>


                {/* slider with preview and next button */}


                <div className='flex flex-col w-full h-52 items-center' {...handlers}>
                    {/* replace carousel here */}
                    {
                        dataSource.length > 0 ?
                            dataSource.map((video, index) => {
                                return (
                                    <div key={index} className='w-4/5 md:w-1/2 lg:w-1/2 h-full overflow-hidden'>

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
                            })
                            :

                            (
                                <p>There are no more videos</p>
                            )
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