import './SignupViewer.css'

import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaFacebook, FaGoogle, FaLock, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/streaming.png'
import Header from '../../partials/header/Header'
import { CREATE_VIEWER_ASYNC, CREATE_VIEWER_RESET } from '../../redux/types'

const SignupViewer = () => {
  const [formValues, setFormValues] = useState(() => {
    return { phoneNumber: '12341234234' }
  })
  const [currentForm, setCurrentForm] = useState(0)
  const [loading, setLoading] = useState(false)
  const [viewerErrMessages, setErrMessage] = useState('')

  const dispatch = useDispatch()
  const serverErrors = useSelector((state) => state.account.viewerErrMessages)
  const createViewerStatus = useSelector((state) => state.account.createViewerStatus)

  useEffect(() => {
    setErrMessage(serverErrors)
    setLoading(false)
  }, [serverErrors])

  useEffect(() => {
    if (createViewerStatus === 'SUCCESSFUL') {
      setCurrentForm(1)
      setLoading(false)
      setErrMessage('')
      setFormValues(() => {
        return { phoneNumber: '12341234234' }
      })
      dispatch({ type: CREATE_VIEWER_RESET, payload: '' })
    }
  }, [createViewerStatus])

  useEffect(() => {
    setCurrentForm(0)
  }, [])

  const onPersonalFinish = (values) => {
    setLoading(true)
    setFormValues((prevValue) => {
      return { ...prevValue, ...values }
    })
    dispatch({
      type: CREATE_VIEWER_ASYNC,
      payload: { ...formValues, ...values }
    })
    setErrMessage('')
  }

  const renderPersonal = () => {
    return (
      <Form
        layout='vertical'
        name='personal'
        initialValues={{ remember: true }}
        onFinish={onPersonalFinish}>
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Please input your first Name!' }]}>
          <Input
            className='rounded-2xl'
            prefix={<FaUser className='site-form-item-icon' />}
            placeholder='First Name*'
          />
        </Form.Item>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Please input your last Name!' }]}>
          <Input
            className='rounded-2xl'
            prefix={<FaUser className='site-form-item-icon' />}
            placeholder='Last Name*'
          />
        </Form.Item>
        {/* <Form.Item name="companyName">
          <Input
            className="rounded-2xl"
            prefix={<FaBuilding className="site-form-item-icon" />}
            placeholder="Company Name"
          />
        </Form.Item> */}
        <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input
            className='rounded-2xl'
            prefix={<FaEnvelope className='site-form-item-icon' />}
            placeholder='E-mail Address*'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input
            className='rounded-2xl '
            prefix={<FaLock className='site-form-item-icon' />}
            type='password'
            placeholder='Password*'
          />
        </Form.Item>
        <Form.Item
          name='confirm_password'
          rules={[{ required: true, message: 'Please Confirm your Password!' }]}>
          <Input
            className='rounded-2xl '
            prefix={<FaLock className='site-form-item-icon' />}
            type='password'
            placeholder='Confirm Password*'
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type='primary'
            htmlType='submit'
            shape='round'
            className='login-form-button w-full'>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const renderVerifyEmail = () => {
    return (
      <div className='w-80 h-screen flex items-center text-md text-gray-600 text-center mx-auto'>
        <div style={{ height: 'fit-content' }}>
          We have sent an email to your account. Please verify your email to login.
          <div className='w-full'>
            <Link to='/login'>
              <Button type='primary' shape='round' className='flex items-center m-1 px-4 mx-auto'>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className='flex m-auto items-center justify-center w-auto md:p-8 pt-2 mt-14'>
        <div className='flex justify-center items-center h-full w-full max-w-sm'>
          {currentForm !== 1 ? (
            <div className='w-full  flex flex-col justify-center m-4 p-4 py-8 shadow-md rounded-2xl bg-white'>
              <div className='flex justify-center flex-col items-center '>
                <img className='' src={logo} alt='Logo' width={50} />

                <p className='text-2xl text-gray-700 my-6'>Create a New Account</p>
                <div className='flex bg-gray-100 rounded-3xl mb-8'>
                  <Link to='/login'>
                    <Button
                      shape='round'
                      className='flex items-center border-transparent bg-transparent m-1 px-4'>
                      Login
                    </Button>
                  </Link>
                  <Link to='/signup_viewer'>
                    <Button shape='round' className='flex items-center   m-1 px-4'>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              <div className='w-full text-red-500 text-md text-center mb-4'>
                {viewerErrMessages}
              </div>
              <div>
                {renderPersonal()}
                <div>
                  <div className='flex px-2 text-blue-500 text-lg'>
                    <Link to='/signupprd'>Join as Producer</Link>
                  </div>
                  <p className='my-6'>OR USING</p>
                  <div className='flex justify-evenly'>
                    <Button shape='round' icon={<FaGoogle />} className='flex items-center p-2'>
                      Google
                    </Button>
                    <Button
                      className='flex items-center p-2'
                      type='primary'
                      shape='round'
                      icon={<FaFacebook />}>
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            renderVerifyEmail()
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupViewer
