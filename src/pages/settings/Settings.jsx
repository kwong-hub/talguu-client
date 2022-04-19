import './Settings.css'

import { Button } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { userService } from '../../_services/user.service'
import ShowBalance from '../../components/balanceModal/ShowBalance'
import PaymentInfos from '../../components/paymentInfos/PaymentInfos'
import SideNav from '../../partials/sideNav/SideNav'

const Settings = (props) => {
  const history = useHistory()
  const [showPaymentInfos, setShowPaymentInfos] = useState(false)
  const [showBalance, setshowBalance] = useState(false)

  const username = userService.getLocalUser().username

  const changePaymentInfosVisible = (value) => {
    setShowPaymentInfos(value)
  }
  const changeBalanceInfosVisible = (value) => {
    setshowBalance(value)
  }
  const depositAccount = () => {
    history.push('/deposit')
  }

  const addPaymentInfo = () => {
    history.push('/payment_info')
  }

  return (
    <div className="bg-gray-50 ml-0  sm:ml-14">
      <SideNav></SideNav>
      <div className="flex-col mt-12 py-4 sm:mt-20">
        <div className="flex flex-col sm:flex-row p-4 rounded-sm items-start  sm:items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">
              Billing and Payment
            </h1>
            {/* <h4 className="text-gray-700 text-md text-left font-light">
              Choose how you make payment
            </h4> */}
          </div>
          <div className="mt-2 sm:mt-0 text-left">
            <Button
              onClick={() => changePaymentInfosVisible(true)}
              className="m-2"
            >
              View
            </Button>
            <Button onClick={() => addPaymentInfo()} type="secondary">
              Add Payment Method
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row p-4 rounded-sm items-start  sm:items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">
              Deposit and Payment
            </h1>
            <h4 className="text-gray-700 text-md text-left font-light">
              Deposit to your account
            </h4>
          </div>
          <div className="mt-2 sm:mt-0 text-left">
            <Button
              onClick={() => changeBalanceInfosVisible(true)}
              className="m-2"
            >
              Balance
            </Button>
            <Button onClick={() => depositAccount(true)} type="secondary">
              Deposit
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row p-4 rounded-sm items-start  sm:items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">
              Account Management
            </h1>
            <h4 className="text-gray-700 text-md text-left font-light">
              Account Setting
            </h4>
          </div>
          <div className="mt-2 sm:mt-0 text-left">
            <Link
              to="/account"
              type="secondary"
              className="btn bg-white p-2 border mx-2 sm:mx-0"
            >
              Edit Account
            </Link>
          </div>
        </div>
      </div>
      {showBalance && (
        <ShowBalance
          modalVisible={showBalance}
          changePaymentModalVisible={changeBalanceInfosVisible}
        />
      )}
      {showPaymentInfos && (
        <PaymentInfos
          username={username}
          changePaymentModalVisible={changePaymentInfosVisible}
          modalVisible={showPaymentInfos}
        />
      )}
    </div>
  )
}

Settings.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      paymentModalVisible: PropTypes.any
    })
  })
}

export default Settings
