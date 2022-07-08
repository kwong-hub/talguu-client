import './Header.css'

import { Button } from 'antd'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo1.png'
const Header = () => {
  const currentURL = useLocation().pathname
  return (
    <div className="w-full fixed top-0 left-0 right-0 h-14 shadow-sm z-10 flex justify-between items-center bg-white bg-opacity-80 backdrop-blur-2xl">
      <div className="text-2xl flex items-center justify-center header_title text-gray-500">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="" className="rounded h-14 p-2" />
        </Link>
      </div>
      <div className="flex max-h-10 rounded-3xl cursor-pointer">
        <Link to="/login">
          <Button
            shape="round"
            className={
              'flex items-center m-1 px-4 bg-transparent border-blue-500 text-blue-500 font-bold' +
              (currentURL !== '/login'
                ? 'border-blue-500 bg-transparent text-blue-500 font-bold'
                : '')
            }
          >
            Login
          </Button>
        </Link>
        <Link to="/signup_viewer">
          <Button
            shape="round"
            className={
              'flex items-center m-1 px-4 bg-transparent border-blue-500 text-blue-500 font-bold cursor-pointer' +
              (currentURL !== '/signup_viewer'
                ? 'border-blue-700 bg-transparent text-white font-bold cursor-pointer'
                : '')
            }
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Header
