import './PaymentInfos.css'

import { Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GET_USER_PAYMENT_INFOS_ASYNC } from '../../redux/types'

// import { prototype } from "react-copy-to-clipboard";
function PaymentInfos(props) {
  const paymentInfos = useSelector((state) => state.payment.paymentInfos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: GET_USER_PAYMENT_INFOS_ASYNC, payload: props.username })
    return () => {}
  }, [])

  const renderPaymentInfos = (paymentInfos) => {
    return paymentInfos.map((paymentInfo) => {
      return (
        <div
          key={paymentInfo.id}
          className='text-white flex-col justify-center items-center py-6 px-3 rounded-lg m-1 payment_info mb-6'>
          <div className='self-center flex justify-center'>
            <span>Card Number: **********{paymentInfo.cardNumber.slice(10)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center m-2 py-2 border-gray-400'>
              <span className='py-1 px-3 mr-2 border-gray-800 border bg-white text-gray-800 text-xs rounded-lg'>
                Owner
              </span>
              <span className='mr-2'>{paymentInfo.firstName + ' ' + paymentInfo.lastName}</span>
            </div>
            <div className='flex-col'>
              <div className=''>{paymentInfo.cardType}</div>
              <div>Created: {moment(paymentInfo.createAt).format('YYYY-M-D')}</div>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <Modal
      className='py-10 px-5 opacity-95'
      centered
      closable={false}
      mask={false}
      footer={null}
      visible={props.modalVisible}
      onOk={() => props.changePaymentModalVisible(false)}
      onCancel={() => props.changePaymentModalVisible(false)}>
      {paymentInfos?.length ? renderPaymentInfos(paymentInfos) : ''}
      {!paymentInfos?.length ? (
        <div className={'flex-col items-center justify-center w-full p-2 cursor-pointer'}>
          <p className='text-gray-600 text-md py-4 w-full text-center'>
            You don&apos;t have payment information. Add one to deposit and access videos.
          </p>
          <div className='w-full flex justify-center'>
            <Button onClick={() => props.changePaymentModalVisible(false)} type='primary'>
              Close
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </Modal>
  )
}

PaymentInfos.propTypes = {
  username: PropTypes.string,
  changePaymentModalVisible: PropTypes.func,
  modalVisible: PropTypes.bool
}

export default PaymentInfos
