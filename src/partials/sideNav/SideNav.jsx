import React from "react";
import { FaVideo, FaSave, FaCloudUploadAlt, FaStream, FaCog, FaUser } from "react-icons/fa";
import { Tooltip } from "antd";
import "./SideNav.css";

class SideNav extends React.Component {
  render() {
    return (
      <div className="container w-14 min-h-full fixed left-0 top-0 bottom-0 border-r p-1 bg-white">
        <ul className="list-disc space-y-5">
          <li className="cursor-pointer">
            <img src="logo512.png" alt="" className="rounded" />
          </li>
          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip className="list-tooltip" placement="rightTop" title="Watch Video">
              <FaVideo className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>
          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip placement="rightTop" title="Saved Playlist">
              <FaSave className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>
          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip placement="rightTop" title="Upload Video">
              <FaCloudUploadAlt className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>
          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip placement="rightTop" title="Stream Video">
              <FaStream className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>

          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip placement="rightTop" title="Settings">
              <FaCog className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>
          <li className="cursor-pointer flex items-center justify-center min-w-full rounded-xl h-10 hover:bg-gray-400">
            <Tooltip placement="rightTop" title="Watch Video">
              <FaUser className="text-3xl inline text-gray-300 hover:text-white" />
            </Tooltip>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNav;
