import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { message, Steps, Button } from 'antd'

import { useSwipeable } from 'react-swipeable'

import { laughterService } from '../../../_services/laughter.service'
import { slides } from './sample_gifs'
import { config } from '../swiperConfig'

import './send_module_css.css'
import SenderInfo from './SenderInfo'
import LaughterDecorator from './LaughterDecorator'
import TestDecorator from './TestDecorator'

import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import PreviewLaughter from './PreviewLaughter'

import SendConfirmation from './SendConfirmation'
import SettingModal from './SettingModal'



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
  const [dataLoading, setDataLoading] = useState(false)
  const [currentVideo, setCurrentVideo] = useState({})
  const [decoratorVideo, setDecoratorVideo] = useState({})
  const [introVideoUrl, setIntroVideoUrl] = useState("")
  const [randomStr, setRandomStr] = useState('')
  const [playVideo, setPlayVideo] = useState(false)
  const [sent, setSent] = useState(false)
  const [current, setCurrent] = useState(0)

  const [receiverEmail, setReceiverEmail] = useState('')
  const [specialMessage, setSpecialMessage] = useState('')
  const [textColor, setTextColor] = useState('#000000')
  const [textSize, setTextSize] = useState('16')
  const [sendingData, setSendingData] = useState({})
  const [decoratorId, setDecoratorId] = useState("")

  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerEnded, setIsPlayerEnded] = useState(false)
  const [showOverlayText, setShowOverlayText] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSettingVisible, setIsSettingVisible] = useState(false)

  let isShowingText = false;


  useEffect(() => {
    if (vidId) {
      setLoading(true)
      const singleVideoLaughter = () => {
        laughterService.getLaughterVideoUrl(vidId).then((res) => {
          // console.log('res: ', res)
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
    return () => { }
  }, [currentVideo, decoratorVideo])


  useEffect(() => {
    getAllVideos(page, pageSize)
  }, [page, pageSize])



  const handlePlayerReady = (player) => {
    playerRef.current = player

    player.ready(function () {
      this.on('timeupdate', function () {
        // console.log("currentTIme: ", this.currentTime())

        if (this.currentTime() > 0.5 && this.currentTime() < 1) {
          if (!isShowingText) {
            setShowOverlayText(true)
            isShowingText = true
          }
        }
        else if (this.currentTime() > 5) {
          if (isShowingText) {
            setShowOverlayText(false)
            isShowingText = false
          }
        }
      })
    });

    player.on('pause', () => {
      // player.log('player paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      // player.log('player playing....')
      setIsPlaying(true)
    })
    player.on('ended', () => {
      setIsPlayerEnded(true)
    })
  }

  const handlePlayerReadyDecorator = (player) => {
    playerRef.current = player


     player.ready(function () {
       this.on('timeupdate', function () {
         // console.log("currentTIme: ", this.currentTime())

         if (this.currentTime() > 0.5 && this.currentTime() < 1) {
           if (!isShowingText) {
             setShowOverlayText(true)
             isShowingText = true
           }
         } else if (this.currentTime() > 5) {
           if (isShowingText) {
             setShowOverlayText(false)
             isShowingText = false
           }
         }
       })
     });

    player.on('waiting', () => { })

    player.on('pause', () => {
      // player.log('player paused')
      setIsPlaying(false)
    })
    player.on('play', () => {
      // player.log('player playing....')
      setIsPlaying(true)
    })
    player.on('ended', () => {
      setIsPlayerEnded(true)
    })

    player.on('dispose', () => {
      // player.log('player will dispose')
    })
  }


const handlePlayPause = () => {
  const player = playerRef.current
  if (isPlaying) {
    player.pause()
  } else {
    player.play()
  }
}

  const handlers = useSwipeable({
    onSwipedLeft: () => {

      if (dataSource.length === total) {
        setHasMore(false)
        return;
      }
      if (page < total) {
        setPage(page + 1)
      } else {
        return;
      }

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

  const handleSettingModal = () => {
    console.log("setting is working...")
    setIsSettingVisible(!isSettingVisible)
  }

const back = () => {
  history.push({
    pathname: `/laughter/watch/${vidId}`,
  })
}



  const getAllVideos = (page, pageSize) => {
    setDataLoading(true)
    laughterService.introVideos(page, pageSize).then((res) => {
      const success = res.data?.success
      const videos = res.data?.videos

      if (success) {
        const { count, rows } = videos
        console.log("Total: " + count)
        setTotal(count)
        setDataSource(rows)
        if (rows.length > 0) {
          // get video id
          const videoId = rows[0].id
          setDecoratorId(videoId)

          laughterService.getLaughterVideoUrl(videoId).then((res) => {
            if (res) {
              setDataLoading(false)
              setDecoratorVideo(res)
            } else {
              setDecoratorVideo({})
            }
          })
        } else {
          setDecoratorId("")
          setDataLoading(false)
        }
      }
      setDataLoading(false)
    })
  }



  const steps = [
    
     {
      title: 'Intro video',
      content: (
        <TestDecorator
          handlers={handlers}
          loading={loading}
          dataSource={dataSource}
          randomStr={randomStr}
          handlePlayerReady={handlePlayerReadyDecorator}
          totalDecorators={total}
          page={page}
          decoratorVideo={decoratorVideo}
          showOverlayText={showOverlayText}
          textColor={textColor}
          specialMessage={specialMessage}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          handleSettingModal={handleSettingModal}
          isSettingVisible={isSettingVisible}
          textSize={textSize}
          back={back}
          dataLoading={dataLoading}
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
          showConfirmation={showConfirmation}
          textColor={textColor}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          isSettingVisible={isSettingVisible}
          textSize={textSize}
        />
      )
    }
  ]


  const next = () => {

    const body = {
      msg: specialMessage,
      mainVideoId: vidId,
      introVideoId: decoratorId,
      colorCode: textColor,
      textSize
    }
    setSendingData(body)

    setCurrent(current + 1)

    if (current === 0) {
      previewPlayer(body)
    }

  }


  const previewPlayer = (body) => {
    laughterService.getPreviewVideoUrl(body).then(res => {
      const { success, prvUrl } = res
      console.log("Preview: ", prvUrl)
      if (success) {
        setIntroVideoUrl(prvUrl)
      } else {
        setIntroVideoUrl("")
      }
    })
  }


  const submitLaughterData = () => {
    if (!specialMessage || !vidId || !decoratorId) {
      message.error('please fill all the required fields')
      return
    }

    laughterService.sendVideoToEmail(sendingData).then(res => {
      const success = res?.success
      const videos = res?.videos
      if (success && videos === "OK") {
        setSent(true);
        setShowConfirmation(true)
        setTimeout(() => {
          setShowConfirmation(false)
          history.push({
            pathname: "/laughter",
            search: `videoId=${vidId}`,
          })
        }, 3000);
      } else {
        setShowConfirmation(false)
        return;
      }
    })
  }

  const prev = () => {
    setCurrent(current - 1)
  }


  return (
    <div className="w-full relative flex flex-col items-center justify-center">
      
      {
        showConfirmation ? <SendConfirmation /> : ""
      }
      {
       isSettingVisible ? 
       <SettingModal
          specialMessage={specialMessage}
          setSpecialMessage={setSpecialMessage}
          textColor={textColor}
          setTextColor={setTextColor}
          textSize={textSize}
          setTextSize={setTextSize}
          handleSettingModal={handleSettingModal}
       />
      : ""
      }

      <div className="md:my-0 md:mt-0">{steps[current].content}</div>

      {
        showConfirmation ? "" : (
          <div className="steps-action fixed bottom-2 md:bottom-12 right-10 md:left-0">
            {current < steps.length - 1 && dataSource.length > 0 && (
              <Button
                disabled={loading}
                className="bg-blue-500 text-white w-20 h-8 rounded-xl text-sm outline-none border-none transition hover:bg-blue-400 hover:text-gray-200  md:font-bold duration-800"
                onClick={() => next()}
              >
                Preview
              </Button>
            )}


              {current > 0 && (
              <Button
                disabled={loading}
                className="bg-gray-200 mx-3 text-black w-20 h-8 rounded-xl text-sm outline-none border-none transition hover:bg-blue-400 hover:text-gray-200"
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button
                disabled={sent}
                className={`${sent ? "bg-green-500" : "bg-blue-500"} text-white w-20 h-8 rounded-xl text-sm outline-none border-none transition hover:bg-blue-400 hover:text-gray-200  md:font-bold duration-800`}
                onClick={() => submitLaughterData()}>
                {sent ? "Sent" : "Done"}
              </Button>
            )}

        
          </div>

        )
      }

    </div>
  )
}

export default SendLaughter
