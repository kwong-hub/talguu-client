import React, { Component } from "react";
import { Form, Input, Button, Steps } from "antd";
import {
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaUser,
  FaUserCircle,
  FaMapMarkerAlt,
  FaCheckSquare,
  FaBuilding,
} from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import { Link, withRouter } from "react-router-dom";
import "./SignupPrd.css";
import { connect } from "react-redux";
import { CREATE_USER_ASYNC } from "../../redux/types";
import Header from "../../partials/header/Header";

const { Step } = Steps;

export class SignupPrd extends Component {
  state = {
    formValues: { phoneNumber: "123412341234" },
    currentForm: 0,
    loading: false,
    errMessages: "",
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.createUserStatus != this.props.createUserStatus ||
      prevProps.errMessages != this.props.errMessages
    ) {
      if (this.props.createUserStatus == "SUCCESSFUL") {
        this.setState({ currentForm: 2, formValues: {}, loading: false });
      } else if (this.props.createUserStatus == "FAILED") {
        this.setState({ loading: false, errMessages: this.props.errMessages });
      }
    }
  }

  onPersonalFinish = (values) => {
    this.setState({
      currentForm: 1,
      formValues: { ...this.state.formValues, ...values },
      errMessages: "",
    });
  };

  onAddressFinish = (values) => {
    this.setState({
      formValues: { ...this.state.formValues, ...values },
      loading: true,
      errMessages: "",
    });
    this.props.dispatch({ type: CREATE_USER_ASYNC, payload: this.state.formValues });
  };

  renderPersonal = () => {
    return (
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onPersonalFinish}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first Name!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon" />}
            placeholder="First Name*"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last Name!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaUser className="site-form-item-icon" />}
            placeholder="Last Name*"
          />
        </Form.Item>
        <Form.Item name="companyName">
          <Input
            className="rounded-2xl"
            prefix={<FaBuilding className="site-form-item-icon" />}
            placeholder="Company Name"
          />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
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
          name="confirm_password"
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
            className="login-form-button w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
    );
  };

  goBack = () => {
    this.setState({ currentForm: 0 });
  };

  renderAddress = () => {
    return (
      <Form
        layout="vertical"
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={this.onAddressFinish}>
        <Form.Item
          name="zipCode"
          rules={[{ required: true, message: "Please input your zip code!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaMapMarkerAlt className="site-form-item-icon" />}
            placeholder="Zip Code"
          />
        </Form.Item>
        <Form.Item name="city" rules={[{ required: true, message: "Please input your city!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaMapMarkerAlt className="site-form-item-icon" />}
            placeholder="City"
          />
        </Form.Item>
        <Form.Item name="state" rules={[{ required: true, message: "Please input your state!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaMapMarkerAlt className="site-form-item-icon" />}
            placeholder="State"
          />
        </Form.Item>
        <Form.Item
          name="Address"
          rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input
            className="rounded-2xl "
            prefix={<FaMapMarkerAlt className="site-form-item-icon" />}
            type="text"
            placeholder="Address"
          />
        </Form.Item>

        <Form.Item className="flex justify-around">
          <Button
            onClick={this.goBack}
            type="secondary"
            shape="round"
            className="login-form-button w-5/12">
            Back
          </Button>
          <Button
            loading={this.state.loading}
            type="primary"
            htmlType="submit"
            shape="round"
            className="login-form-button w-5/12">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  renderVerifyEmail = () => {
    return (
      <h2 className="w-80 text-md text-gray-600 text-center mx-auto">
        We have sent an email to your account. Please verify your email to login.
        <div className="w-full">
          <Link to="/login">
            <Button type="primary" shape="round" className="flex items-center m-1 px-4 mx-auto">
              Login
            </Button>
          </Link>
        </div>
      </h2>
    );
  };

  render() {
    return (
      <div>
        <Header />
        <div className="flex m-auto items-center w-auto p-8 pt-2 mt-14">
          <div className="self-start p-4 shadow-md">
            <Steps
              current={this.state.currentForm}
              direction="vertical"
              className="bg-white h-80 p-8">
              <Step
                icon={<FaUserCircle />}
                title="Personal/Corporate"
                description="Fill your personal/corporate information"
              />
              <Step icon={<FaMapMarkerAlt />} title="Address" description="Fill your address" />
              <Step icon={<FaCheckSquare />} title="Verify" description="Verify your email" />
            </Steps>
          </div>
          <div className="flex justify-center items-center h-full w-8/12 max-w-xl">
            {this.state.currentForm != 2 ? (
              <div className="w-full flex flex-col justify-center m-4 p-4 py-8 shadow-md rounded-2xl bg-white">
                <div className="flex justify-center flex-col items-center ">
                  <img className="" src={logo} alt="Logo" width={50} />

                  <p className="text-2xl text-gray-700 my-6">Create a New Account</p>
                  <div className="flex bg-gray-100 rounded-3xl mb-8">
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
                <div className="w-full text-red-500 text-md text-center mb-4">
                  {this.state.errMessages}
                </div>
                <div>
                  {this.state.currentForm == 0
                    ? this.renderPersonal()
                    : this.state.currentForm == 1
                    ? this.renderAddress()
                    : ""}
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
            ) : (
              this.renderVerifyEmail()
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (props) => {
  console.log(props.account);
  return {
    ...props.account,
  };
};

export default withRouter(connect(mapStateToProps, null)(SignupPrd));
