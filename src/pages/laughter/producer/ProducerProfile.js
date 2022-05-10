import React,{useState} from 'react'

import { Avatar, Button, Input, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BiUserCircle } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { MdWorkOutline } from 'react-icons/md'
import { RiChatFollowUpFill } from 'react-icons/ri'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';

export const ProducerProfile = () => {

    const history = useHistory()
    const [followText, setFollowText] = useState('')

    const { TextArea } = Input

    const followProducer = () => {
        setFollowText('Following')
    }

    const back = () => {
        history.push("/producer")
    }


    return (
        <div className="flex flex-col">

            <button
                type='button'
                className='my-4 mx-4'
                onClick={back}
            >

                <BsFillArrowLeftCircleFill className='w-6 h-6 text-purple-800' />
            </button>


            <div className='flex items-center justify-between px-2 py-3'>
                <div className='flex items-center'>

                    <Avatar size={44} icon={<UserOutlined />} />

                    <div className='flex flex-col items-center px-3'>
                        <h3 className='text-xl text-gray-600'>
                            Samson John
                        </h3>
                        <p className='text-sm text-gray-700'>
                            samsonJohn@gmail.com
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => followProducer()}
                    type="primary"
                    style={{ background: "#fc1c03", borderColor: "#fc1c03", fontWeight: "bold" }}
                    className='text-xl px-3 py-1 text-white'>
                    {
                        followText ? followText : 'Follow'
                    }
                </button>
            </div>

            <div className='my-10 px-5 shadow-md'>
                <div className='flex flex-col'>
                    <p>Intro</p>
                    <Form>
                        <Form.Item
                            name="email"
                            className='w-full self-center ant-item'
                            rules={[
                                {
                                    required: true,
                                    message: 'Input your email',
                                },
                            ]}
                        >
                            <TextArea
                                rows={3}
                                disabled
                                placeholder=' I am a camera man, producer and video creator. 
              I have much additional experiences on programming'
                            />

                        </Form.Item>

                    </Form>


                    <div className='flex items-center p-2'>
                        <BiUserCircle className='w-9 h-9 text-black mr-5' />
                        <p className='self-center mt-3'>
                            Samson John
                        </p>
                    </div>
                    <div className='flex items-center p-2'>
                        <HiOutlineLocationMarker className='w-9 h-9 text-black mr-5' />
                        <p className='self-center mt-3'>
                            Addis Ababa, Ethiopia
                        </p>
                    </div>
                    <div className='flex items-center p-2'>
                        <MdWorkOutline className='w-9 h-9 text-black mr-5' />
                        <p className='self-center mt-3'>
                            Camera man, video creator and producer
                        </p>
                    </div>
                    <div className='flex items-center p-2'>
                        <RiChatFollowUpFill className='w-9 h-9 text-black mr-5' />
                        <p className='self-center mt-3'>
                            Followed by <span className='text-purple-400 text-bold text-xl'>1,1290</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProducerProfile