import { Button, Form, Input } from "antd";
import React, { Component } from "react";
import { FaEnvelope, FaFacebook, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../../assets/images/logo.svg";

export class Signup extends Component {
  state = {};

  onFinish = (values) => {
    // console.log("Received values of form: ", values);
    // userService
    //   .login(values)
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="flex justify-center items-center h-full">
          <div className="w-full max-w-xs flex flex-col justify-center m-4 p-4 py-8 shadow-md rounded-2xl bg-white">
            <div className="flex justify-center flex-col items-center ">
              <img className="" src={logo} alt="Logo" width={50} />

              <p className="text-2xl text-gray-700 my-6">Create a New Account</p>
              <div className="flex bg-gray-100 rounded-3xl mb-8">
                <Link to="/login">
                  <Button
                    shape="round"
                    className="flex items-center text-white m-1 px-4 bg-green-600">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    shape="round"
                    className="flex items-center border-transparent bg-transparent m-1 px-4">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}>
                <Form.Item
                  name="fullName"
                  rules={[{ required: true, message: "Please input your Full Name!" }]}>
                  <Input
                    className="rounded-2xl"
                    prefix={<FaUser className="site-form-item-icon" />}
                    placeholder="Full Name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}>
                  <Input
                    className="rounded-2xl"
                    prefix={<FaEnvelope className="site-form-item-icon" />}
                    placeholder="E-mail Address"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Please input your Password!" }]}>
                  <Input
                    className="rounded-2xl "
                    prefix={<FaLock className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confrim_password"
                  rules={[{ required: true, message: "Please Confirm your Password!" }]}>
                  <Input
                    className="rounded-2xl "
                    prefix={<FaLock className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className="login-form-button w-full bg-green-600 border-green-600">
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>

              <div>
                <p className="my-6">OR USING</p>
                <div className="flex justify-evenly">
                  <Button shape="round" icon={<FaGoogle />} className="flex items-center p-2">
                    Google
                  </Button>
                  <Button
                    className="flex items-center p-2"
                    type="primary"
                    shape="round"
                    icon={<FaFacebook />}>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
