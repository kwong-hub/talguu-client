import React from "react";
import { connect, useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Form, TextArea, Avatar, Button, Input, message, Spin } from "antd";
import SideNav from "../../partials/sideNav/SideNav";
import { userActions } from "../../_actions";
import { useState } from "react";
import { useEffect } from "react";
import { GET_USER_PROFILE_ASYNC } from "../../redux/types";
import { userService } from "../../_services/user.service";
import { FaBuilding, FaKey, FaLocationArrow } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
const Profile = (props) => {
  let dispatch = useDispatch();
  const [user, setuser] = useState();
  const [profile, setProfile] = useState();
  const saveBasic = (values) => {
    userService
      .updateUserProfile(values)
      .then((data) => {
        message.success("Successfully updated.");
        setuser({ ...user, ...values });
      })
      .catch((err) => message.success("Failed to update."));
  };

  const saveCompany = (values) => {
    userService
      .updateCompanyProfile(values)
      .then((data) => {
        message.success("Successfully updated.");
        setProfile(values);
      })
      .catch((err) => message.error("Failed to update."));
  };
  const updatePassword = (values) => {
    userService
      .updatePassword(values)
      .then((data) => {
        if (data.success) {
          message.success("Successfully Changed.");
        } else {
          message.error(data.error ? data.error : "Failed to change");
        }
      })
      .catch((err) => message.error("Failed to change."));
  };

  useEffect(() => {
    // dispatch({ type: GET_USER_PROFILE_ASYNC });
    // window.scrollTo(0, 0);
    userService.getUserProfile().then((data) => {
      console.log("data", data);
      if (data.success) {
        setProfile(data.producer ? data.producer : data.viewer);
        setuser(data.user);
      }
    });
    return () => {};
  }, []);
  return (
    <div className="">
      <SideNav></SideNav>
      {profile ? (
        <>
          {" "}
          <div className="flex flex-col mt-20 md:flex-row justify-center items-baseline">
            <div className="w-1/3 hidden md:inline-block ">
              <Avatar
                className="shadow-xl "
                size={80}
                icon={<UserOutlined />}
              />
              <div className="m-4">
                <span className="text-2xl py-4 font-medium leading-tight">
                  {user?.firstName + " " + user?.lastName}{" "}
                </span>
                <p className="font-light text-blue-500">{user?.email}</p>
              </div>
            </div>
            <div className="flex px-6 flex-col w-full md:w-1/2">
              <div className="bg-white p-8 border rounded-xl">
                <div className="">
                  <p className="text-xl font-semibold flex pb-4">
                    Basic Information
                  </p>
                </div>
                {user && (
                  <Form
                    layout="vertical"
                    name="normal_login"
                    className="flex flex-col items-baseline "
                    initialValues={{
                      ...user,
                    }}
                    onFinish={saveBasic}
                  >
                    <div className="flex flex-col md:flex-row w-full ">
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        className="text-lg text-gray-600 w-full"
                        rules={[
                          {
                            required: true,
                            message: "Please input your firstName!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="firstName*"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        className="text-lg ml-2 w-full"
                        rules={[
                          {
                            required: true,
                            message: "Please input your lastName!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="lastName*"
                        />
                      </Form.Item>
                    </div>

                    <Form.Item
                      label="Phone Number"
                      name="phoneNumber"
                      className="text-lg flex   text-gray-600"
                      help="Phone number should be valid format +1xxx.."
                      rules={[
                        {
                          required: true,
                          message: "Please input your Phone Number!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-xl text-gray-700 text-md p-2"
                        placeholder="Title*"
                      />
                    </Form.Item>

                    <Form.Item className="flex">
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        className="login-form-button mt-4 "
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-8 md:flex-row justify-center items-baseline">
            <div className="w-1/3 hidden md:inline-block">
              <FaBuilding className="flex text-4xl mx-auto" />
              <div className="m-4">
                <span className="text-2xl py-4 font-medium leading-tight">
                  {profile?.companyName}
                </span>
                <p className="font-light text-blue-500 flex items-center justify-center">
                  <ImLocation2 /> {profile?.state}
                  {", "}
                  {profile?.city}
                </p>
              </div>
            </div>
            <div className="px-6 w-full md:w-1/2">
              <div className="bg-white p-8 my-4 border rounded-xl">
                <div className="text-xl font-semibold flex pb-6">
                  <p>Company Information</p>
                </div>

                {profile && (
                  <Form
                    layout="vertical"
                    name="normal_login"
                    className="flex flex-col items-baseline"
                    initialValues={{
                      ...profile,
                      companyName: profile?.companyName,
                    }}
                    onFinish={saveCompany}
                  >
                    <Form.Item
                      label="Company Name"
                      name="companyName"
                      className="text-lg text-gray-600 w-full mb-2"
                      help="Legal name of your company. if you don't have company write your full name."
                      rules={[
                        {
                          required: true,
                          message: "Please input your company Name!",
                        },
                      ]}
                    >
                      <Input
                        className="rounded-xl text-gray-700 text-md p-2"
                        placeholder="Company*"
                      />
                    </Form.Item>
                    <div className="flex flex-col md:flex-row w-full ">
                      <Form.Item
                        label="Company Address"
                        name="companyAddress"
                        className="text-lg w-full text-gray-600"
                        help="Company detail address description."
                        rules={[{ message: "Please input your address!" }]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="Company Address"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Company Contact Number"
                        name="phoneNumber"
                        className="text-lg w-full ml-2  text-gray-600"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone Number!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl  text-gray-700 text-md p-2"
                          placeholder="Phone Number*"
                        />
                      </Form.Item>
                    </div>

                    <div className="flex flex-col md:flex-row w-full">
                      <Form.Item
                        label="State"
                        name="state"
                        className="text-lg w-full mr-2  text-gray-600"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Phone Number!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="state*"
                        />
                      </Form.Item>
                      <Form.Item
                        label="city"
                        name="city"
                        className="text-lg  w-full text-gray-600"
                        rules={[
                          {
                            required: true,
                            message: "Please input your City!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="city*"
                        />
                      </Form.Item>
                      <Form.Item
                        label="zipcode"
                        name="zipCode"
                        className="text-lg ml-2 w-full  text-gray-600"
                        rules={[
                          {
                            required: true,
                            message: "Please input your zipcode!",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-xl text-gray-700 text-md p-2"
                          placeholder="zipcode*"
                        />
                      </Form.Item>
                    </div>
                    <Form.Item className="">
                      <Button
                        type="primary"
                        htmlType="submit"
                        shape="round"
                        className="login-form-button  "
                      >
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-8 md:flex-row justify-center items-baseline">
            <div className="w-1/3 hidden md:inline-block">
              <FaKey className="flex text-4xl  mx-auto" />
              <div className="m-4">
                <span className="text-2xl py-4 font-medium leading-tight">
                  Account Security
                </span>
                <p className="text-gray-500">
                  Make your password strong and secured.
                </p>
              </div>
            </div>
            <div className="px-6 w-full md:w-1/2">
              <div className="bg-white p-8 my-4 border rounded-xl">
                <div className="text-xl font-semibold flex pb-6">
                  <p>Password Change</p>
                </div>

                <Form
                  layout="vertical"
                  name="normal_login"
                  className="flex flex-col items-start "
                  onFinish={updatePassword}
                >
                  <Form.Item
                    label="Old Password"
                    name="oldPassword"
                    className="text-lg text-gray-600 w-full mb-2"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Old Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl text-gray-700 text-md p-2"
                      placeholder="Old Password*"
                    />
                  </Form.Item>

                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    className="text-lg flex w-full text-gray-600"
                    rules={[
                      { required: true, message: "Please input your address!" },
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl text-gray-700 text-md p-2"
                      placeholder="New Password*"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confrimPassword"
                    className="text-lg w-full ml-2  text-gray-600"
                    help="It's recommended to use strong password. that you're not using elsewhere"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Confirm Password!",
                      },
                    ]}
                  >
                    <Input
                      type="password"
                      className="rounded-xl  text-gray-700 text-md p-2"
                      placeholder="Re-type password*"
                    />
                  </Form.Item>

                  <Form.Item className="">
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      className="mt-4 "
                    >
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spin
          size={100}
          className="flex items-center justify-center h-screen text-4xl"
        />
      )}
    </div>
  );
};
const mapStateToProps = (props) => {
  return {
    ...props.account,
  };
};
const actionCreators = {
  logout: userActions.logout,
};
export default connect(mapStateToProps, actionCreators)(Profile);
