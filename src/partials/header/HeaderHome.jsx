import './Header.css'

import { Button } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo1.png'
const HeaderHome = () => {
  const currentURL = useLocation().pathname
  return (
    <div className="w-full fixed top-0 left-0 right-0 h-14 shadow-sm bg-gray-900 z-10 flex justify-between items-center">
      <div className="text-2xl flex items-center justify-center header_title text-gray-500">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="" className="rounded h-14 p-2" />
        </Link>
      </div>
      <div className="flex max-h-10  rounded-3xl cursor-pointer">
        <Link to="/">
          <Button
            shape="round"
            className={
              'flex items-center m-1 px-4 text-white' +
              (currentURL !== '/' ? 'border-transparent ' : '')
            }
          >
            Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HeaderHome
