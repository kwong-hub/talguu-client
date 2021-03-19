import { Spin } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useState, useEffect } from 'react'

import paymentService from '../../_services/payment.service'

const ShowBalance = (props) => {
  const [balance, setbalance] = useState()
  useEffect(() => {
    getBalance()
    return () => {}
  }, [])

  const getBalance = () => {
    paymentService
      .getBalance()
      .then((data) => {
        if (data.success) {
          if (!isNaN(data.balance)) {
            setbalance(data.balance)
          } else {
            setbalance(0)
          }
        }
      })
      .catch((err) => console.log('err', err))
  }

  return (
    <div>
      <Modal
        className="w-1/2 opacity-95"
        centered
        closable={true}
        mask={false}
        // footer={null}
        visible={props.modalVisible}
        onOk={() => props.changePaymentModalVisible(false)}
        onCancel={() => props.changePaymentModalVisible(false)}
        okText="Ok">
        <div className="flex flex-col justify-center items-center py-4 ">
          <h2>Balance</h2>
          <p className="text-2xl font-bold ">{(Math.round(balance * 100) / 100).toFixed(2)}$</p>
        </div>
      </Modal>
    </div>
  )
}

export default ShowBalance
