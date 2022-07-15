import React, { useEffect, useState } from 'react'

import { Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import SideNav from '../../../partials/sideNav/SideNav';
import { laughterService } from '../../../_services/laughter.service'
import { LoadingOutlined } from '@ant-design/icons'
import { useSwipeable } from 'react-swipeable';
import { config } from '../swiperConfig';
import { userService } from '../../../_services/user.service';
import RenderLaughterVideos from '../RenderLaughterVideos';


import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

export const Producer = () => {

    const history = useHistory()

    const { producerId } = useParams()

    const location = useLocation()



    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [total, setTotal] = useState(0)
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [producerInfo, setProducerInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

    // fetch the producer info first
    // fetch the laughters that belongs to this producer

    // get videos belonging to the producer
    useEffect(() => {
        getAllVideos(page, pageSize)

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


   


    const getAllVideos = (page, pageSize) => {
        setLoading(true)
        laughterService.getProducerLaughterVideos(producerId, page, pageSize).then((res) => {
            const success = res.data?.success
            const videos = res.data?.videos
            // console.log("Videos: ", videos)
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




    const producerProfile = () => {
        history.push({
          pathname: `/producer-profile/${producerId}`,
        })
    }


    const fetchMoreData = () => {
        // log('fetchMore called!')

        // setLoading(true)
        // if (dataSource.length === total) {
        //   setHasMore(false)
        //   return
        // }
        setPage(page + 1)
    }


    const back = () => {
        // history.push({
        //   pathname: `/laughter/watch/${vidId}`,
        // })
      const user = JSON.parse(localStorage.getItem('user'))

      if (!user || user.role !== 'VIEWER') {
        history.push({
          pathname: '/laughter-home',
       
        })
      } else {
        history.push({
          pathname: `/laughter`,

        })
      }
    }


    return (
      <div>
        <div className="pt-2 sm:ml-14 mt-12">
          <SideNav></SideNav>
          <div className="flex relative mt-2 border-2 lg:ml-0 flex-wrap xl:w-3/12 min-h-full w-auto lg:min-w-full lg:max-w-full border-white">
           
            <div className="flex items-center justify-between w-full">
              {isLoading ? // <><Spin indicator={antIcon} /></>
              null : (
                <>
                  <div className="w-10 mx-2">
                    <button type="button" className="w-full" onClick={back}>
                      <BsFillArrowLeftCircleFill className="w-8 h-8 text-blue-500" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between px-2 w-full">
                    <div className="flex items-center">
                      <Avatar size={40} icon={<UserOutlined />} />

                      <div className="flex flex-col items-center px-3 py-3">
                        <h3 className="text-xl text-gray-600">
                          {producerInfo.firstName} {producerInfo.firstName}
                        </h3>
                        <p className="text-sm text-gray-700">
                          {producerInfo.email}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => producerProfile()}
                      type="primary"
                      className="outline outline-2 mr-2"
                    >
                      Profile
                    </Button>
                  </div>
                </>
              )}
            </div>

            <div className="w-full mt-4">
              <RenderLaughterVideos
                dataSource={dataSource}
                antIcon={antIcon}
                fetchMoreData={fetchMoreData}
                hasMore={hasMore}
                loading={loading}
                type="producerVideos"
                page={page}
                pageSize={pageSize}
              />

            </div>
          </div>
        </div>
      </div>
    )
}
export default Producer