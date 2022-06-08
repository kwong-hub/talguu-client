import React, { useState, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Form, Input, message, Spin, Steps, Button } from 'antd';


import { useSwipeable } from 'react-swipeable';

import VideoPlayer from '../VideoPlayer'
import { laughterService } from '../../../_services/laughter.service';
import { slides } from './sample_gifs';
import { config } from '../swiperConfig';

import './send_module_css.css'
import SenderInfo from './SenderInfo';
import LaughterDecorator from './LaughterDecorator';

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'

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
    const { TextArea } = Input;


    const [receiverEmail, setReceiverEmail] = useState('')
    const [specialMessage, setSpecialMessage] = useState('')

    const [sendingData, setSendingData] = useState({})
    const [decoratorId, setDecoratorId] = useState(dataSource[0]?.id)




    const handlePlayerReady = (player) => {
        playerRef.current = player;
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

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (dataSource.length === total) {
                setHasMore(false)
                return
            }
            setPage(page + 1)
            // we cam access the property of swiped item
            let id = dataSource[0].id
            // setSendingData((prevData) => ({
            //     ...prevData,
            //     decoratorId: id
            // }))
            setDecoratorId(id)
            console.log("decoratorId: ", id)
        },
        onSwipedRight: () => {
            if (page === 1) {
                setHasMore(false)
                return
            } else {
                setPage(page - 1)
            }
            let id = dataSource[0].id
            setDecoratorId(id)
            console.log("decoratorId: ", id)
        },

        ...config,
    });





    const PreviewLaughter = () => {
        return (
            <div className='flex flex-col w-full h-full items-center'>

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
            content: <SenderInfo
                receiverEmail={receiverEmail}
                specialMessage={specialMessage}
                setReceiverEmail={setReceiverEmail}
                setSpecialMessage={setSpecialMessage}
            />,
        },
        {
            title: 'Intro video',
            content: <LaughterDecorator
                handlers={handlers}
                loading={loading}
                dataSource={dataSource}
                randomStr={randomStr}
                handlePlayerReady={handlePlayerReady}
            />,
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

        if (!receiverEmail || !specialMessage) {
            message.error("please fill all the required fields")
            return
        }
        if(!isEmail(receiverEmail)) {
            message.error("Please insert the valid email")
            return
        }

        const body = {
            email: receiverEmail,
            message: specialMessage,
            videoId: vidId,
            decoratorId: decoratorId
        }

        setSendingData(body)

        setCurrent(current + 1);

    };


    const  isEmail = (val) => {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(val)) {
            return true;
        }else{
            return false;
        }
    }

    const submitLaughterData = () => {
        if (!receiverEmail || !specialMessage || !vidId || decoratorId) {
            message.error("please fill all the required fields")
            return
        }

        console.log("FINAL DATA: ", sendingData)
    }

    const prev = () => {
        setCurrent(current - 1);
    };

    const back = () => {
        history.push(`/laughter/watch/${vidId}`)
        message.success("Back clicked")
    }



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
            
            {
              current === 0 && 
                <div className='w-full flex flex-col items-start'>
                    <button
                        type='button'
                        className='px-6 mr-5 mt-5 w-20'
                        onClick={back}
                    >
                        <BsFillArrowLeftCircleFill className='w-8 h-8 text-purple-800' />
                    </button>

                </div>
            }



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
            <div className="my-5 mt-6">{steps[current].content}</div>

            {
                !loading &&
                <div className="steps-action">
                    {current < steps.length - 1 && dataSource.length > 0 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => submitLaughterData()}>
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