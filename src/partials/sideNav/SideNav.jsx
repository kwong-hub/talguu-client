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
// import { userService } from '../../_services/user.service'
import { useDispatch } from 'react-redux'
import { LOGOUT_ASYNC } from '../../redux/types'

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
    <div className=" bg-white shadow-lg rounded-lg">
      <div className="flex flex-col py-4 px-8 items-center ">
        <Avatar
          className="flex items-center justify-center"
          size={40}
          icon={<FaUser />}
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
    'text-left text-xs h-full inline-block text-gray-500 hover:text-gray-900'
  const menuIconStyle = 'text-2xl inline text-gray-500'

  const mobileMenu = (
    <Menu
      onClick={handleMenuClick}
      className="fixed z-20 bottom-0 flex sm:hidden w-screen overflow-hidden p-2"
    >
      <Menu.Item key="1">
        <Link to="/">
          <div className="flex flex-col items-center justify-center">
            <FaVideo className={menuIconStyle} />
            <span className={menuTextStyle}>Videos</span>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="2">
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
            <Menu.Item key="6">
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
            <Menu.Item key="6">
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

  const suffix = <FaSearch className="text-xl text-gray-300" />
  return (
    <div className="container bottom-0 bg-transparent  sm:bg-white">
      <div className="fixed z-10 right-0 left-0 sm:left-14 top-0 bg-white shadow-sm">
        <div className="flex justify-between sm:hidden pt-2">
          <div className="text-2xl mr-4 flex items-center justify-center header_title text-gray-500">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt=""
                className="rounded pl-2 sm:pl-0 w-24 sm:w-32"
              />
            </Link>
          </div>
          <div className="flex">
            <FaSearch
              onClick={() => toggleSearch()}
              className="p-2 text-4xl text-gray-300"
            />
            <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
              <FaUser className="p-2 text-4xl text-gray-300" />
            </Dropdown>
          </div>
          {/* <span
            className={
              'mt-2 text-gray-500 flex-col mr-4 cursor-pointer text-lg items-center hover:text-gray-700'
            }
          >
            <Dropdown
              trigger="click"
              overlay={mobileMenu}
              onVisibleChange={handleVisibleChange}
              visible={mobileMenuVisible}
              overlayClassName="w-screen h-48"
            >
              <div
                onClick={(event) => event.preventDefault()}
                className={`menu_icon ${mobileMenuVisible ? 'active' : ''}`}
              ></div>
            </Dropdown>
          </span> */}
        </div>
        <div className="block sm:flex p-1 justify-between items-center">
          <div className="hidden sm:flex text-2xl mr-4 items-center justify-center header_title text-gray-500">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="" className="rounded w-32" />
            </Link>
          </div>
          <div className="hidden sm:block bg-white sm:static w-full lg:w-1/2">
            <Search
              placeholder="Search videos here..."
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={onSearch}
            />
          </div>
          {user ? (
            <span className="text-gray-500 hidden sm:flex ml-6 cursor-pointer text-lg items-center hover:text-gray-700 md:ml-20">
              {/* <Link to="/account"> */}
              <Dropdown overlay={accountMenu} placement="bottomRight" arrow>
                <FaUser className={'text-3xl inline text-gray-300'} />
              </Dropdown>
              {/* <Tooltip placement="rightTop" title="Account"></Tooltip> */}
              {/* </Link> */}
            </span>
          ) : (
            <div className="w-64"></div>
          )}
        </div>
      </div>
      <ul className="w-14 min-h-full fixed left-0 top-0 list-disc space-y-5 p-1 border-r hidden sm:block  mt-2">
        <li
          className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
            location.pathname === '/' ? 'bg-gray-400' : ''
          }`}
        >
          <Link to="/">
            <Tooltip
              className="list-tooltip"
              placement="rightTop"
              title="All Videos"
            >
              <FaVideo
                className={'text-3xl inline text-gray-300 hover:text-white'}
              />
            </Tooltip>
          </Link>
        </li>
        {user ? (
          <>
            {user.role === 'VIEWER' ? (
              <>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/live_video' ? 'bg-gray-400' : ''
                  }`}
                >
                  <Link to="/live_video">
                    <Tooltip placement="rightTop" title="Live Videos">
                      <FaLifeRing
                        className={
                          'text-3xl inline text-gray-300 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/saved_later' ? 'bg-gray-400' : ''
                  }`}
                >
                  <Link to="/saved_later">
                    <Tooltip placement="rightTop" title="Saved Videos">
                      <FaSave
                        className={
                          'text-3xl inline text-gray-300 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/purchased_playlist'
                      ? 'bg-gray-400'
                      : ''
                  }`}
                >
                  <Link to="/purchased_playlist">
                    <Tooltip placement="rightTop" title="Purchased Videos">
                      <FaFilm
                        className={
                          'text-3xl inline text-gray-300 hover:text-white'
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
                  location.pathname === '/your_video' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/your_video">
                  <Tooltip placement="rightTop" title="List Video">
                    <BiVideoRecording
                      className={
                        'text-3xl inline text-gray-300 hover:text-white'
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
                  location.pathname === '/upload_video' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/upload_video">
                  <Tooltip placement="rightTop" title="Upload Video">
                    <FaCloudUploadAlt
                      className={
                        'text-3xl inline text-gray-300 hover:text-white'
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
                  location.pathname === '/live_stream' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/live_stream">
                  <Tooltip placement="rightTop" title="Stream Video">
                    <FaStream
                      className={
                        'text-3xl inline text-gray-300 hover:text-white'
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
                  location.pathname === '/settings' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/settings">
                  <Tooltip placement="rightTop" title="Settings">
                    <FaCog
                      className={
                        'text-3xl inline text-gray-300 hover:text-white'
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
              location.pathname === '/login' ? 'bg-gray-400' : ''
            }`}
          >
            <Link to="/login">
              <Tooltip placement="rightTop" title="Login">
                <FaSignInAlt
                  className={'text-3xl inline text-gray-300 hover:text-white'}
                />
              </Tooltip>
            </Link>
          </li>
        )}
      </ul>
      {mobileMenu}
      {searchVisible && (
        <div className="fixed z-20 p-2 top-12 left-0 right-0 bg-white sm:static w-full lg:w-1/2 pb-4">
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
