import { Button, Checkbox, Form, Input, message, Modal } from 'antd'
import React, { useState } from 'react'
import {
  FaFacebook,
  FaGoogle,
  FaLock,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaUser
} from 'react-icons/fa'
import { connect, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { userService } from '../../_services/user.service'
import logo from '../../assets/images/logo1.png'
import msp from '../../assets/images/msp-icon.png'
import jobDor from '../../assets/images/jobdor.png'
import Header from '../../partials/header/Header'

const Login = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const [error, setError] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [application, setApplication] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [appRole, setAppRole] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')

  const forgotPassword = () => {
    history.push('/forgot_password')
  }

  const handleViewerSignUp = () => {
    const values = { email, agreed, phoneNumber, password, appRole }
    userService
      .createViewerLocal(values)
      .then((res) => {
        if (res.success) {
          message.success('Successfully created user. You can login now.')
          setModalVisible(false)
          // dispatch({ type: 'LOGIN_ASYNC', payload: res })
          // if (location.search) {
          //   history.push({
          //     pathname: location.search.replace('?return_url=', '')
          //   })
          // } else {
          //   history.push('/')
          // }
        }
      })
      .catch((err) => {
        // dispatch({ type: 'LOGIN_FAIL' })
        setModalVisible(false)
        console.log(err)
      })
  }

  const handleProducerSignUp = () => {
    const values = {
      email,
      agreed,
      phoneNumber,
      password,
      appRole,
      companyName
    }
    userService
      .createProducerLocal(values)
      .then((res) => {
        if (res?.success) {
          message.success('Successfully created user. You can login now.')
          setModalVisible(false)
          // dispatch({ type: 'LOGIN_ASYNC', payload: res })
          // if (location.search) {
          //   history.push({
          //     pathname: location.search.replace('?return_url=', '')
          //   })
          // } else {
          //   history.push('/')
          // }
        }
      })
      .catch((err) => {
        // dispatch({ type: 'LOGIN_FAIL' })
        setModalVisible(false)
        console.log(err)
      })
  }

  const onFinish = (values) => {
    userService
      .login(values)
      .then((resp) => {
        if (resp.success) {
          if (['PRODUCER', 'VIEWER'].includes(resp.role)) {
            dispatch({ type: 'LOGIN_ASYNC', payload: resp })
            if (location.search) {
              history.push({
                pathname: location.search.replace('?return_url=', '')
              })
            } else {
              history.push('/')
            }
          } else {
            if (['BUYER', 'APPLICANT'].includes(resp.role)) {
              setModalVisible(true)
              setEmail(resp.email)
              setRole(resp.role)
              setPhoneNumber(resp.phoneNumber)
              setAppRole('VIEWER')
              setApplication(
                resp.role === 'BUYER' ? 'MANAGERSPECIAL.COM' : 'JOBDOR.COM'
              )
            } else if (['SELLER', 'EMPLOYER'].includes(resp.role)) {
              setModalVisible(true)
              setEmail(resp.email)
              setRole(resp.role)
              setPhoneNumber(resp.phoneNumber)
              setCompanyName(resp.companyName)
              setAppRole('PRODUCER')
              setApplication(
                resp.role === 'SELLER' ? 'MANAGERSPECIAL.COM' : 'JOBDOR.COM'
              )
            }
          }
        } else {
          dispatch({ type: 'LOGIN_FAIL' })
          setError(
            resp?.messages ? resp?.messages[0] : 'Can not login try again'
          )
        }
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_FAIL' })
        console.log(err)
      })
  }

  return (
    <div className="relative h-screen">
      <Header />

      <div className="absolute bottom-20 left-0 w-64 ">
        <img
          src={require('../../assets/images/login-svg-2.svg').default}
          alt="Logo"
        />
      </div>
      <div className="absolute bottom-10 left-0 w-1/4 ">
        <img
          src={require('../../assets/images/login-svg.svg').default}
          alt="Logo"
        />
      </div>
      <div className="flex justify-center items-center h-full pt-2 mt-4">
        <div className="w-full max-w-xs flex flex-col justify-center m-4 p-4 py-8 shadow-md rounded-2xl bg-white">
          <div className="flex justify-center flex-col items-center ">
            <img className="w-32" src={logo} alt="Logo" />
            <p className="text-sm text-purple-600 my-4">
              Welcome back to Talguu
            </p>

            <p className="text-2xl text-gray-700 mb-4">
              Login into you Account!
            </p>
            <div className="flex bg-gray-100 rounded-3xl mb-8">
              <Link to="/login">
                <Button
                  shape="round"
                  className="flex items-center text-white m-1 px-4 bg-blue-500"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup_viewer">
                <Button
                  shape="round"
                  className="flex items-center border-transparent bg-transparent m-1 px-4"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <p className="text-center bg-gray-200 text-red-800 mb-4 ">
              {error}
            </p>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' }
                ]}
              >
                <Input
                  className="rounded-2xl"
                  prefix={<FaUser className="site-form-item-icon" />}
                  placeholder="E-mail Address"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' }
                ]}
              >
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="rounded-2xl "
                  prefix={<FaLock className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <p
                  className="login-form-forgot"
                  onClick={(e) => forgotPassword()}
                >
                  Forgot password
                </p>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-full "
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
{/* 
            <div>
              <p className="my-4">OR USING</p>
              <div className="flex justify-evenly">
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
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <Modal
        title={null}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
        }}
        onCancel={() => {
          setModalVisible(false)
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
            <div>
              <p className="text-gray-700 text-lg py-4 pb-8 text-center w-full">
                Please read our terms and conditions to continue.
              </p>
            </div>
            <div>
              <Checkbox
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked)
                }}
              >
                I have read and agreed to the{' '}
                <a href="" className="text-blue-500">
                  {' '}
                  terms{' '}
                </a>{' '}
                and{' '}
                <a href="" className="text-blue-500">
                  {' '}
                  condition{' '}
                </a>
              </Checkbox>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setModalVisible(false)
              }}
              type="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={!agreed}
              onClick={() => {
                if (appRole === 'VIEWER') {
                  handleViewerSignUp()
                } else if (appRole === 'PRODUCER') {
                  handleProducerSignUp()
                } else {
                  setModalVisible(false)
                }
              }}
              type="primary"
              className="ml-4"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

function mapState(state) {
  const { loggingIn } = state.authentication
  return { loggingIn }
}

const connectedLoginPage = connect(mapState, null)(Login)
export { connectedLoginPage as Login }
