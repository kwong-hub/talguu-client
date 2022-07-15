import React, { useEffect, useState } from 'react'

import { Avatar, Button, Input, Form } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { BiUserCircle } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdWorkOutline } from 'react-icons/md'
import { RiChatFollowUpFill } from 'react-icons/ri'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useHistory, useParams } from 'react-router-dom'
import { userService } from '../../../_services/user.service'

export const ProducerProfile = () => {
  const history = useHistory()
  const [followText, setFollowText] = useState('')

  const { TextArea } = Input

  const { producerId } = useParams()

  const [loading, setLoading] = useState(false)
  const [producerInfo, setProducerInfo] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  
  // get producers infos
  useEffect(() => {
    getProducerInfo()
  }, [])

  const getProducerInfo = () => {
    setIsLoading(true)
    userService.getProducerProfile(producerId).then((resp) => {
      const { success, producer } = resp.data
      if (success) {
        const { dataValues, firstName, lastName, email } = producer
        setProducerInfo({
          ...dataValues,
          firstName,
          lastName,
          email
        })
      } else {
        setProducerInfo({})
      }
      setIsLoading(false)
    })
  }

  const followProducer = () => {
    setFollowText('Following')
  }

  const back = () => {
    history.push({
      pathname: `/producer/${producerId}`,
    })
  }

  return (
    <div className="flex flex-col mt-4">
      {loading ? (
        <>{''}</>
      ) : (
        <>
          <div className="flex items-center justify-between px-2 py-3">
            <button type="button" className="my-4 mx-4" onClick={back}>
              <BsFillArrowLeftCircleFill className="w-6 h-6 text-purple-800" />
            </button>
            <div className="flex items-center">
              <Avatar size={44} icon={<UserOutlined />} />

              <div className="flex flex-col items-center px-3">
                <h3 className="text-xl text-gray-600">
                  {producerInfo.firstName} {producerInfo.firstName}
                </h3>
                <p className="text-sm text-gray-700">{producerInfo.email}</p>
              </div>
            </div>
            {followText ? (
              <p className="mr-3 text-blue-600 text-xl border-2 px-3 py-1">
                Friend
              </p>
            ) : (
              <button
                onClick={() => followProducer()}
                type="primary"
                style={{
                  background: '#fc1c03',
                  borderColor: '#fc1c03',
                  fontWeight: 'bold'
                }}
                className="text-xl px-3 py-1 text-white"
              >
                {'Follow'}
              </button>
            )}
          </div>

          <div className="my-10 px-5 shadow-md pb-10">
            <div className="flex flex-col">
              <p>Intro</p>
              <div className="my-5 border-blue-600 border py-3 px-2 rounded">
                <p>
                  I am a camera man, producer and video creator. I have much
                  additional experiences on programming
                </p>
              </div>
              <div className="flex items-center p-2">
                <BiUserCircle className="w-6 h-6 text-gray-700 mx-3" />
                <p className="self-center">
                  {producerInfo.firstName} {producerInfo.firstName}
                </p>
              </div>
              <div className="flex items-center p-2 my-2">
                <HiOutlineLocationMarker className="w-6 h-6 text-gray-700 mx-3" />
                <p className="self-center">Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex items-center p-2">
                <MdWorkOutline className="w-6 h-6 text-gray-700 mx-3" />
                <p className="self-center">
                  Camera man, video creator and producer
                </p>
              </div>
              <div className="flex items-center p-2">
                <RiChatFollowUpFill className="w-6 h-6 text-gray-700 mx-3" />
                <p className="self-center">
                  Followed by{' '}
                  <span className="text-purple-600 text-bold text-xl">
                    1,1290
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default ProducerProfile
