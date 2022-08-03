import { Tooltip } from 'antd';
import React from 'react';
import {
    FaUsers,
    FaVideo
} from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';

const Home = (props) => {

    const location = useLocation()

    return (
        <div className = "w-full">
            <div className = "z-40 fixed left-0 w-16 h-screen bg-gray-200">
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
                </ul>
            </div>

            <div className = "z-30w-full bg-blue-300 h-14 sticky top-0">

            </div>
            <div className = "bg-red-500 w-full h-screen ml-16 ">
                {
                    props.children
                }
            </div>
        </div>
    )
}





export default Home;