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

import './send_module_css.css'

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

    const [senderName, setSenderName] = useState('')


    const { Step } = Steps;
    const [current, setCurrent] = useState(0);
    const { TextArea } = Input;




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
                laughterService.getLaughterVideoUrl(vidId).then(res => {
                    console.log("res: ", res)
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
                <div className='flex flex-col w-full'>
                    <p className='text-sm font-bold'>Send this video to my friend (s)</p>
                    <h1 className='text-xl font-bold text-purple-700'>US ${USD_PER_PERSON}/person</h1>

                    <div className='flex flex-col items-center my-3'>
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
                                label="Receiver Email"
                                name="email"
                                className='w-full self-center ant-item'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input receiver email',
                                    },
                                ]}
                            >
                                <Input placeholder='receiver email' />
                            </Form.Item>

                            {/* <Form.Item
                                label="Sender Name"
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
                            </Form.Item> */}


                            <Form.Item
                                label="Message"
                                name="message"
                                className='w-full self-center ant-item'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Input your message',
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                        </Form>

                    </div>
                </div>
            </div>
        )
    }


    const LaughterDecorator = () => {
        return (
            <div className=''>
                <p className='text-sm font-bold mb-5'>Select Intro Videos</p>

                <div className='flex flex-col w-full h-full items-center' {...handlers}>
                    {/* replace carousel here */}


                    {

                        loading ? (<div className="w-screen mx-auto mt-40">
                            <Spin size="middle">
                                <Spin size="large" />
                            </Spin>
                        </div>) :
                            dataSource.length > 0 ?
                                dataSource.map((video, index) => {

                                    let videoJsOptions = {
                                        videoId: video.id,
                                        autoplay: false,
                                        controls: true,
                                        errorDisplay: false,
                                        poster: video?.thumbnial?.includes('talguu-vout1')
                                            ? video?.thumbnial
                                            : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
                                        aspectRatio: '9:16',
                                        responsive: true,
                                        fill: true,
                                        sources: [
                                            {
                                                src: video.video_link,
                                                type: video.video_type
                                            }
                                        ]
                                    }
                                    return (
                                        <div key={randomStr}
                                            className='sender_player_style'>

                                            <VideoPlayer
                                                options={videoJsOptions}
                                                onReady={handlePlayerReady}
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

            </div>
        )
    }

    const PreviewLaughter = () => {
        return (
            <div className=''>

                <p className='text-sm font-bold mb-5'>Preview</p>

                <div className='ml-2 sender_player_style'>
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
        )
    }


    const steps = [
        {
            title: 'Sender Info',
            content: <SenderInfo />,
        },
        {
            title: 'Intro video',
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
        onSwipedLeft: () => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
            // we cam access the property of swiped item
            console.log('swiped: ', dataSource)
        },
        onSwipedRight: () => {
            if (page === 1) {
                setHasMore(false)
                return
            } else {
                setPage(page - 1)
            }
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
            errorDisplay: false,
            poster: currentVideo?.thumbnial?.includes('talguu-vout1')
                ? currentVideo?.thumbnial
                : 'https://s3.us-west-2.amazonaws.com/talguu-vout1/default_tumbnail.png',
            aspectRatio: '9:16',
            responsive: true,
            fill: true,
            sources: [
                {
                    src: currentVideo.video_link,
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
        <div className='w-full relative h-full py-5 px-5'>
            {/* <div className='w-full flex flex-col items-start'>
                <button
                    type='button'
                    className='px-6 mr-5 mt-5 w-20'
                    onClick={back}
                >
                    <BsFillArrowLeftCircleFill className='w-8 h-8 text-purple-800' />
                </button>

            </div> */}



            <div className='flex flex-nowrap'>
                {/* <Steps
                    direction='horizontal'
                    current={current}>
                    {steps.map((item) => (
                        <Step
                            className=""
                            key={item.title}
                            title={item.title}
                        />
                    ))}
                </Steps> */}
            </div>
            <div className="my-5">{steps[current].content}</div>

            {
                !loading &&
                <div className="steps-action">
                    {current < steps.length - 1 && dataSource.length > 0 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>

            }

        </div>
    )
}

export default SendLaughter