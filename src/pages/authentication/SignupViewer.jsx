import React, { useEffect, useState } from "react";
import { Form, Input, Button, Steps, DatePicker } from "antd";
import {
  FaEnvelope,
  FaFacebook,
  FaGoogle,
  FaLock,
  FaUser,
  FaUserCircle,
  FaMapMarkerAlt,
  // FaCheckSquare,
  // FaBuilding,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import "./SignupViewer.css";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_VIEWER_ASYNC } from "../../redux/types";
import Header from "../../partials/header/Header";

const { Step } = Steps;

const SignupViewer = () => {
  const [formValues, setFormValues] = useState(() => {
    return { phoneNumber: "12341234234" };
  });
  const [currentForm, setCurrentForm] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewerErrMessages, setErrMessage] = useState("");

  const dispatch = useDispatch();
  const serverErrors = useSelector((state) => state.account.viewerErrMessages);
  const createViewerStatus = useSelector((state) => state.account.createViewerStatus);

  useEffect(() => {
    setErrMessage(serverErrors);
    setLoading(false);
  }, [serverErrors]);

  useEffect(() => {
    if (createViewerStatus == "SUCCESSFUL") {
      setCurrentForm(2);
      setLoading(false);
      setErrMessage("");
      setFormValues(() => {
        return { phoneNumber: "12341234234" };
      });
    }
  }, [createViewerStatus]);

  const onPersonalFinish = (values) => {
    setCurrentForm(1);
    setFormValues((prevValue) => {
      return { ...prevValue, ...values };
    });
    setErrMessage("");
  };

  const onAddressFinish = (values) => {
    setLoading(true);
    setFormValues((prevValue) => {
      return { ...prevValue, ...values };
    });
    setErrMessage("");
    dispatch({ type: CREATE_VIEWER_ASYNC, payload: { ...formValues, ...values } });
  };

  const onPaymentFinish = (values) => {
    console.log(values);
  };

  const renderPersonal = () => {
    return (
      <Form
        layout="vertical"
        name="personal"
        initialValues={{ remember: true }}
        onFinish={onPersonalFinish}>
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
        {/* <Form.Item name="companyName">
          <Input
            className="rounded-2xl"
            prefix={<FaBuilding className="site-form-item-icon" />}
            placeholder="Company Name"
          />
        </Form.Item> */}
        <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input
            className="rounded-2xl"
            prefix={<FaEnvelope className="site-form-item-icon" />}
            placeholder="E-mail Address*"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input
            className="rounded-2xl "
            prefix={<FaLock className="site-form-item-icon" />}
            type="password"
            placeholder="Password*"
          />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          rules={[{ required: true, message: "Please Confirm your Password!" }]}>
          <Input
            className="rounded-2xl "
            prefix={<FaLock className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password*"
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

  const goBack = () => {
    // setState({ currentForm: 0 });
    setCurrentForm(0);
  };

  const renderAddress = () => {
    return (
      <Form
        layout="vertical"
        name="address"
        initialValues={{ remember: true }}
        onFinish={onAddressFinish}>
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
            onClick={goBack}
            type="secondary"
            shape="round"
            className="login-form-button w-5/12">
            Back
          </Button>
          <Button
            loading={loading}
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

  const onYearChange = (event) => {
    console.log(event);
  };

  const renderPayment = () => {
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

      // <div className="w-96">
      //   <div className="flex justify-center flex-col items-center ">
      //     <img className="" src={logo} alt="Logo" width={50} />
      //     <p className="text-2xl text-gray-700 my-6">Payment Information</p>
      //   </div>
      //   <div className="w-full text-red-500 text-md text-center mb-4">{viewerErrMessages}</div>
      //   <div className="w-full flex flex-col justify-center p-4 py-8 shadow-md rounded-2xl bg-white">
      //     <Form
      //       layout="vertical"
      //       name="personal"
      //       initialValues={{ remember: true }}
      //       onFinish={onPaymentFinish}>
      //       <Form.Item
      //         name="name"
      //         label="Name of Credit Card"
      //         rules={[{ required: true, message: "Please input your Password!" }]}>
      //         <Input
      //           className="rounded-2xl "
      //           prefix={<FaUser className="site-form-item-icon" />}
      //           type="text"
      //           placeholder="Name of Credit Card"
      //         />
      //       </Form.Item>

      //       <Form.Item
      //         name="creditCard"
      //         label="Credit Card Number"
      //         rules={[{ required: true, message: "Please input your Password!" }]}>
      //         <Input className="rounded-2xl" type="text" placeholder="Credit Card Number" />
      //       </Form.Item>
      //       <div className="flex items-center justify-between">
      //         <Form.Item
      //           className="w-1/2 pr-2"
      //           name="exp_year"
      //           label="Expires on"
      //           rules={[{ required: true, message: "Please input exp date" }]}>
      //           <DatePicker
      //             className="rounded-2xl"
      //             onChange={onYearChange}
      //             picker="month"
      //             placeholder="Select exp date"
      //           />
      //         </Form.Item>
      //         <Form.Item
      //           className="w-1/2 pl-2"
      //           name="cvc"
      //           label="CVC"
      //           rules={[{ required: true, message: "Please input CVC number" }]}>
      //           <Input className="rounded-2xl" type="text" placeholder="CVC" />
      //         </Form.Item>
      //       </div>
      //       <Form.Item>
      //         <Button
      //           type="primary"
      //           htmlType="submit"
      //           shape="round"
      //           className="login-form-button w-full">
      //           Submit
      //         </Button>
      //       </Form.Item>
      //     </Form>
      //   </div>
      // </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="flex m-auto items-center w-auto p-8 pt-2 mt-14">
        <div className="self-start p-4 shadow-md">
          <Steps current={currentForm} direction="vertical" className="bg-white h-80 p-8">
            <Step
              icon={<FaUserCircle />}
              title="Personal/Corporate"
              description="Fill your personal/corporate information"
            />
            <Step icon={<FaMapMarkerAlt />} title="Address" description="Fill your address" />
            <Step
              icon={<FaMoneyCheckAlt />}
              title="Payment"
              description="Fill your payment information"
            />
          </Steps>
        </div>
        <div className="flex justify-center items-center h-full w-8/12 max-w-xl">
          {currentForm !== 2 ? (
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
                  <Link to="/signup_viewer">
                    <Button shape="round" className="flex items-center   m-1 px-4">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full text-red-500 text-md text-center mb-4">
                {viewerErrMessages}
              </div>
              <div>
                {currentForm === 0 ? renderPersonal() : currentForm === 1 ? renderAddress() : ""}
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
            renderPayment()
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupViewer;
