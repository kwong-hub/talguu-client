import { Spin } from 'antd'
import React from 'react'
import VideoPlayer from '../VideoPlayer'

const LaughterDecorator = ({
    handlers,
    loading,
    dataSource,
    randomStr,
    handlePlayerReady,
    totalDecorators,
    page,
    decoratorVideo
}) => {


    const generateArray = () => {
        let totalDec = totalDecorators + 1
        if (totalDecorators > 0) {
            let array = []

            for (let index = 1; index < totalDec; index++) {
                array.push(index)
            }
            return array
        }
    }


    const renderDots = () => {
        const dots = generateArray()
        return (
            dots.map((data, index) => (
                <div className={`w-4 h-4 rounded-3xl mt-4 my-3 mx-1 ${page === data ? 'bg-red-700' : 'bg-gray-700'} `}>
                
                </div>
            ))
        )
    }




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
                                    videoId: decoratorVideo.id,
                                    autoplay: true,
                                    controls: true,
                                    errorDisplay: false,
                                    aspectRatio: '9:16',
                                    responsive: true,
                                    fill: true,
                                    sources: [
                                        {
                                            src: decoratorVideo.video_link,
                                            type: decoratorVideo.video_type
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

            <div className="w-full flex items-center justify-center">
                {
                    !loading && dataSource.length > 0 &&
                    renderDots()
                }
            </div>

        </div>
    )
}

export default LaughterDecorator