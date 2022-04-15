import './SignupViewer.css'

import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import {
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
import { CREATE_VIEWER_ASYNC, CREATE_VIEWER_RESET } from '../../redux/types'

const SignupViewer = () => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState({})
  const [currentForm, setCurrentForm] = useState(0)
  const [showError, setShowError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewerErrMessages, setErrMessage] = useState('')
  const [prevValue, setPrevValue] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [appRole, setAppRole] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  // const [companyName, setCompanyName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [application, setApplication] = useState('')

  const dispatch = useDispatch()
  const serverErrors = useSelector((state) => state.account.viewerErrMessages)
  const viewerUser = useSelector((state) => state.account.viewerUser)
  const createViewerStatus = useSelector(
    (state) => state.account.createViewerStatus
  )

  useEffect(() => {
    setErrMessage(serverErrors)
    setLoading(false)
  }, [serverErrors])

  useEffect(() => {
    if (createViewerStatus === 'SUCCESSFUL') {
      setLoading(false)
      if (viewerUser) {
        if (['BUYER', 'APPLICANT'].includes(viewerUser.role)) {
          setModalVisible(true)
          setEmail(viewerUser.email)
          setRole(viewerUser.role)
          setAppRole('VIEWER')
          setApplication(
            viewerUser.role === 'BUYER' ? 'MANAGERSPECIAL.COM' : 'JOBDOR.COM'
          )
          return
        } else if (['SELLER', 'EMPLOYER'].includes(viewerUser.role)) {
          setModalVisible(true)
          setEmail(viewerUser.email)
          setRole(viewerUser.role)
          setAppRole('PRODUCER')
          setApplication(
            viewerUser.role === 'SELLER' ? 'MANAGERSPECIAL.COM' : 'JOBDOR.COM'
          )
          return
        }
      }

      setCurrentForm(1)
      setLoading(false)
      setErrMessage('')
      setFormValues({})
      dispatch({ type: CREATE_VIEWER_RESET, payload: '' })
    } else {
      setShowError(true)
    }
  }, [createViewerStatus])

  useEffect(() => {
    setCurrentForm(0)
  }, [])

  const onPersonalFinish = (values) => {
    setShowError(true)
    setLoading(true)
    setFormValues({
      ...values,
      phoneNumber: phoneChangeFormat(values?.phoneNumber, 'db')
    })
    dispatch({
      type: CREATE_VIEWER_ASYNC,
      payload: {
        ...formValues,
        ...values,
        phoneNumber: phoneChangeFormat(values?.phoneNumber, 'db')
      }
    })
    setErrMessage('')
  }

  const updateFormat = (value) => {
    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
    form.setFieldsValue({ phoneNumber: value })
  }

  const phoneNumberChangeEvent = (val) => {
    if (val.length >= 14) {
      const x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)
      if (x !== -1) {
        const str = val.slice(x, x + 14)
        form.setFieldsValue({ phoneNumber: str })
      } else {
        form.setFieldsValue({ phoneNumber: '' })
      }
    }
  }

  const phoneNumberChange = (value) => {
    if (value.length === 10 && /^\d+$/.test(value)) {
      updateFormat(value)
      return
    }
    const val = value
    if (val.length > 14) {
      phoneNumberChangeEvent(value)
      return
    }
    const lk = val[val.length - 1]
    if (prevValue.length < val.length) {
      if (
        lk &&
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(lk)
      ) {
        if (val.length === 3) {
          if (val[0] === '1' || val[0] === '0') {
            form.setFieldsValue({ phoneNumber: val.slice(1) })
          }
        } else if (val.length === 4) {
          form.setFieldsValue({ phoneNumber: `(${val.slice(0, 3)}) ${val[3]}` })
        } else if (val.length === 10) {
          form.setFieldsValue({ phoneNumber: `${val.slice(0, 9)}-${val[9]}` })
        }
      } else if (lk) {
        form.setFieldsValue({ phoneNumber: val.slice(0, val.length - 1) })
      }
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(lk)) {
        setPrevValue(value)
      }
    } else {
      if (val.length === 3) {
        if (val[0] === '1' || val[0] === '0') {
          form.setFieldsValue({ phoneNumber: val.slice(1) })
        }
      }
      if (val[val.length - 1] === ' ' && val.length === 6) {
        form.setFieldsValue({ phoneNumber: `${val.slice(1, 4)}` })
        setPrevValue(val.slice(1, 4))
      } else if (isNaN(val) && val.length <= 4) {
        form.setFieldsValue({ phoneNumber: `${val.replace(/\D/g, '')}` })
      } else {
        console.log(form.getFieldsValue())
        setPrevValue(form.getFieldsValue().phoneNumber)
      }
    }
  }

  const phoneChangeFormat = (value, type) => {
    if (type === 'db') {
      return '+1' + value.replace(/[()-\s]/g, '')
    } else {
      const v = value.replace('+1', '').replace(/[()-\s]/g, '')
      return `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`
    }
  }

  const renderPersonal = () => {
    return (
      <Form
        layout="vertical"
        name="personal"
        initialValues={{ remember: true }}
        onFinish={onPersonalFinish}
        form={form}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your first Name!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon mr-2" />}
            placeholder="First Name*"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your last Name!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon mr-2" />}
            placeholder="Last Name*"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaEnvelope className="site-form-item-icon mr-2" />}
            placeholder="E-mail Address*"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            {
              pattern: /^(\(\d{3}\))(\s)\d{3}(-)\d{4}$/g,
              message:
                'Invalid phone number format. The valid format is (000) 000-0000'
            }
          ]}
        >
          <Input
            onChange={(e) => {
              phoneNumberChange(e.target.value)
            }}
            className="rounded-2xl"
            prefix={
              <span className="flex justify-center items-center">
                <FaPhone className="site-form-item-icon mr-2" />
                +1
              </span>
            }
            placeholder="(000) 000-0000"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            className="rounded-2xl "
            prefix={<FaLock className="site-form-item-icon mr-2" />}
            type="password"
            placeholder="Password*"
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          rules={[{ required: true, message: 'Please Confirm your Password!' }]}
        >
          <Input
            className="rounded-2xl "
            prefix={<FaLock className="site-form-item-icon mr-2" />}
            type="password"
            placeholder="Confirm Password*"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            shape="round"
            className="login-form-button w-full"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const renderVerifyEmail = () => {
    return (
      <div className="w-80 h-screen flex items-center text-md text-gray-600 text-center mx-auto">
        <div style={{ height: 'fit-content' }}>
          We have sent an email to your account. Please verify your email to
          login.
          <div className="w-full">
            <Link to="/login">
              <Button
                type="primary"
                shape="round"
                className="flex items-center m-1 px-4 mx-auto"
              >
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
      <div className="flex m-auto items-center justify-center w-auto md:p-8 pt-2 mt-1">
        <div className="flex justify-center items-center h-full w-full max-w-sm">
          {currentForm !== 1 ? (
            <div className="w-full  flex flex-col justify-center m-4 p-4 py-6 shadow-md rounded-2xl bg-white">
              <div className="flex justify-center flex-col items-center ">
                {/* <img className="" src={logo} alt="Logo" width={50} /> */}

                <p className="text-2xl text-gray-700 mb-6">
                  Create a New Account
                </p>
                <div className="flex bg-gray-100 rounded-3xl mb-7">
                  <Link to="/login">
                    <Button
                      shape="round"
                      className="flex items-center m-1 px-4"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup_viewer">
                    <Button
                      shape="round"
                      className="flex items-center m-1 px-4"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              {showError && (
                <div className="w-full text-red-500 text-md text-center mb-4">
                  {viewerErrMessages}
                </div>
              )}
              <div>
                {renderPersonal()}
                <div>
                  <div className="flex px-2 text-blue-500 text-lg">
                    <Link to="/signupprd">Join as Producer</Link>
                  </div>
                  {/* <p className="my-6">OR USING</p> */}
                  
                  {/* <div className="flex justify-evenly">
                    <Button
                      shape="round"
                      icon={<FaGoogle />}
                      className="flex items-center p-2"
                    >
                      Google
                    </Button>
                    <Button
                      className="flex items-center p-2"
                      type="primary"
                      shape="round"
                      icon={<FaFacebook />}
                    >
                      Facebook
                    </Button>
                  </div> */}

                </div>
              </div>
            </div>
          ) : (
            renderVerifyEmail()
          )}
        </div>
      </div>

      <Modal
        title={null}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
          dispatch({ type: CREATE_VIEWER_RESET, payload: '' })
          setShowError(false)
        }}
        onCancel={() => {
          setModalVisible(false)
          dispatch({ type: CREATE_VIEWER_RESET, payload: '' })
          setShowError(false)
        }}
        footer={null}
      >
        <div className="my-4 mx-2">
          <div className="flex-col">
            <div className="flex justify-center items-center">
              {application === 'MANAGERSPECIAL.COM' ? (
                <img src={msp} alt="" className="rounded h-14 p-2" />
              ) : (
                <img src={jobDor} alt="" className="rounded h-14 p-2" />
              )}
              <div className="flex-col text-gray-500 justify-center text-3xl">
                <FaLongArrowAltRight /> <FaLongArrowAltLeft />
              </div>
              <img src={logo} alt="" className="rounded h-14 p-2" />
            </div>
            <p className="text-gray-600 text-md py-4 text-center w-full">
              The email {email} is already registered in {application} as {role}
              . You can use this email to sign in to TALGUU and become a{' '}
              {appRole}. Otherwise, please use a different email to registered
              as a viewer or a producer.
            </p>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => {
                  setModalVisible(false)
                  history.push('/login')
                  dispatch({ type: CREATE_VIEWER_RESET, payload: '' })
                  setShowError(false)
                }}
                type="primary"
                className="-mr-3"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SignupViewer
