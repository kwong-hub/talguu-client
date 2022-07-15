import './SideNav.css'

import { Dropdown, Input, Menu, Tooltip } from 'antd'
import React, { useState } from 'react'
import { BiVideoRecording } from 'react-icons/bi'
import {
  FaCloudUploadAlt,
  FaCog,
  FaFilm,
  FaLifeRing,
  FaSave,
  FaSearch,
  FaSignInAlt,
  FaStream,
  FaUser,
  FaVideo
} from 'react-icons/fa'
import { Link, useHistory, useLocation } from 'react-router-dom'

import logo from '../../assets/images/logo1.png'
import Avatar from 'antd/lib/avatar/avatar'
import { useDispatch } from 'react-redux'
import { LOGOUT_ASYNC } from '../../redux/types'
import { RiLiveFill, RiLiveLine } from 'react-icons/ri'

import { BsFillEmojiLaughingFill } from 'react-icons/bs'

const { Search } = Input

const SideNav = (props) => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('user'))
  const [searchVisible, setSearchVisible] = useState(false)

  const handleMenuClick = () => {}

  const onSearch = (values) => {
    history.push({
      pathname: '/search',
      search: '?query=' + values,
      state: { q: values }
    })
  }
  const logout = () => {
    dispatch({ type: LOGOUT_ASYNC })
  }
  const accountMenu = (
    <div className="bg-white shadow-lg rounded-lg">
      <div className="flex flex-col py-4 px-8 items-center ">
        <Avatar
          className="flex items-center justify-center bg-gray-200"
          size={40}
          icon={<FaUser className="text-blue-500" />}
        />
        <span className="font-semibold pt-2 text-lg">{user?.name}</span>
        <span className="text-gray-600 text-sm ">{user?.email}</span>
      </div>
      <Menu className="text-md">
        <Menu.Item className="hover:bg-gray-300">
          <Link to="/account">Account</Link>
        </Menu.Item>
        <Menu.Item className="hover:bg-gray-300">
          <Link to="" onClick={(e) => logout()}>
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )

  const menuTextStyle =
    'text-left text-xs h-full inline-block text-gray-800 hover:text-blue-500 mt-0.5'
  const menuIconStyle = 'text-2xl inline text-blue-500'

  const mobileMenu = (
    <Menu
      onClick={handleMenuClick}
      className="fixed z-20 bottom-0 flex sm:hidden w-screen overflow-hidden p-2 mt-1 bg-gray-100 bg-opacity-100 backdrop-blur-xl"
    >
      {/* mobile laughter ends */}
      <Menu.Item key="2">
        <Link to="/">
          <div className="flex flex-col items-center justify-center">
            <FaVideo className={menuIconStyle} />
            <span className={menuTextStyle}>Videos</span>
          </div>
        </Link>
      </Menu.Item>

      {/* mobile laughter begins */}
      {!user && (
        <Menu.Item key="1">
          <Link
            to={{
              pathname: '/laughter-home',
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <BsFillEmojiLaughingFill className={menuIconStyle} />
              <span className={menuTextStyle}>Laughter</span>
            </div>
          </Link>
        </Menu.Item>
      )}

      <Menu.Item key="22">
        <Link to="/live_video">
          <div className="flex flex-col items-center justify-center">
            <FaLifeRing className={menuIconStyle} />
            <span className={menuTextStyle}>Live</span>
          </div>
        </Link>
      </Menu.Item>
      {user ? (
        <>
          {user.role === 'VIEWER' ? (
            <Menu.Item key="1">
              <Link
                to={{
                  pathname: '/laughter',
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <BsFillEmojiLaughingFill className={menuIconStyle} />
                  <span className={menuTextStyle}>Laughter</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'VIEWER' ? (
            <Menu.Item key="3">
              <Link to="/saved_later">
                <div className="flex flex-col items-center justify-center">
                  <FaSave className={menuIconStyle} />
                  <span className={menuTextStyle}>Saved</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'VIEWER' ? (
            <Menu.Item key="4">
              <Link to="/purchased_playlist">
                <div className="flex flex-col items-center justify-center">
                  <FaFilm className={menuIconStyle} />
                  <span className={menuTextStyle}>Purchased</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'VIEWER' && (
            <Menu.Item key="5">
              <Link to="/settings">
                <div className="flex flex-col items-center justify-center">
                  <FaCog className={menuIconStyle} />
                  <span className={menuTextStyle}>Setting</span>
                </div>
              </Link>
            </Menu.Item>
          )}
          {user.role === 'PRODUCER' ? (
            <Menu.Item key="6">
              <Link to="/your_video">
                <div className="flex flex-col items-center justify-center">
                  <BiVideoRecording className={menuIconStyle} />
                  <span className={menuTextStyle}>Your Videos</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'PRODUCER' ? (
            <Menu.Item key="16">
              <Link to="/upload_video">
                <div className="flex flex-col items-center justify-center">
                  <FaCloudUploadAlt className={menuIconStyle} />
                  <span className={menuTextStyle}>Upload Video</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'PRODUCER' ? (
            <Menu.Item key="26">
              <Link to="/live_stream">
                <div className="flex flex-col items-center justify-center">
                  <FaStream className={menuIconStyle} />
                  <span className={menuTextStyle}>Stream Video</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}
          {user.role === 'PRODUCER' ? (
            <Menu.Item key="36">
              <Link to="/live_stream">
                <div className="flex flex-col items-center justify-center">
                  <FaStream className={menuIconStyle} />
                  <span className={menuTextStyle}>Stream Video</span>
                </div>
              </Link>
            </Menu.Item>
          ) : (
            ''
          )}

          {/* <Menu.Item key="7">
            <Link to="/account">
              <div className="flex flex-col items-center justify-center">
                <FaUser className={menuIconStyle} />
                <span className={menuTextStyle}>Account</span>
              </div>
            </Link>
          </Menu.Item> */}
        </>
      ) : (
        ''
      )}
    </Menu>
  )

  const toggleSearch = () => {
    setSearchVisible(!searchVisible)
  }

  const suffix = <FaSearch className="text-xl text-blue-400" />
  return (
    <div className="bottom-0 bg-gray-300">
      <div className="px-5 md:p-1 fixed z-20 bg-white right-0 left-0 sm:left-14 top-0  bg-opacity-100 backdrop-blur-3xl">
        <div className="flex justify-between sm:hidden -mx-5 pt-3 pb-3 ">
          <div className="text-xl  mr-4 flex items-center justify-center header_title text-gray-500">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt=""
                className="rounded pl-2 sm:pl-0 w-24 sm:w-64 ml-3"
              />
            </Link>
          </div>
          <div className="flex mr-2">
            <FaSearch
              onClick={() => toggleSearch()}
              className="p-2 text-4xl text-blue-500"
            />
            <Dropdown
              overlay={accountMenu}
              placement="bottomRight"
              trigger={['click']}
              arrow
            >
              <span
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <FaUser className="p-2 text-4xl text-blue-500 mr-4" />
              </span>
            </Dropdown>
          </div>
        </div>
        <div className="block sm:flex  justify-between items-center">
          <div className="hidden sm:flex text-xl mr-4 items-center justify-center header_title text-gray-500">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="" className="rounded w-28" />
            </Link>
          </div>
          <div className="hidden sm:block bg-transparent sm:static w-full lg:w-1/3 font-bold">
            <Search
              placeholder="Search videos here..."
              enterButton="Search"
              size="medium"
              suffix={suffix}
              onSearch={onSearch}
            />
          </div>
          {user ? (
            <span className="text-gray-500 hidden sm:flex ml-6 cursor-pointer text-lg items-center hover:text-gray-700 md:ml-20">
              {/* <Link to="/account"> */}
              <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                <FaUser className={'text-xl inline text-blue-500 mr-3'} />
              </Dropdown>
              {/* <Tooltip placement="rightTop" title="Account"></Tooltip> */}
              {/* </Link> */}
            </span>
          ) : (
            <div className="w-64"></div>
          )}
        </div>
      </div>
      <ul className="bg-white w-14 min-h-full fixed left-0 top-0 list-disc space-y-5 p-1 border-r hidden sm:block pt-5">
        <li
          className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
            location.pathname === '/' ? 'bg-gray-300' : ''
          }`}
        >
          <Link to="/">
            <Tooltip
              className="list-tooltip"
              placement="rightTop"
              title="All Videos"
            >
              <FaVideo
                className={'text-3xl inline text-blue-400 hover:text-white'}
              />
            </Tooltip>
          </Link>
        </li>
        {/* laughter begins */}

        {!user && (
          <li
            className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
              location.pathname === '/laughter-home' ? 'bg-gray-300' : ''
            }`}
          >
            <Link
              to={{
                pathname: '/laughter-home',
                
              }}
            >
              <Tooltip
                className="list-tooltip"
                placement="rightTop"
                title="Laughter"
              >
                <BsFillEmojiLaughingFill
                  className={'text-3xl inline text-blue-400 hover:text-white transform hover:text-xl'}
                />
              </Tooltip>
            </Link>
          </li>
        )}
        {/* laughter ends */}

        {user ? (
          <>
            {user.role === 'VIEWER' ? (
              <>
                {/* authenticated laughter begins  */}
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/laughter' ? 'bg-gray-300' : ''
                  }`}
                >
                  <Link
                    to={{
                      pathname: '/laughter',
                    
                    }}
                  >
                    <Tooltip placement="rightTop" title="Laughter">
                      <BsFillEmojiLaughingFill
                        className={
                          'text-3xl inline text-blue-400 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                {/* authenticated laughter ends */}
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/live_video' ? 'bg-gray-300' : ''
                  }`}
                >
                  <Link to="/live_video">
                    <Tooltip placement="rightTop" title="Live Broadcast">
                      <FaLifeRing
                        className={
                          'text-3xl inline text-blue-400 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/saved_later' ? 'bg-gray-300' : ''
                  }`}
                >
                  <Link to="/saved_later">
                    <Tooltip placement="rightTop" title="Saved Videos">
                      <FaSave
                        className={
                          'text-3xl inline text-blue-400 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/purchased_playlist'
                      ? 'bg-gray-300'
                      : ''
                  }`}
                >
                  <Link to="/purchased_playlist">
                    <Tooltip placement="rightTop" title="Purchased Videos">
                      <FaFilm
                        className={
                          'text-3xl inline text-blue-400 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
              </>
            ) : (
              ''
            )}
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/your_video' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/your_video">
                  <Tooltip placement="rightTop" title="List Video">
                    <BiVideoRecording
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ''
            )}
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/upload_video' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/upload_video">
                  <Tooltip placement="rightTop" title="Upload Video">
                    <FaCloudUploadAlt
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ''
            )}
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/live_stream' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/live_stream">
                  <Tooltip placement="rightTop" title="Stream Video">
                    <FaStream
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ''
            )}
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/webcam' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/webcam">
                  <Tooltip placement="rightTop" title="Go Live">
                    <RiLiveFill
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ''
            )}
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/conference' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/conference">
                  <Tooltip placement="rightTop" title="Conference">
                    <RiLiveLine
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ''
            )}
            {user.role === 'VIEWER' && (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/settings' ? 'bg-gray-300' : ''
                }`}
              >
                <Link to="/settings">
                  <Tooltip placement="rightTop" title="Settings">
                    <FaCog
                      className={
                        'text-3xl inline text-blue-400 hover:text-white'
                      }
                    />
                  </Tooltip>
                </Link>
              </li>
            )}
          </>
        ) : (
          <li
            className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
              location.pathname === '/login' ? 'bg-gray-300' : ''
            }`}
          >
            <Link to="/login">
              <Tooltip placement="rightTop" title="Login">
                <FaSignInAlt
                  className={'text-3xl inline text-blue-400 hover:text-white'}
                />
              </Tooltip>
            </Link>
          </li>
        )}
      </ul>

      {mobileMenu}

      {searchVisible && (
        <div className="fixed z-20 p-2 top-12 left-0 right-0 bg-transparent sm:static w-full lg:w-1/2 pb-4">
          <Search
            placeholder="Search videos here..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
        </div>
      )}
    </div>
  )
}

export default SideNav
