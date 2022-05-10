import React from 'react'
import SideNav from '../../partials/sideNav/SideNav'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const LeaveConference = () => {
  const history = useHistory()
  return (
    <div>
      <SideNav></SideNav>
      <div className="flex flex-col items-center justify-start mt-20 ">
        <h1 className="text-5xl p-2">YOU HAVE LEFT THE CONF BROADCASTING</h1>
        <div className="flex py-4">
          <Button
            className="mx-2"
            onClick={(e) => history.goBack()}
            type="primary"
          >
            Rejoin
          </Button>
          <Button onClick={(e) => history.push('/')} type="primary">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeaveConference
