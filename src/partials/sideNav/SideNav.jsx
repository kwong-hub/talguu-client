import React from "react";
import {
  FaVideo,
  FaSave,
  FaCloudUploadAlt,
  FaStream,
  FaCog,
  FaUser,
  FaFilm,
  FaBinoculars,
  FaSignInAlt,
  FaLifeRing,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { Tooltip, Input } from "antd";
import "./SideNav.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo512.png";

const { Search } = Input;

const SideNav = (props) => {
  let location = useLocation();
  let user = JSON.parse(localStorage.getItem("user"));

  const suffix = <FaSearch className="text-xl text-gray-300" />;
  return (
    <div className="container z-50 w-14 min-h-full fixed left-0 top-0 bottom-0 border-r p-1 bg-white">
      <div className="absolute w-screen right-0 left-14 top-0 bg-white shadow-sm">
        {/* <div className="h-10 w-auto flex justify-end mr-4"></div> */}
        <div className="flex w-full justify-between items-center p-4">
          <div className="flex max-w-2xl w-full">
            <div className="text-2xl mr-4 flex items-center justify-center header_title text-gray-500">
              <Link to="/" className="flex items-center">
                TALGUU
              </Link>
            </div>
            <Search
              placeholder="Search videos here..."
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={props.onSearch}
            />
          </div>
          <span className="text-gray-500 flex mr-20 cursor-pointer text-lg items-center hover:text-gray-700">
            <Link to="/account">
              <Tooltip placement="rightTop" title="Account">
                <FaUser className={`text-3xl inline text-gray-300`} />
              </Tooltip>
            </Link>
          </span>
        </div>
      </div>
      <ul className="list-disc space-y-5">
        <li className="cursor-pointer">
          <img src={logo} alt="" className="rounded" />
        </li>
        <li
          className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
            location.pathname === "/" ? "bg-gray-400" : ""
          }`}>
          <Link to="/">
            <Tooltip className="list-tooltip" placement="rightTop" title="Videos">
              <FaVideo className={`text-3xl inline text-gray-300 hover:text-white`} />
            </Tooltip>
          </Link>
        </li>
        {/* <li
          className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
            location.pathname === "/watch" ? "bg-gray-400" : ""
          }`}>
          <Link to="/watch">
            <Tooltip className="list-tooltip" placement="rightTop" title="Watch">
              <FaBinoculars className={`text-3xl inline text-gray-300 hover:text-white`} />
            </Tooltip>
          </Link>
        </li> */}
        {user ? (
          <>
            <li
              className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                location.pathname === "/live_video" ? "bg-gray-400" : ""
              }`}>
              <Link to="/live_video">
                <Tooltip placement="rightTop" title="Live Videos">
                  <FaLifeRing className={`text-3xl inline text-gray-300 hover:text-white`} />
                </Tooltip>
              </Link>
            </li>
            {user.role == "VIEWER" ? (
              <>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === "/saved_later" ? "bg-gray-400" : ""
                  }`}>
                  <Link to="/saved_later">
                    <Tooltip placement="rightTop" title="Saved Videos">
                      <FaSave className={`text-3xl inline text-gray-300 hover:text-white`} />
                    </Tooltip>
                  </Link>
                </li>
                <li
                  className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                    location.pathname === "/purchased_playlist" ? "bg-gray-400" : ""
                  }`}>
                  <Link to="/purchased_playlist">
                    <Tooltip placement="rightTop" title="Purchased Videos">
                      <FaFilm className={`text-3xl inline text-gray-300 hover:text-white`} />
                    </Tooltip>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
            {user.role == "PRODUCER" ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === "/your_video" ? "bg-gray-400" : ""
                }`}>
                <Link to="/your_video">
                  <Tooltip placement="rightTop" title="Upload Video">
                    <FaVideo
                      className={`text-3xl inline text-gray-300 hover:text-white`}
                    />
                  </Tooltip>
                </Link>
              </li>
              
            ) : (
              ""
            )}
             {user.role == "PRODUCER" ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === "/upload_video" ? "bg-gray-400" : ""
                }`}>
                <Link to="/upload_video">
                  <Tooltip placement="rightTop" title="Upload Video">
                    <FaCloudUploadAlt
                      className={`text-3xl inline text-gray-300 hover:text-white`}
                    />
                  </Tooltip>
                </Link>
              </li>
              
            ) : (
              ""
            )}
            {user.role == "PRODUCER" ? (
              <li
                className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                  location.pathname === "/stream_video" ? "bg-gray-400" : ""
                }`}>
                <Link to="/stream_video">
                  <Tooltip placement="rightTop" title="Stream Video">
                    <FaStream className={`text-3xl inline text-gray-300 hover:text-white`} />
                  </Tooltip>
                </Link>
              </li>
            ) : (
              ""
            )}
            <li
              className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                location.pathname === "/settings" ? "bg-gray-400" : ""
              }`}>
              <Link to="/settings">
                <Tooltip placement="rightTop" title="Settings">
                  <FaCog className={`text-3xl inline text-gray-300 hover:text-white`} />
                </Tooltip>
              </Link>
            </li>
            <li
              className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                location.pathname === "/account" ? "bg-gray-400" : ""
              }`}>
              <Link to="/account">
                <Tooltip placement="rightTop" title="Account">
                  <FaUser className={`text-3xl inline text-gray-300 hover:text-white`} />
                </Tooltip>
              </Link>
            </li>
          </>
        ) : (
          <li
            className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
              location.pathname === "/login" ? "bg-gray-400" : ""
            }`}>
            <Link to="/login">
              <Tooltip placement="rightTop" title="Login">
                <FaSignInAlt className={`text-3xl inline text-gray-300 hover:text-white`} />
              </Tooltip>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
