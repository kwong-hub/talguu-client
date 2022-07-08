import { Button, Input, Form, message } from 'antd'
import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import Header from '../../partials/header/Header'
import logo from '../../assets/images/logo1.png'
import { userService } from '../../_services/user.service'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [error] = useState()
  const [success, setSuccess] = useState(false)
  const onFinish = (values) => {
    userService
      .forgotPassword(values)
      .then((data) => {
        if (data.success) {
          setSuccess(true)
        } else {
          message.error('Unable to send-email.')
        }
      })
      .catch(() => message.err('Failed to send.Try again later.'))
  }

  return (
    <div className="relative">
      <Header />

      <div className="px-5 flex flex-col items-center justify-center h-screen bg-blue-300 ">
        
     

        {success ? (
          <div>
            <p>Reset Link is sent to you email. Check your email address.</p>
            <Link to="/login">
              <Button type="primary"> Back to Login</Button>
            </Link>
          </div>
        ) : (
          <div className=" bg-opacity-70 bg-gray-100 backdrop-blur-2xl shadow-xl rounded-xl p-4  max-w-md text-white">
              <img className="" src={logo} alt="Logo" width={70} />
        <p className="text-blue-500 text-xl py-4">Forgot Password</p>
           
           
            <p className="text-blue-500">
              Enter your verifed email address and we will send you a password
              reset link.
            </p>
            <p className="text-center bg-gray-200 text-red-800 mb-4 ">
              {error}
            </p>
            <Form
              name="normal_login"
              className="login-form md:px-4"
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
                  className="rounded-xl w-64 h-10"
                  prefix={<FaUser className="site-form-item-icon text-blue-500" />}
                  placeholder="E-mail Address"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-44"
                >
                  Send Email
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      
      </div>
    </div>
  )
}

export default ForgotPassword
