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
} from "react-icons/fa";
import { Tooltip } from "antd";
import "./SideNav.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/logo512.png";

const SideNav = () => {
  let location = useLocation();
  let user = localStorage.getItem("user");
  return (
    <div className="container w-14 min-h-full fixed left-0 top-0 bottom-0 border-r p-1 bg-white">
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
                location.pathname === "/saved_playlist" ? "bg-gray-400" : ""
              }`}>
              <Link to="/saved_playlist">
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
            <li
              className={`cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400 ${
                location.pathname === "/upload_video" ? "bg-gray-400" : ""
              }`}>
              <Link to="/upload_video">
                <Tooltip placement="rightTop" title="Upload Video">
                  <FaCloudUploadAlt className={`text-3xl inline text-gray-300 hover:text-white`} />
                </Tooltip>
              </Link>
            </li>
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
          ""
        )}
      </ul>
    </div>
  );
};

export default SideNav;
