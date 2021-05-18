import React from 'react'
import SideNav from '../../partials/sideNav/SideNav'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const CreateConference = () => {
  const history = useHistory()

  return (
    <div>
      <SideNav></SideNav>
      <div className="flex flex-col items-center justify-center w-full h-screen ">
        <div className="md:w-1/2 max-w-32 ">
          <div className="">
            <h1 className="text-3xl font-semibold p-2">
              Start conference meeting and publish it to multiple audience.
            </h1>
            <p className="font-ligth">
              Create conference, invite user to join your conference, you make
              it public to the viewer{' '}
            </p>
          </div>
          <Button
            onClick={(e) => history.push('/conference_started')}
            className="my-4"
            type="primary"
          >
            Start Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateConference
