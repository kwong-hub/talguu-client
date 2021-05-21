import React from 'react'
import SideNav from '../../partials/sideNav/SideNav'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const LeaveConference = () => {
  const history = useHistory()
  return (
    <div>
      <SideNav></SideNav>
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <div className="md:w-1/2 max-w-32 ">
          <div className="">
            <h1 className="text-3xl font-semibold p-2">You Left the Meeting</h1>
          </div>
          <div className="flex py-4">
            <Button onClick={(e) => history.goBack()} type="primary">
              Rejoin
            </Button>
            <Button onClick={(e) => history.push('/')} type="primary">
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveConference
