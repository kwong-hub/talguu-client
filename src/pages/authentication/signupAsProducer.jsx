import './SignupPrd.css'

import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  FaBuilding,
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaPhone,
  FaUser,
  FaLongArrowAltRight,
  FaLongArrowAltLeft
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../assets/images/logo1.png'
import msp from '../../assets/images/msp-icon.png'
import jobDor from '../../assets/images/jobdor.png'
import Header from '../../partials/header/Header'
import { CREATE_PRODUCER_ASYNC, CREATE_PRODUCER_RESET } from '../../redux/types'

const signupAsProducer = () => {
 
  return (
    <div>
      <Header />
      <div className="flex justify-center m-auto items-center w-full md:p-8 pt-2">
        <div className="flex justify-center items-center h-screen w-full max-w-lg">
          <div className="w-full flex flex-col justify-center my-4 p-4 py-8 shadow-md rounded-2xl bg-white h-full">
            <div className="flex justify-center flex-col items-center ">
              <img className="" src={logo} alt="Logo" width={90} />

              <p className="text-2xl text-gray-700 my-6">On invitation only</p>
              <p className="text-md text-gray-700 my-6">
                If you are interested in joining, please send an email to
                <span style={{color:"#1890ff"}}> kwong@talguu.com </span>
              </p>
              <div className="flex bg-white mb-8">
                <Link
                  to="/login"
                  className=" rounded-3xl border-green-700 px-5"
                >
                  <Button
                    shape="round"
                    style={{background:"#1890ff", paddingLeft:"20px", paddingRight:"20px"}}
                    type='primary'
                    className="flex items-center border-transparent bg-transparent m-1 px-4"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signupAsProducer
