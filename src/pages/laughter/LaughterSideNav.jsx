import '../../partials/sideNav/SideNav.css'

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

import Avatar from 'antd/lib/avatar/avatar'
import { RiLiveFill, RiLiveLine } from 'react-icons/ri'

import { BsFillEmojiLaughingFill } from 'react-icons/bs'

const LaughterSideNav = () => {

  const user = JSON.parse(localStorage.getItem('user'))
  const location = useLocation()

  const handleMenuClick = () => {}




  const menuTextStyle =
    'text-left text-xs h-full inline-block text-gray-300 hover:text-gray-900'
  const menuIconStyle = 'text-2xl inline text-gray-300'

  const mobileMenu = (
    <Menu
      onClick={handleMenuClick}
      className="fixed z-20 bottom-0 bg-black flex sm:hidden w-screen overflow-hidden p-2 mt-10"
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
          <Link to="/laughter-home">
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
              <Link to="/laughter">
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
        </>
      ) : (
        ''
      )}
    </Menu>
  )
  return (
    <div className="container bottom-0 bg-transparent  sm:bg-black">
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
        {/* laughter begins */}

        {!user && (
          <li
            className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
              location.pathname === '/laughter-home' ? 'bg-gray-400' : ''
            }`}
          >
            <Link to="/laughter-home">
              <Tooltip
                className="list-tooltip"
                placement="rightTop"
                title="Laughter"
              >
                <BsFillEmojiLaughingFill
                  className={'text-3xl inline text-gray-300 hover:text-white'}
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
                    location.pathname === '/laughter' ? 'bg-gray-400' : ''
                  }`}
                >
                  <Link to="/laughter">
                    <Tooltip placement="rightTop" title="Laughter">
                      <BsFillEmojiLaughingFill
                        className={
                          'text-3xl inline text-gray-300 hover:text-white'
                        }
                      />
                    </Tooltip>
                  </Link>
                </li>
                {/* authenticated laughter ends */}
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === '/live_video' ? 'bg-gray-400' : ''
                  }`}
                >
                  <Link to="/live_video">
                    <Tooltip placement="rightTop" title="Live Broadcast">
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
            {user.role === 'PRODUCER' ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === '/webcam' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/webcam">
                  <Tooltip placement="rightTop" title="Go Live">
                    <RiLiveFill
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
                  location.pathname === '/conference' ? 'bg-gray-400' : ''
                }`}
              >
                <Link to="/conference">
                  <Tooltip placement="rightTop" title="Conference">
                    <RiLiveLine
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
      
    </div>
  )
}

export default LaughterSideNav
