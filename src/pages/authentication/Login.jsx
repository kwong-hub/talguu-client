import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { FaFacebook, FaGoogle, FaLock, FaUser } from 'react-icons/fa'
import { connect, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { userService } from '../../_services/user.service'
import logo from '../../assets/images/logo1.png'
import Header from '../../partials/header/Header'

const Login = (props) => {
  const [error, setError] = useState()
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const forgotPassword = () => {
    history.push('/forgot_password')
  }

  const onFinish = (values) => {
    userService
      .login(values)
      .then((resp) => {
        if (resp.success) {
          dispatch({ type: 'LOGIN_ASYNC', payload: resp })
          if (location.search) {
            history.push({
              pathname: location.search.replace('?return_url=', '')
            })
          } else {
            history.push('/')
          }
        } else {
          dispatch({ type: 'LOGIN_FAIL' })
          setError(resp.messages ? resp.messages[0] : 'Can not login try again')
        }
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_FAIL' })
        console.log(err)
      })
  }

  return (
    <div className="relative">
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
      <div className="flex justify-center items-center h-full pt-2 mt-14">
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

                <a
                  className="login-form-forgot"
                  onClick={(e) => forgotPassword()}
                >
                  Forgot password
                </a>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapState(state) {
  const { loggingIn } = state.authentication
  return { loggingIn }
}

const connectedLoginPage = connect(mapState, null)(Login)
export { connectedLoginPage as Login }
