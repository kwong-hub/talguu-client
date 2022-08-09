
import React from 'react'
import { Input } from 'antd'

const SettingModal = ({
       specialMessage,
       setSpecialMessage,
       textColor,
       setTextColor,
       textSize,
       setTextSize,
       handleSettingModal
}) => {




  const {TextArea} = Input

  return (
    <div className="z-50 fixed inset-0">
        <div className="fixed inset-0 bg-white overflow-hidden w-full h-96 md:h-screen rounded-b-2xl shadow-2xl"></div>
          <div div className = "w-full h-96 md:h-full bg-transparent absolute overflow-hidden top-0 right-0 z-50">
                
          <div className='w-full md:w-96 md:mx-auto p-2'>
              <div className='flex flex-col my-3 w-full'>
                  <div className='w-full'>
                      <div className='flex my-3 mx-5'>
                          <p className='text-sm text-red-600 mx-2'>*</p>
                          <p className='text-sm text-gray-600 font-bold '>Your Message</p>
                      </div>
                      <TextArea
                         maxLength={70}
                          className='w-80 p-3 box-border mx-5 rounded-xl'
                          value={specialMessage}
                          onChange={(e) => setSpecialMessage(e.target.value)}
                          rows={4}
                          placeholder="your message..."
                      />
                  </div>
                  <div className='w-full flex flex-col'>
                        <div className='w-full flex my-3'>
                        <div className='flex mx-5'>
                            <p className='text-sm text-red-600 mx-2'>*</p>
                            <p className='text-sm text-gray-600 font-bold '>Pick text color</p>
                        </div>
                      <input
                         className='w-16 h-8 p-1 mx-5 rounded-xl outline-none'
                         type='color'
                         value={textColor}
                         onChange={(e) => setTextColor(e.target.value)}
                         
                      />
                    </div>

                     <div className='w-full flex my-3'>
                        <div className='flex mx-5'>
                            <p className='text-sm text-red-600 mx-2'>*</p>
                            <p className='text-sm text-gray-600 font-bold '>Text size</p>
                        </div>
                      <input
                         className='w-16 h-8 p-1 mx-5 rounded-xl box-border border-2'
                         type='text'
                         value={textSize}
                         onChange={(e) => setTextSize(e.target.value)}
                      />
                    <p className='text-md mt-1 font-bold'>px</p>
                    </div>

                  </div>
            </div>
       
                <div className='w-full h-14 absolute bottom-10 flex items-center justify-center md:bottom-72 md:right-12'>
                    <button
                        onClick={handleSettingModal}
                        className="px-3 py-1 rounded-xl outline-none border-none bg-red-400 text-white mx-3">
                        Cancel
                    </button>
                    <button
                        onClick={handleSettingModal}
                        className="px-3 py-1 rounded-xl outline-none border-none bg-blue-500 text-white mx-3">
                        Done
                    </button>
            </div>

         </div>
    </div>
  </div>
  )
}

export default SettingModal