
import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

export const PasscodeModal = ({ showModal }) => {
//   const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)
  const [modalText, setModalText] = React.useState('Content of the modal')

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)
    setTimeout(() => {
    //   setVisible(false)
      showModal = false
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    // setVisible(false)
    showModal = false
  }

  return (
        <>
            <Modal
                title="Title"
                visible={showModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
  )
}

PasscodeModal.propTypes = {
  showModal: PropTypes.boolean
}
