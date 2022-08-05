import { Avatar, Dropdown, Menu, message, Tooltip, Input } from 'antd';
import React from 'react';
import {
    FaUser,
    FaUsers,
    FaVideo
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { ImVideoCamera } from 'react-icons/im'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'

import { Link,  useLocation } from 'react-router-dom';


import logo from '../../assets/images/logo1.png'


const Home = (props) => {

    const location = useLocation()


    const logout = () => {
        message.success("You're logged out!")
    }

    const accountMenu = (
        <div className="bg-white shadow-lg rounded-lg">
            <div className="flex flex-col py-4 px-8 items-center ">
                <Avatar
                    className="flex items-center justify-center bg-gray-200"
                    size={40}
                    icon={<FaUser className="text-blue-500" />}
                />
                <span className="font-semibold pt-2 text-lg">{'Talguu Admin'}</span>
                <span className="text-gray-600 text-sm ">{'admin@talguu.com'}</span>
            </div>
            <Menu className="text-md">
                <Menu.Item
                    key="account"
                    className="hover:bg-gray-300">
                    <Link to="/account">Account</Link>
                </Menu.Item>
                <Menu.Item
                    key="logout"
                    className="hover:bg-gray-300">
                    <Link to="" onClick={(e) => logout()}>
                        Sign Out
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )



    return (
        <div className="w-screen h-screen flex">
            {/* sidebar begins */}
            <div className="w-16 h-screen bg-white">
                <ul className="w-full h-full list-disc space-y-5 p-1 border-r hidden sm:block pt-5">
                    <li
                        className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${location.pathname === '/admin-dashboard' ? 'bg-gray-300' : ''
                            }`}
                    >
                        <Link to="/admin-dashboard">
                            <Tooltip
                                className="list-tooltip"
                                placement="rightTop"
                                title="Dashboard"
                            >
                                <MdDashboard
                                    className={'text-3xl inline text-blue-400 hover:text-white'}
                                />
                            </Tooltip>
                        </Link>
                    </li>
                    <li
                        className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${location.pathname === '/admin-user-videos' ? 'bg-gray-300' : ''
                            }`}
                    >
                        <Link to="/admin-user-videos">
                            <Tooltip
                                className="list-tooltip"
                                placement="rightTop"
                                title="Videos"
                            >
                                <FaVideo
                                    className={'text-3xl inline text-blue-400 hover:text-white'}
                                />
                            </Tooltip>
                        </Link>
                    </li>
                    <li
                        className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${location.pathname === '/admin-users' ? 'bg-gray-300' : ''
                            }`}
                    >
                        <Link to="/admin-users">
                            <Tooltip
                                className="list-tooltip"
                                placement="rightTop"
                                title="Users"
                            >
                                <FaUsers
                                    className={'text-3xl inline text-blue-400 hover:text-white'}
                                />
                            </Tooltip>
                        </Link>
                    </li>
                    <li
                        className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${location.pathname === '/admin-intro-videos' ? 'bg-gray-300' : ''
                            }`}
                    >
                        <Link to="/admin-intro-videos">
                            <Tooltip
                                className="list-tooltip"
                                placement="rightTop"
                                title="Intro Videos"
                            >
                                <ImVideoCamera
                                    className={'text-3xl inline text-blue-400 hover:text-white'}
                                />
                            </Tooltip>
                        </Link>
                    </li>
                    <li
                        className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${location.pathname === '/admin-laughters' ? 'bg-gray-300' : ''
                            }`}
                    >
                        <Link to="/admin-laughters">
                            <Tooltip
                                className="list-tooltip"
                                placement="rightTop"
                                title="Laughter"
                            >
                                <BsFillEmojiLaughingFill
                                    className={'text-3xl inline text-blue-400 hover:text-white'}
                                />
                            </Tooltip>
                        </Link>
                    </li>
                </ul>
            </div>
           <div className="w-full h-full flex flex-col">
                {/* header begins */}
                <div className="z-30 w-full bg-white h-12 sticky top-0">
                    <div className="block sm:flex justify-between items-center">
                        <div className="hidden sm:flex text-xl items-center justify-center header_title text-gray-500">
                            <Link to="/" className="flex items-center">
                                <img src={logo} alt="" className="rounded w-24 pt-2" />
                            </Link>
                        </div>

                        <span className="text-gray-500 hidden sm:flex ml-6 cursor-pointer text-lg items-center hover:text-gray-700 md:ml-20">
                            <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                                <FaUser className={'text-xl inline text-blue-500 mr-3'} />
                            </Dropdown>
                        </span>

                    </div>

                </div>


                <div className="bg-gray-200 w-full h-screen">
                    {
                        props.children
                    }
                </div>
           </div>
        </div>
    )
}





export default Home;