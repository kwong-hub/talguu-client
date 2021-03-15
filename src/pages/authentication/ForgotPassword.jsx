import { Button, Input, Form, message } from "antd";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Header from "../../partials/header/Header";
import logo from "../../assets/images/streaming.png";
import { userService } from "../../_services/user.service";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const onFinish = (values) => {
    console.log("values", values);
    userService
      .forgotPassword(values)
      .then((data) => {
        if (data.success) {
          setSuccess(true);
        } else {
          message.error("Unable to send-email.");
        }
      })
      .catch((err) => message.err("Failed to send.Try again later."));
  };

  return (
    <div className="relative">
      <Header />

      <div className="flex flex-col items-center justify-center h-screen">
        <img className="" src={logo} alt="Logo" width={50} />
        <p className="text-gray-800 text-xl py-4">Forgot Password</p>

        {success ? (
          <div>
            <p>Reset Link set to you email. Check your email address.</p>
          </div>
        ) : (
          <div className="bg-white p-4 shadow-sm border rounded-xl max-w-md">
            <p className="">
              Enter your verifed email address and we will send you a password
              reset link.
            </p>
            <p className="text-center bg-gray-200 text-red-800 mb-4 ">
              {error}
            </p>
            <Form
              name="normal_login"
              className="login-form md:px-4"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  className="rounded-2xl"
                  prefix={<FaUser className="site-form-item-icon" />}
                  placeholder="E-mail Address"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-full"
                >
                  Send Email
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
