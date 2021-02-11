import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { BiCheckCircle, BiCheckShield } from "react-icons/bi";
import { AiFillCreditCard, AiOutlineNumber } from "react-icons/ai";
import { connect } from "react-redux";

import { FaPaypal, FaSortNumericDown } from "react-icons/fa";
import { RiMastercardFill } from "react-icons/ri";
import { USER_PAYMENT_INFO } from "../../redux/types";
import { paymentService } from "../../_services/payment.service";

const Deposit = (props) => {
  const [user, setUser] = useState(props?.user?.user);
  const onFinish = (values) => {
    console.log("values", values);
  };
  useEffect(() => {
    paymentService
      .getPaymentInfos(user.username)
      .then(paymentInfo)
      .catch((err) => console.log("err", err));
    return () => {};
  }, []);

  const paymentInfo = (data) => {
    console.log("data", data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <SideNav />
      <section></section>
      <section className="max-w-md shadow-md rounded-lg bg-white p-4">
        <div className="m-4 py-2 px-2 border rounded-full border-gray-100 text-gray-700 ">
          Balance
          <span className="font-black px-2">10$</span>
        </div>
        <h2 className="text-xl text-gray-600 py-4">Payment</h2>
        <div className="flex justify-center pb-4">
          <span className="text-3xl px-2 bg-gray-50 cursor-pointer">
            <RiMastercardFill />
          </span>
          <span className="text-3xl cursor-pointer hover:border">
            <FaPaypal />
          </span>
        </div>
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="cardNumber"
              rules={[
                { required: true, message: "Please input your Card Number!" },
              ]}
            >
              <Input
                className="rounded-md"
                prefix={<AiFillCreditCard className="site-form-item-icon" />}
                placeholder="Credit card"
              />
            </Form.Item>
            <Form.Item
              name="CVC"
              rules={[{ required: true, message: "Please input your cvc!" }]}
            >
              <Input
                className="rounded-md"
                prefix={<BiCheckShield className="site-form-item-icon" />}
                placeholder="CVC"
              />
            </Form.Item>
            <Form.Item
              name="Amount"
              rules={[{ required: true, message: "Please input your Amount!" }]}
              help="Deposit amount should greater than 2$"
            >
              <Input
                className="rounded-md "
                prefix={<AiOutlineNumber className="site-form-item-icon" />}
                type="number"
                min="2"
                placeholder="Deposit Amount"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                className="login-form-button w-full bg-green-600 border-green-600"
              >
                Deposit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (props) => {
  console.log("props", props);
  return {
    user: props.authentication,
  };
};

export default connect(mapStateToProps, null)(Deposit);
