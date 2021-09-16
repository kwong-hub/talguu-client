import './SignupPrd.css'

import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  FaBuilding,
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaPhone,
  FaUser
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../../assets/images/logo1.png'
import Header from '../../partials/header/Header'
import { CREATE_PRODUCER_ASYNC, CREATE_PRODUCER_RESET } from '../../redux/types'

const SignupPrd = () => {
  const [form] = Form.useForm()
  const [prevValue, setPrevValue] = useState('')
  const [formValues, setFormValues] = useState({})
  const [currentForm, setCurrentForm] = useState(0)
  const [loading, setLoading] = useState(false)
  const [errMessages, setErrMessage] = useState('')
  const serverErrors = useSelector((state) => state.account.errMessages)
  const dispatch = useDispatch()
  const createUserStatus = useSelector(
    (state) => state.account.createUserStatus
  )

  useEffect(() => {
    setErrMessage(serverErrors)
  }, serverErrors)

  useEffect(() => {
    if (createUserStatus === 'SUCCESSFUL') {
      setCurrentForm(1)
      setLoading(false)
      setErrMessage('')
      setFormValues(() => {
        return { phoneNumber: '12341234234' }
      })
      dispatch({ type: CREATE_PRODUCER_RESET, payload: '' })
    }
  }, createUserStatus)

  useEffect(() => {
    setCurrentForm(0)
  }, [])

  const onPersonalFinish = (values) => {
    setLoading(true)
    setFormValues({
      ...values,
      phoneNumber: phoneChangeFormat(values?.phoneNumber, 'db')
    })
    dispatch({
      type: CREATE_PRODUCER_ASYNC,
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
        form={form}
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onPersonalFinish}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your first Name!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon" />}
            placeholder="First Name*"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your last Name!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon" />}
            placeholder="Last Name*"
          />
        </Form.Item>
        <Form.Item name="companyName">
          <Input
            className="rounded-2xl"
            prefix={<FaBuilding className="site-form-item-icon" />}
            placeholder="Public Name (Editable Later)*"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            className="rounded-2xl"
            prefix={<FaEnvelope className="site-form-item-icon" />}
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
            prefix={<FaLock className="site-form-item-icon" />}
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
            prefix={<FaLock className="site-form-item-icon" />}
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
            Submit
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
      <div className="flex justify-center m-auto items-center w-full md:p-8 pt-2 mt-14">
        <div className="flex justify-center items-center h-full w-full max-w-lg">
          {currentForm !== 1 ? (
            <div className="w-full  max-w-sm flex flex-col justify-center my-4 p-4 py-8 shadow-md rounded-2xl bg-white">
              <div className="flex justify-center flex-col items-center ">
                <img className="" src={logo} alt="Logo" width={50} />

                <p className="text-2xl text-gray-700 my-6">
                  Create Producer Account
                </p>
                <div className="flex bg-gray-100 rounded-3xl mb-8">
                  <Link to="/login">
                    <Button
                      shape="round"
                      className="flex items-center border-transparent bg-transparent m-1 px-4"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signupprd">
                    <Button
                      shape="round"
                      className="flex items-center   m-1 px-4"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full text-red-500 text-md text-center mb-4">
                {errMessages}
              </div>
              <div>
                {currentForm === 0 ? renderPersonal() : ''}
                <div>
                  <p className="my-6">OR USING</p>
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
          ) : (
            renderVerifyEmail()
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupPrd
