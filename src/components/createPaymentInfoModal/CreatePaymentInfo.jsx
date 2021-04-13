import './CreatePaymentInfo.css'

import { Button, DatePicker, Form, Input, notification, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

import mastercard from '../../assets/images/mastercard.png'
import visa from '../../assets/images/visa.png'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_PAYMENT_INFO_ASYNC, RESET_PAYMENT_INFO } from '../../redux/types'
import { FaCheck, FaUser } from 'react-icons/fa'
import { userService } from '../../_services/user.service'
import { useHistory } from 'react-router'

const CreatePaymentInfo = (props) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [viewerErrMessages, setViewerErrMessages] = useState('')
  const [loading, setLoading] = useState(false)
  const [formValues] = useState({
    cardType: 'MASTER_CARD',
    username: userService.getLocalUser().username,
    state: 'NY',
    address: 'Address'
  })
  const paymentInfo = useSelector((state) => state.payment.paymentInfo)
  const addPaymentInfoStatus = useSelector(
    (state) => state.payment.addPaymentInfoStatus
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (addPaymentInfoStatus === 'SUCCESS') {
      setLoading(false)
      form.resetFields()
      notification.open({
        message: 'Payment Information Created!!',
        icon: <FaCheck className="text-sm text-green-600" />
      })
      dispatch({ type: RESET_PAYMENT_INFO })
      history.push('/settings')
    } else if (addPaymentInfoStatus === 'ERROR') {
      setViewerErrMessages('Can not create payment information.')
      setLoading(false)
    }
    return () => {}
  }, [paymentInfo])
  const [paymentMethod, setPaymentMethod] = useState('MASTER_CARD')
  const username = userService.getLocalUser().username

  const paymentMethodChange = (value) => {
    setPaymentMethod(value.target.value)
  }

  const onPaymentFinish = (values) => {
    setViewerErrMessages('')
    const pattern =
      values.cardType === 'MASTER_CARD'
        ? /^5[1-5][0-9]{14}$/
        : /^4[0-9]{12}(?:[0-9]{3})?$/
    const valid = pattern.test(values.cardNumber)
    if (!valid) {
      setViewerErrMessages('Please Enter Valid Information')
      return
    }
    setLoading(true)
    dispatch({
      type: ADD_PAYMENT_INFO_ASYNC,
      payload: {
        ...values,
        securityCode: 1234,
        username,
        state: 'NY',
        address: 'Address'
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center flex-col items-center ">
        {/* <img className="" src={logo} alt="Logo" width={100} /> */}
        <p className="text-2xl text-gray-700 my-6">Payment Information</p>
      </div>
      <div className="w-full text-red-500 text-md text-center mb-4">
        {viewerErrMessages}
      </div>
      <div className="w-full flex flex-col justify-center sm:p-4 py-8  ">
        <Form
          form={form}
          layout="vertical"
          name="personal"
          onFinish={onPaymentFinish}
          initialValues={formValues}
        >
          <div className="flex flex-col sm:flex-row w-full items-center justify-between">
            <Form.Item
              name="firstName"
              label="First Name"
              className="w-full p-1"
              rules={[
                { required: true, message: 'Please input card first name' }
              ]}
            >
              <Input
                className="rounded-2xl "
                prefix={<FaUser className="site-form-item-icon" />}
                type="text"
                placeholder="First Name"
              />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              className="w-full sm:p-3"
              rules={[
                { required: true, message: 'Please input card last name' }
              ]}
            >
              <Input
                className="rounded-2xl "
                prefix={<FaUser className="site-form-item-icon" />}
                type="text"
                placeholder="Last Name"
              />
            </Form.Item>
          </div>
          <div className="flex items-center justify-between">
            <Form.Item
              name="zipCode"
              label="Zip Code"
              className="w-full p-1"
              rules={[{ required: true, message: 'Please input zip code' }]}
            >
              <Input
                className="rounded-2xl "
                type="text"
                placeholder="Zip Code"
              />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              className="w-full sm:p-3"
              rules={[{ required: true, message: 'Please input city' }]}
            >
              <Input className="rounded-2xl " type="text" placeholder="City" />
            </Form.Item>
          </div>
          <Form.Item name="cardType" label="Select Card Type">
            <Radio.Group
              name="cardType"
              onChange={paymentMethodChange}
              value={paymentMethod}
              className="w-full flex my-2"
            >
              <Radio
                className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
                value="MASTER_CARD"
              >
                <img src={mastercard} alt="" className="h-10 ml-1" />
                <span className="ml-1">Mastercard</span>
              </Radio>

              <Radio
                className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
                value="VISA"
              >
                <img src={visa} alt="" className="h-10 ml-1" />{' '}
                <span className="ml-1">Visa</span>
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              {
                pattern:
                  paymentMethod === 'MASTER_CARD'
                    ? /^5[1-5][0-9]{14}$/
                    : /^4[0-9]{12}(?:[0-9]{3})?$/,
                required: true,
                message: 'Please input valid card number'
              }
            ]}
          >
            <Input
              className="rounded-2xl"
              type="text"
              placeholder="Card Number"
            />
          </Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item
              className="w-1/2 pr-2"
              name="expDate"
              label="Expires on"
              rules={[
                { required: true, message: 'Please input expiration date' }
              ]}
            >
              <DatePicker
                className="rounded-2xl w-full"
                picker="month"
                placeholder="Select expiration date"
                format="MM / YY"
              />
            </Form.Item>
            <Form.Item
              className="w-1/2 pl-2"
              name="cvc"
              label="CVC"
              rules={[
                {
                  required: true,
                  pattern: /[0-9]{3}/,
                  message: 'Please input 3 digit number'
                }
              ]}
            >
              <Input className="rounded-2xl" type="number" placeholder="CVC" />
            </Form.Item>
          </div>
          <div>
            <p className="text-gray-700 text-xs text-center w-full mb-2">
              Notice: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ipsam illo quas, facilis
            </p>
          </div>
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
      </div>
    </div>
  )
}

CreatePaymentInfo.propTypes = {}

export default CreatePaymentInfo
