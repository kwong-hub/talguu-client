import React, { Component } from "react";
import "./Header.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return (
      <div className="w-full fixed top-0 left-0 right-0 h-14 shadow-sm bg-white z-10 flex justify-between items-center">
        <div className="text-2xl flex items-center justify-center header_title text-gray-500">
          <Link to="/" className="flex items-center">
            <img src="logo512.png" alt="" className="rounded h-14" /> TALGUU
          </Link>
        </div>
        <div className="flex max-h-10 bg-gray-100 rounded-3xl cursor-pointer">
          <Link to="/login">
            <Button
              shape="round"
              className="flex items-center border-transparent bg-transparent m-1 px-4">
              Login
            </Button>
          </Link>
          <Link to="/signupprd">
            <Button shape="round" className="flex items-center   m-1 px-4">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
