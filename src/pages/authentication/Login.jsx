import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FaFacebook, FaGoogle, FaLock, FaUser } from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../_actions";
import { userService } from "../../_services/user.service";
import Header from "../../partials/header/Header";

const Login = (props) => {
  var history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (values.email && values.password) {
      // this.props.dispatch({ type: "LOGIN_ASYNC", values });
    }
    userService
      .login(values)
      .then((resp) => {
        console.log(resp, "respons");
        if (resp.success) {
          props.dispatch({ type: "LOGIN_ASYNC", payload: resp });
          history.push("/");
        } else {
          props.dispatch({ type: "LOGIN_FAIL" });
        }
      })
      .catch((err) => {
        props.dispatch({ type: "LOGIN_FAIL" });
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-full pt-2 mt-14">
        <div className="w-full max-w-xs flex flex-col justify-center m-4 p-4 py-8 shadow-md rounded-2xl bg-white">
          <div className="flex justify-center flex-col items-center ">
            <img className="" src={logo} alt="Logo" width={50} />
            <p className="text-sm text-purple-600 my-4">Welcome back to Talguu </p>

            <p className="text-2xl text-gray-700 mb-4">Login into you Account!</p>
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
              onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}>
                <Input
                  className="rounded-2xl"
                  prefix={<FaUser className="site-form-item-icon" />}
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
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-full bg-green-600 border-green-600">
                  Log in
                </Button>
              </Form.Item>
            </Form>

            <div>
              <p className="my-4">OR USING</p>
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
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const connectedLoginPage = connect(mapState, null)(Login);
export { connectedLoginPage as Login };
// export  Login;
