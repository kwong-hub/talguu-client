import { Input, Form } from 'antd'
import React from 'react'

const SenderInfo = ({
    receiverEmail,
    specialMessage,
    setReceiverEmail,
    setSpecialMessage
}) => {


    const {TextArea} = Input

    const USD_PER_PERSON = 0.20


  return (
      <div className=''>
          <div className='flex flex-col w-full'>
              <p className='text-sm font-bold'>Send this video to my friend (s)</p>
              <h1 className='text-xl font-bold text-purple-700'>US ${USD_PER_PERSON}/person</h1>

              <div className='flex flex-col my-3'>
                  <div className='w-full'>
                      <div className='flex my-3'>
                          <p className='text-sm text-red-600 mx-2'>*</p>
                          <p className='text-sm text-gray-600'>Receiver Email (Phone number)</p>
                      </div>
                      <Form.Item
                          rules={[
                              {
                                  type: 'email',
                                  message: 'The input is not valid E-mail!',
                              },
                              {
                                  required: true,
                                  message: 'Please input your E-mail!',
                              },
                          ]}
                      >
                          <Input
                              className='w-full p-3'
                              value={receiverEmail}
                              type="email"
                              onChange={(e) => setReceiverEmail(e.target.value)}
                              placeholder="email@receiver.com"
                          />
                      </Form.Item>
                  </div>

                  <div className='w-full'>
                      <div className='flex my-3'>
                          <p className='text-sm text-red-600 mx-2'>*</p>
                          <p className='text-sm text-gray-600'>Your Message</p>
                      </div>
                      <TextArea
                          className='w-full p-5 box-border'
                          value={specialMessage}
                          onChange={(e) => setSpecialMessage(e.target.value)}
                          rows={4}
                          placeholder="your message..."
                      />
                  </div>
              </div>
          </div>
      </div>
  )
}

export default SenderInfo
