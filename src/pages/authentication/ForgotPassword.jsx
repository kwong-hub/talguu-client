import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import { Header } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const onFinish = (values) => {};
  return (
    <div className="relative">
      <Header />
      <div>
        <p className="text-center bg-gray-200 text-red-800 mb-4 ">{error}</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
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
              className="login-form-button w-full bg-green-600 border-green-600"
            >
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
