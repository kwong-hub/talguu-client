import { Divider } from 'antd'
import React from 'react'
import { IoSendSharp } from 'react-icons/io5'

import { AiOutlineClose} from 'react-icons/ai'

const ChatPanel = ({
    incomingChats,
    chatMessage,
    handleMessageChange,
    canSendMessage,
    handleSendMessage,
    typing,
    viewerPanel,
    openChatPanel,
    toggleChatPanel,
}) => {

    return (

        <div className={viewerPanel ? "w-72 z-30 h-screen viewer-chat-content" : "w-72 z-30 chat-content"}>
            <div className="w-full flex flex-col items-start relative bg-gray-700 message-container">
              
                {openChatPanel && (
                    <div className="w-72 h-16 absolute top-0 right-0">
                        <div
                            className="flex items-center justify-between chat-panel-btn bg-gray-800 hover:bg-gray-700"
                            onClick={() => toggleChatPanel()}
                        >
                            <button className="text-gray-200">Close chat</button>
                            <span className="mx-3 text-gray-200">
                                <AiOutlineClose />
                            </span>
                        </div>
                    </div>
                )}
              
              <div className="flex flex-col items-start h-full w-full overflow-y-auto pb-20 mt-10">

                  {incomingChats.length > 0 ? (
                      incomingChats.map((chat, index) => {
                          return (
                              <div
                                  className="flex flex-col mt-3 px-2 items-start justify-start"
                                  key={index}
                              >
                                  <div className="chat-message flex items-start">
                                      <p className="chat-user">{chat.user.name}</p>
                                      <Divider style={{
                                          color:"#ffffff", 
                                          background:"#3a3838",
                                          marginTop:"9px",
                                          marginBottom:"9px",
                                          padding:"0px",
                                          height:"1px"
                                      }} />
                                      <p className="c-message">{chat.value}</p>
                                      <p className="chat-time">{new Date(chat.time).toLocaleTimeString()}</p>
                                  </div>
                              </div>
                          )
                      })
                  ) : (
                      <p className="mt-10 pl-16 text-gray-100">No chats available</p>
                  )}
              </div>
             {
                 canSendMessage && (
                        <div className="h-16 absolute bottom-0 left-0 bg-gray-100 chat-container z-50">
                            <div className="chat-container-inner flex items-center justify-center mb-2">
                                <textarea
                                    type="text"
                                    name="chatMessage"
                                    value={chatMessage}
                                    placeholder="your message.."
                                    className="w-5/6 pl-2 mr-2 text-gray-800"
                                    onChange={handleMessageChange}
                                />

                                {typing && (
                                    <IoSendSharp
                                        className="w-6 h-6 ml-3 send-message-btn cursor-pointer"
                                        onClick={handleSendMessage}
                                    />
                                )}
                            </div>
                        </div>
                 )
             }
          </div>
      </div>
  )
}

export default ChatPanel