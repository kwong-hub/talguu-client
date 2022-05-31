import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Form, Avatar, Button, Input, message, Spin } from 'antd'
import SideNav from '../../partials/sideNav/SideNav'
import { userActions } from '../../_actions'

import { userService } from '../../_services/user.service'
import { FaBuilding, FaKey, FaPhone } from 'react-icons/fa'
import { ImLocation2 } from 'react-icons/im'

import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

import { useHistory } from 'react-router-dom'




const Profile = (props) => {
  const [user, setuser] = useState()
  const [profile, setProfile] = useState()

  const authUser = JSON.parse(localStorage.getItem('user'))
  const userRole = authUser?.role

const [form] = Form.useForm()
const [form2] = Form.useForm()

 const [prevValue, setPrevValue] = useState('')

const history = useHistory()


const updateFormat = (value) => {
  value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`
  form.setFieldsValue({ phoneNumber: value })
  form2.setFieldsValue({ companyPhoneNumber: value })
}

const phoneNumberChangeEvent = (val) => {
  if (val.length >= 14) {
    const x = val.search(/(\(\d{3}\))(\s)\d{3}(-)\d{4}/)
    if (x !== -1) {
      const str = val.slice(x, x + 14)
      form.setFieldsValue({ phoneNumber: str })
      form2.setFieldsValue({ companyPhoneNumber: str })
    } else {
      form.setFieldsValue({ phoneNumber: '' })
      form2.setFieldsValue({ companyPhoneNumber: '' })
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
             form2.setFieldsValue({ companyPhoneNumber: val.slice(1) })
           }
         } else if (val.length === 4) {
           form.setFieldsValue({
             phoneNumber: `(${val.slice(0, 3)}) ${val[3]}`
           })
           form2.setFieldsValue({
             companyPhoneNumber: `(${val.slice(0, 3)}) ${val[3]}`
           })
         } else if (val.length === 10) {
           form.setFieldsValue({ phoneNumber: `${val.slice(0, 9)}-${val[9]}` })
           form2.setFieldsValue({
             companyPhoneNumber: `${val.slice(0, 9)}-${val[9]}`
           })
         }
       } else if (lk) {
         form.setFieldsValue({ phoneNumber: val.slice(0, val.length - 1) })
         form2.setFieldsValue({
           companyPhoneNumber: val.slice(0, val.length - 1)
         })
       }
       if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(lk)) {
         setPrevValue(value)
       }
     } else {
       if (val.length === 3) {
         if (val[0] === '1' || val[0] === '0') {
           form.setFieldsValue({ phoneNumber: val.slice(1) })
           form2.setFieldsValue({ companyPhoneNumber: val.slice(1) })
         }
       }
       if (val[val.length - 1] === ' ' && val.length === 6) {
         form.setFieldsValue({ phoneNumber: `${val.slice(1, 4)}` })
         form2.setFieldsValue({ companyPhoneNumber: `${val.slice(1, 4)}` })
         setPrevValue(val.slice(1, 4))
       } else if (isNaN(val) && val.length <= 4) {
         form.setFieldsValue({ phoneNumber: `${val.replace(/\D/g, '')}` })
         form2.setFieldsValue({
           companyPhoneNumber: `${val.replace(/\D/g, '')}`
         })
       } else {
         console.log(form.getFieldsValue())
         setPrevValue(form.getFieldsValue().phoneNumber)
         setPrevValue(form2.getFieldsValue().companyPhoneNumber)
       }
     }
   }



   const companyPhoneNumberChange = (value) => {
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
             form2.setFieldsValue({ companyPhoneNumber: val.slice(1) })
           }
         } else if (val.length === 4) {
           form2.setFieldsValue({
             companyPhoneNumber: `(${val.slice(0, 3)}) ${val[3]}`
           })
         } else if (val.length === 10) {
           form2.setFieldsValue({
             companyPhoneNumber: `${val.slice(0, 9)}-${val[9]}`
           })
         }
       } else if (lk) {
         form2.setFieldsValue({
           companyPhoneNumber: val.slice(0, val.length - 1)
         })
       }
       if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(lk)) {
         setPrevValue(value)
       }
     } else {
       if (val.length === 3) {
         if (val[0] === '1' || val[0] === '0') {
           form2.setFieldsValue({ companyPhoneNumber: val.slice(1) })
         }
       }
       if (val[val.length - 1] === ' ' && val.length === 6) {
         form2.setFieldsValue({ companyPhoneNumber: `${val.slice(1, 4)}` })
         setPrevValue(val.slice(1, 4))
       } else if (isNaN(val) && val.length <= 4) {
         form2.setFieldsValue({
           companyPhoneNumber: `${val.replace(/\D/g, '')}`
         })
       } else {
         console.log(form.getFieldsValue())
         setPrevValue(form2.getFieldsValue().companyPhoneNumber)
       }
     }
   }

   
  
  const saveBasic = (values) => {
    userService
      .updateUserProfile(values)
      .then((data) => {
        message.success('Successfully updated.')
        setuser({ ...user, ...values })
      })
      .catch((err) => {
        message.success('Failed to update.')
        console.log(err)
      })
  }

  const saveCompany = (values) => {
    const _phoneNumber = values.companyPhoneNumber

    const body = {
      ...values,
      phoneNumber: _phoneNumber
    }
    userService
      .updateCompanyProfile(body)
      .then((data) => {
        message.success('Successfully updated.')
        setProfile(values)
      })
      .catch((err) => {
        message.error('Failed to update.')
        console.log(err)
      })
  }
  const updatePassword = (values) => {
    userService
      .updatePassword(values)
      .then((data) => {
        if (data.success) {
          message.success('Successfully Changed.')
        } else {
          message.error(data.error ? data.error : 'Failed to change')
        }
      })
      .catch((err) => {
        message.error('Failed to change.')
        console.log(err)
      })
  }
  

  useEffect(() => {
    // dispatch({ type: GET_USER_PROFILE_ASYNC });
    // window.scrollTo(0, 0);
    userService.getUserProfile().then((data) => {
      // console.log("data", data);
      if (data.success) {
        setProfile(data.producer ? data.producer : data.viewer)
        setuser(data.user)
      }
    })
    return () => {}
  }, [])


  const back = () =>{
    history.push("/laughter")
  }

  return (
    <div className="">
      <SideNav></SideNav>

      {profile ? (
        <>
          {/* <button type="button" className="my-4 mx-4  mt-20 flex justify-start" onClick={back}>
            <BsFillArrowLeftCircleFill className="w-6 h-6 text-purple-800" />
          </button> */}
          {' '}
          <div className="mx-auto sm:w-10/12 mt-16 flex flex-col md:flex-row justify-center items-baseline">
            <div className="w-1/3 hidden md:inline-block ">
              <Avatar
                className="shadow-xl "
                size={80}
                icon={<UserOutlined />}
              />
              <div className="m-4">
                <span className="text-2xl py-4 font-medium leading-tight">
                  {user?.firstName + ' ' + user?.lastName}{' '}
                </span>
                <p className="font-light text-blue-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex px-6 flex-col  md:w-1/2">
              <div className="bg-white p-8 border rounded-xl">
                <div className="">
                  <p className="text-xl font-semibold flex pb-4">
                    Basic Information
                  </p>
                </div>
                {user && (
                  <Form
                    layout="vertical"
                    name="normal_login"
                    className="flex flex-col items-baseline "
                    form={form}
                    initialValues={{
                      ...user
                    }}
                    onFinish={saveBasic}
                  >
                    <div className="flex flex-col md:flex-row w-full ">
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        className="text-lg text-gray-600 w-full"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your firstName!'
                          }
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="firstName*"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        className="text-lg md:ml-2 w-full"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your lastName!'
                          }
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="lastName*"
                        />
                      </Form.Item>
                    </div>

                    {/* <Form.Item
                      label="Phone Number"
                      name="phoneNumber"
                      className="text-lg flex   text-gray-600"
                      help="Phone number should be valid format +1xxx.."
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Phone Number!'
                        }
                      ]}
                    >
                      <Input
                        className="rounded-xl text-gray-700 text-md p-2"
                        placeholder="phoneNumber*"
                        addonBefore="+1"
                      />
                    </Form.Item> */}

                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your phone number!'
                        },
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

                    <Form.Item className="flex">
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        className="login-form-button mt-4 "
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </div>
          </div>
          <div className="flex mx-auto sm:w-10/12 flex-col mt-8 md:flex-row justify-center items-baseline">
            {userRole !== 'VIEWER' && (
              <>
                <div className="w-1/3 hidden md:inline-block">
                  <FaBuilding className="flex text-4xl mx-auto" />
                  <div className="m-4">
                    {profile.companyName ? (
                      <>
                        <span className="text-2xl py-4 font-medium leading-tight">
                          {profile?.companyName}
                        </span>
                      </>
                    ) : (
                      <p>No company Name</p>
                    )}
                    {profile.city ? (
                      <p className="font-light text-blue-500 flex items-center justify-center">
                        <ImLocation2 /> {profile?.state + ' ,'}
                        {profile?.city}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <div className="px-6 w-full md:w-1/2">
                  <div className="bg-white p-8 my-4 border rounded-xl">
                    <div className="text-xl font-semibold flex pb-6">
                      <p>Company Information</p>
                    </div>

                    {profile && (
                      <Form
                        layout="vertical"
                        name="normal_login"
                        className="flex flex-col items-baseline"
                        form={form2}
                        initialValues={{
                          ...profile,
                          companyName: profile?.companyName
                        }}
                        onFinish={saveCompany}
                      >
                        <Form.Item
                          label="Company Name"
                          name="companyName"
                          className="text-lg text-gray-600 w-full mb-2"
                          help="Legal name of your company. if you don't have company write your full name."
                          rules={[
                            {
                              required: true,
                              message: 'Please input your company Name!'
                            }
                          ]}
                        >
                          <Input
                            className="rounded-xl text-gray-700 text-md p-2"
                            placeholder="Company*"
                          />
                        </Form.Item>
                        <div className="flex flex-col md:flex-row w-full ">
                          <Form.Item
                            label="Company Address"
                            name="companyAddress"
                            className="text-lg w-full text-gray-600"
                            help="Company detail address description."
                            rules={[{ message: 'Please input your address!' }]}
                          >
                            <Input
                              className="rounded-xl text-gray-700 text-md p-2"
                              placeholder="Company Address"
                            />
                          </Form.Item>
                          {/* <Form.Item
                            label="Company Contact Number"
                            name="phoneNumber"
                            className="text-lg w-full md:ml-2  text-gray-600"
                            rules={[
                              {
                                pattern: /(\(\d{3}\))(\s)\d{3}(-)\d{4}/,
                                required: true,
                                message: 'Please input your Phone Number!'
                              }
                            ]}
                          >
                            <Input
                              prefix="+1"
                              className="rounded-xl  text-gray-700 text-md p-2"
                              placeholder="Phone Number*"
                            />
                          </Form.Item> */}

                          <Form.Item
                            label="Company Contact Number"
                            name="companyPhoneNumber"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your phone number!'
                              },
                              {
                                pattern: /^(\(\d{3}\))(\s)\d{3}(-)\d{4}$/g,
                                message:
                                  'Invalid phone number format. The valid format is (000) 000-0000'
                              }
                            ]}
                          >
                            <Input
                              onChange={(e) => {
                                companyPhoneNumberChange(e.target.value)
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
                        </div>

                        <div className="flex flex-col md:flex-row w-full">
                          <Form.Item
                            label="State"
                            name="state"
                            className="text-lg w-full mr-2  text-gray-600"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Phone Number!'
                              }
                            ]}
                          >
                            <Input
                              className="rounded-xl text-gray-700 text-md p-2"
                              placeholder="state*"
                            />
                          </Form.Item>
                          <Form.Item
                            label="city"
                            name="city"
                            className="text-lg  w-full text-gray-600"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your City!'
                              }
                            ]}
                          >
                            <Input
                              className="rounded-xl text-gray-700 text-md p-2"
                              placeholder="city*"
                            />
                          </Form.Item>
                          <Form.Item
                            label="zipcode"
                            name="zipCode"
                            className="text-lg md:ml-2 w-full  text-gray-600"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your zipcode!'
                              }
                            ]}
                          >
                            <Input
                              className="rounded-xl text-gray-700 text-md p-2"
                              placeholder="zipcode*"
                            />
                          </Form.Item>
                        </div>
                        <Form.Item className="">
                          <Button
                            type="primary"
                            htmlType="submit"
                            shape="round"
                            className="login-form-button  "
                          >
                            Save Changes
                          </Button>
                        </Form.Item>
                      </Form>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="flex mx-auto sm:w-10/12 flex-col mt-3 md:flex-row justify-center items-baseline">
            <div className="w-1/3 hidden md:inline-block">
              <FaKey className="flex text-4xl  mx-auto" />
              <div className="m-4">
                <span className="text-2xl py-4 font-medium leading-tight">
                  Account Security
                </span>
                <p className="text-gray-500">
                  Make your password strong and secured.
                </p>
              </div>
            </div>
            <div className="px-6 w-full md:w-1/2 mb-8">
              <div className="bg-white p-8 md:my-4 border rounded-xl">
                <div className="text-xl font-semibold flex pb-6">
                  <p>Password Change</p>
                </div>

                <Form
                  layout="vertical"
                  name="normal_login"
                  className="flex flex-col items-start "
                  onFinish={updatePassword}
                >
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    className="text-lg text-gray-600 w-full mb-2"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Old Password!'
                      }
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl text-gray-700 text-md p-2"
                      placeholder="Old Password*"
                    />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    className="text-lg flex w-full text-gray-600"
                    rules={[
                      { required: true, message: 'Please input your address!' }
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl text-gray-700 text-md p-2"
                      placeholder="New Password*"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confrimPassword"
                    className="text-lg w-full md:ml-2  text-gray-600"
                    help="It's recommended to use strong password. that you're not using elsewhere"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Confirm Password!'
                      }
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl  text-gray-700 text-md p-2"
                      placeholder="Re-type password*"
                    />
                  </Form.Item>

                  <Form.Item className="">
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      className="mt-4 "
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spin
          size="large"
          className="flex items-center justify-center h-screen text-4xl"
        />
      )}
    </div>
  )
}
const mapStateToProps = (props) => {
  return {
    ...props.account
  }
}
const actionCreators = {
  logout: userActions.logout
}
export default connect(mapStateToProps, actionCreators)(Profile)
