import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {message, Steps, Button } from 'antd'

import { useSwipeable } from 'react-swipeable'

import { laughterService } from '../../../_services/laughter.service'
import { slides } from './sample_gifs'
import { config } from '../swiperConfig'

import './send_module_css.css'
import SenderInfo from './SenderInfo'
import LaughterDecorator from './LaughterDecorator'

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import PreviewLaughter from './PreviewLaughter'

const SendLaughter = () => {
 
  const history = useHistory()

  const playerRef = React.useRef(null)

  const { vidId } = useParams()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [total, setTotal] = useState(0)
  const [dataSource, setDataSource] = useState(slides)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const [currentVideo, setCurrentVideo] = useState({})
  const [decoratorVideo, setDecoratorVideo] = useState({})
  const [introVideoUrl, setIntroVideoUrl] = useState("")
  const [randomStr, setRandomStr] = useState('')
  const [playVideo, setPlayVideo] = useState(false)

  const { Step } = Steps
  const [current, setCurrent] = useState(0)

  const [receiverEmail, setReceiverEmail] = useState('')
  const [specialMessage, setSpecialMessage] = useState('')

  const [sendingData, setSendingData] = useState({})
  const [decoratorId, setDecoratorId] = useState("")

  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerEnded, setIsPlayerEnded] = useState(false)
  const [showOverlayText, setShowOverlayText] = useState(true)

  const overlayShowTime = 5

  useEffect(() => {
    if (vidId) {
      const singleVideoLaughter = () => {
        laughterService.getLaughterVideoUrl(vidId).then((res) => {
          console.log('res: ', res)
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

  }, [])

  useEffect(() => {
    setPlayVideo(true)
    setRandomStr(new Date().getTime().toString())
    return () => {}
  }, [currentVideo, decoratorVideo])

  useEffect(() => {
    getAllVideos(page, pageSize)

    return () => {
      setHasMore(false)
    }
  }, [page, pageSize])

  const handlePlayerReady = (player) => {
    playerRef.current = player

    var myInterval = setInterval(() => {
      if (player) {
        if (player.currentTime() > overlayShowTime) {
          setShowOverlayText(false)
          clearInterval(myInterval)
        }
      }
    }, 1000)

    player.on('pause', () => {
      player.log('player paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      player.log('player playing....')
      setIsPlaying(true)
    })
    player.on('ended', () => {
      setIsPlayerEnded(true)
    })
  }

  const handlePlayerReadyDecorator = (player) => {
    playerRef.current = player

    player.on('waiting', () => {})

    player.on('pause', () => {
      player.log('player paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      player.log('player playing....')
      setIsPlaying(true)
    })
    player.on('ended', () => {
      setIsPlayerEnded(true)
    })

    player.on('dispose', () => {
      player.log('player will dispose')
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

    ...config
  })

  const steps = [
    {
      title: 'Sender Info',
      content: (
        <SenderInfo
          receiverEmail={receiverEmail}
          specialMessage={specialMessage}
          setReceiverEmail={setReceiverEmail}
          setSpecialMessage={setSpecialMessage}
        />
      )
    },
    {
      title: 'Intro video',
      content: (
        <LaughterDecorator
          handlers={handlers}
          loading={loading}
          dataSource={dataSource}
          randomStr={randomStr}
          handlePlayerReady={handlePlayerReadyDecorator}
          totalDecorators={total}
          page={page}
          decoratorVideo={decoratorVideo}
        />
      )
    },
    {
      title: 'Preview',
      content: (
        <PreviewLaughter
          playVideo={playVideo}
          introVideoUrl={introVideoUrl}
          randomStr={randomStr}
          dataSource={dataSource}
          handlePlayerReady={handlePlayerReady}
          showOverlayText={showOverlayText}
          loading={loading}
          sendingData={sendingData}
        />
      )
    }
  ]

  const getAllVideos = (page, pageSize) => {
    setLoading(true)
    laughterService.introVideos(page, pageSize).then((res) => {
      const success = res.data?.success
      const videos = res.data?.videos

      if (success) {
        const { count, rows } = videos
        setTotal(count)
        setDataSource(rows)
        // get video id
        const videoId = rows[0].id
        setDecoratorId(videoId)

        laughterService.getLaughterVideoUrl(videoId).then((res) => {
          if (res) {
            setLoading(false)
            setDecoratorVideo(res)
          } else {
            setDecoratorVideo({})
          }
        })
      }
      setLoading(false)
    })
  }

  const next = () => {
    if ( !specialMessage) {
      message.error('please fill all the required fields')
      return
    }

    // if(decoratorId === "" || decoratorId.length === 0){
    //   setDecoratorId(dataSource[0]?.id)
    // }

    const body = {
      message: specialMessage,
      videoId: vidId,
      introId: decoratorId
    }

    setSendingData(body)

    setCurrent(current + 1)

    if(current === 1){
      previewPlayer(body)
    }

  }


  const previewPlayer = (body) => {
    console.log("body: ", body)
    laughterService.getPreviewVideoUrl(body).then(res => {
      const { success, prvUrl} = res
      console.log("preview response: ", res)

      if(success) {
        setIntroVideoUrl(prvUrl)
      }else{
        setIntroVideoUrl("")
      }
    })
  } 

  const isEmail = (val) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regEmail.test(val)) {
      return true
    } else {
      return false
    }
  }

  const submitLaughterData = () => {
    if (!specialMessage || !vidId || !decoratorId) {
      message.error('please fill all the required fields')
      return
    }

    console.log('FINAL DATA: ', sendingData)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const back = () => {
    history.push({
      pathname: `/laughter/watch/${vidId}`,
    })
  }

  return (
    <div className="w-full relative h-screen py-5 px-5 ">
      {current === 0 && (
        <div className="w-full flex flex-col items-start">
          <button type="button" className="px-6 mr-5 mt-5 w-20" onClick={back}>
            <BsFillArrowLeftCircleFill className="w-9 h-9 text-blue-500 " />
          </button>
        </div>
      )}

      <div className="flex flex-nowrap">
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
      <div className="my-5 mt-6 md:my-0 md:mt-0">{steps[current].content}</div>

      {!loading && (
        <div className="steps-action">
          {current < steps.length - 1 && dataSource.length > 0 && (
            <Button className="bg-blue-500 text-white w-28 h-11 md:h-9 md:w-24 rounded-xl text-lg md:text-sm outline-none border-none transition hover:bg-blue-400 hover:text-gray-200  md:font-bold duration-800"  onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button 
              className="bg-blue-500 md:bg-blue-500 text-white w-28 h-11 md:h-9 md:w-24 rounded-xl text-lg md:text-sm outline-none border-none transition hover:bg-blue-400 hover:text-gray-200  md:font-bold duration-800"
            onClick={() => submitLaughterData()}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px'
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default SendLaughter
