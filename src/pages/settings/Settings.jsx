import { Form, Button, DatePicker, Input, Radio, notification } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import SideNav from "../../partials/sideNav/SideNav";
import logo from "../../assets/images/logo.svg";
import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_PAYMENT_INFO_ASYNC } from "../../redux/types";
import { userService } from "../../_services/user.service";
import PaymentInfos from "../../components/paymentInfos/PaymentInfos";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Context = React.createContext({ name: "Default" });

const Settings = (props) => {
  const history = useHistory();
  const [showPaymentInfos, setShowPaymentInfos] = useState(false);
  const [form] = Form.useForm();
  const [viewerErrMessages, setViewerErrMessages] = useState("");
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    cardType: "MASTER_CARD",
    username: userService.getLocalUser().username,
    state: "NY",
    address: "Address",
  });
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("MASTER_CARD");
  const dispatch = useDispatch();
  const paymentInfo = useSelector((state) => state.payment.paymentInfo);
  const addPaymentInfoStatus = useSelector(
    (state) => state.payment.addPaymentInfoStatus
  );
  const username = userService.getLocalUser().username;

  useEffect(() => {
    if (addPaymentInfoStatus == "SUCCESS") {
      setLoading(false);
      setPaymentModalVisible(false);
      form.resetFields();
      notification.open({
        message: "Payment Information Created!!",
        icon: <FaCheck className="text-sm text-green-600" />,
      });
    } else if (addPaymentInfoStatus == "ERROR") {
      setViewerErrMessages("Can not create payment information.");
    }
    return () => {};
  }, [paymentInfo]);

  const onPaymentFinish = (values) => {
    // console.log(values);
    setViewerErrMessages("");
    let pattern =
      values.cardType == "MASTER_CARD"
        ? /^5[1-5][0-9]{14}$/
        : /^4[0-9]{12}(?:[0-9]{3})?$/;
    let valid = pattern.test(values.cardNumber);
    if (!valid) {
      setViewerErrMessages("Please Enter Valid Information");
      return;
    }
    console.log(moment(values.expDate).format("MM / YY"));
    setLoading(true);
    dispatch({
      type: ADD_PAYMENT_INFO_ASYNC,
      payload: {
        ...values,
        expDate: moment(values.expDate).format("MM / YY"),
        username,
        state: "NY",
        address: "Address",
      },
    });
  };

  const paymentMethodChange = (value) => {
    setPaymentMethod(value.target.value);
  };

  const onYearChange = (value) => {
    // console.log(values);
  };

  const changePaymentModalVisible = (value) => {
    setPaymentModalVisible(value);
  };

  const changePaymentInfosVisible = (value) => {
    setShowPaymentInfos(value);
  };
  const depositAccount = (value) => {
    history.push("/deposit");
  };

  const renderPayment = () => {
    return (
      <Modal
        className="py-10 px-5 opacity-95"
        centered
        closable={false}
        mask={false}
        footer={null}
        visible={paymentModalVisible}
        onOk={() => changePaymentModalVisible(false)}
        onCancel={() => changePaymentModalVisible(false)}
      >
        <div className="modal_form">
          <div className="flex justify-center flex-col items-center ">
            <img className="" src={logo} alt="Logo" width={50} />
            <p className="text-2xl text-gray-700 my-6">Payment Information</p>
          </div>
          <div className="w-full text-red-500 text-md text-center mb-4">
            {viewerErrMessages}
          </div>
          <div className="w-full flex flex-col justify-center p-4 py-8  ">
            <Form
              form={form}
              layout="vertical"
              name="personal"
              onFinish={onPaymentFinish}
              initialValues={formValues}
            >
              <div className="flex items-center justify-between">
                <Form.Item
                  name="firstName"
                  label="First Name"
                  className="w-full p-1"
                  rules={[
                    { required: true, message: "Please input card first name" },
                  ]}
                >
                  <Input
                    className="rounded-2xl "
                    prefix={<FaUser className="site-form-item-icon" />}
                    type="text"
                    placeholder="First Name"
                  />
                </Form.Item>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  className="w-full p-3"
                  rules={[
                    { required: true, message: "Please input card last name" },
                  ]}
                >
                  <Input
                    className="rounded-2xl "
                    prefix={<FaUser className="site-form-item-icon" />}
                    type="text"
                    placeholder="Last Name"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center justify-between">
                <Form.Item
                  name="zipCode"
                  label="Zip Code"
                  className="w-full p-1"
                  rules={[{ required: true, message: "Please input zip code" }]}
                >
                  <Input
                    className="rounded-2xl "
                    type="text"
                    placeholder="Zip Code"
                  />
                </Form.Item>
                <Form.Item
                  name="city"
                  label="City"
                  className="w-full p-3"
                  rules={[{ required: true, message: "Please input city" }]}
                >
                  <Input
                    className="rounded-2xl "
                    type="text"
                    placeholder="City"
                  />
                </Form.Item>
              </div>
              <Form.Item name="cardType" label="Select Card Type">
                <Radio.Group
                  name="cardType"
                  onChange={paymentMethodChange}
                  value={paymentMethod}
                  className="w-full flex my-2"
                >
                  <Radio
                    className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
                    value="MASTER_CARD"
                  >
                    <img src={mastercard} alt="" className="h-10 ml-1" />
                    <span className="ml-1">Mastercard</span>
                  </Radio>

                  <Radio
                    className="flex items-center justify-start w-full border-t-2 border-gray-100 p-3 text-gray-600 text-ls "
                    value="VISA"
                  >
                    <img src={visa} alt="" className="h-10 ml-1" />{" "}
                    <span className="ml-1">Visa</span>
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[
                  {
                    pattern:
                      paymentMethod == "MASTER_CARD"
                        ? /^5[1-5][0-9]{14}$/
                        : /^4[0-9]{12}(?:[0-9]{3})?$/,
                    required: true,
                    message: "Please input valid card number",
                  },
                ]}
              >
                <Input
                  className="rounded-2xl"
                  type="text"
                  placeholder="Card Number"
                />
              </Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item
                  className="w-1/2 pr-2"
                  name="expDate"
                  label="Expires on"
                  rules={[{ required: true, message: "Please input exp date" }]}
                >
                  <DatePicker
                    className="rounded-2xl"
                    onChange={onYearChange}
                    picker="month"
                    placeholder="Select exp date"
                  />
                </Form.Item>
                <Form.Item
                  className="w-1/2 pl-2"
                  name="cvc"
                  label="CVC"
                  rules={[
                    { required: true, message: "Please input CVC number" },
                  ]}
                >
                  <Input
                    className="rounded-2xl"
                    type="number"
                    placeholder="CVC"
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="securityCode"
                label="Security Code"
                rules={[
                  { required: true, message: "Please input Security Code" },
                ]}
              >
                <Input
                  className="rounded-2xl"
                  type="number"
                  placeholder="Security Code"
                />
              </Form.Item>
              <div>
                <p className="text-gray-700 text-xs text-center w-full mb-2">
                  Notice: Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Ipsam illo quas, facilis
                </p>
              </div>
              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-full"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="bg-gray-100">
      <SideNav></SideNav>
      <div className="flex-col ml-14 mt-5">
        <div className="flex p-4 rounded-sm  items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">
              Billing and Payment
            </h1>
            <h4 className="text-gray-700 text-md text-left font-light">
              Choose how you make payment
            </h4>
          </div>
          <div>
            <Button
              onClick={() => changePaymentInfosVisible(true)}
              className="mx-2"
            >
              View
            </Button>
            <Button
              onClick={() => changePaymentModalVisible(true)}
              type="secondary"
            >
              Add Payment Method
            </Button>
          </div>
        </div>
        <div className="flex p-4 rounded-sm  items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">
              Billing and Payment
            </h1>
            <h4 className="text-gray-700 text-md text-left font-light">
              Deposit to your account
            </h4>
          </div>
          <div>
            <Button
              onClick={() => changePaymentInfosVisible(true)}
              className="mx-2"
            >
              View
            </Button>
            <Button onClick={() => depositAccount(true)} type="secondary">
              Deposit
            </Button>
          </div>
        </div>
        <div className="flex p-4 rounded-sm  items-center justify-between  max-w-xl m-auto">
          <div>
            <h1 className="text-gray-800 text-lg text-left">Account</h1>
            <h4 className="text-gray-700 text-md text-left font-light">Account Setting</h4>
          </div>
          <div>
            <Button type="secondary">Edit Account</Button>
          </div>
        </div>
      </div>
      {renderPayment()}
      {showPaymentInfos ? (
        <PaymentInfos
          username={username}
          changePaymentModalVisible={changePaymentInfosVisible}
          modalVisible={showPaymentInfos}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Settings;
