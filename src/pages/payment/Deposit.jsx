import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { BiCheckCircle, BiCheckShield, BiStopwatch } from "react-icons/bi";
import {
  AiFillCreditCard,
  AiFillDollarCircle,
  AiOutlineNumber,
  AiOutlineUser,
} from "react-icons/ai";
import { connect } from "react-redux";

import { FaDollarSign, FaPaypal, FaSortNumericDown } from "react-icons/fa";
import { RiMastercardFill, RiMoneyDollarBoxLine } from "react-icons/ri";
import { USER_PAYMENT_INFO } from "../../redux/types";
import { paymentService } from "../../_services/payment.service";
import mastercard from "../../assets/images/mastercard.svg";
import paypall from "../../assets/images/paypal.svg";

const Deposit = (props) => {
  const [user, setUser] = useState(props?.user?.user);
  const [payments, setPayments] = useState([]);
  const [cardNumber, setCardNumber] = useState([]);
  const [selectedCard, setselectedCard] = useState();
  const [newFormCard, setNewCard] = useState(false);
  const onFinish = (values) => {
    console.log("values", values);
    if (selectedCard) {
      paymentService
        .addDeposit({ ...values, id: selectedCard.id })
        .then((data) => {
          if (data.success) {
            message.success("Succesfully Deposited!");
          } else {
            message.error("Failed to deposited");
          }
          console.log("data", data);
        })
        .catch((err) => message.error("Failed to deposited!" + err));
    }
  };
  const selectCard = (item) => {
    setselectedCard(item);
    console.log("selectedCard", selectedCard);
  };
  const reselect = () => {
    console.log("her");
    setselectedCard(null);
  };
  const newForm = () => {
    setselectedCard(null);
    setNewCard(true);
  };
  useEffect(() => {
    paymentService
      .getPaymentInfos(user.username)
      .then(paymentInfo)
      .catch((err) => console.log("err", err));
    paymentService
      .getBalance()
      .then((data) => console.log("data", data))
      .catch((err) => console.log("err", err));
    return () => {};
  }, []);

  const paymentInfo = (data) => {
    if (data.success) {
      setPayments(data.payment_infos);
      let cards = [];
    }
  };

  const depositExist = (intials) => (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, ...intials }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input your Amount!" }]}
          help="Deposit amount should greater than 2$"
        >
          <Input
            className="rounded-md "
            prefix={<FaDollarSign className="site-form-item-icon" />}
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
  );

  const newCard = (intials) => (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true, ...intials }}
        onFinish={onFinish}
        layout="vertical"
      >
        <div className="flex">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input your First Name!" },
            ]}
          >
            <Input
              readOnly={selectedCard}
              className="rounded-md mr-2"
              prefix={<AiOutlineUser className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: "Please input your Last Name!" },
            ]}
          >
            <Input
              readOnly={selectedCard}
              className="rounded-md"
              prefix={<AiOutlineUser className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[
            { required: true, message: "Please input your Card Number!" },
          ]}
        >
          <Input
            readOnly={selectedCard}
            className="rounded-md"
            prefix={<AiFillCreditCard className="site-form-item-icon" />}
            placeholder="Credit card"
          />
        </Form.Item>
        <div className="flex">
          <Form.Item
            name="expDate"
            label="Expire Date"
            rules={[{ required: true, message: "Please input your expDate!" }]}
          >
            <Input
              readOnly={selectedCard}
              className="rounded-md mr-2"
              prefix={<BiStopwatch className="site-form-item-icon" />}
              placeholder="MM/YY"
            />
          </Form.Item>
          <Form.Item
            name="cvc"
            label="CVC"
            rules={[{ required: true, message: "Please input your cvc!" }]}
          >
            <Input
              readOnly={selectedCard}
              className="rounded-md"
              prefix={<BiCheckShield className="site-form-item-icon" />}
              placeholder="CVC"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input your Amount!" }]}
          help="Deposit amount should greater than 2$"
        >
          <Input
            className="rounded-md "
            prefix={<FaDollarSign className="site-form-item-icon" />}
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
            className="login-form-button w-full my-4 bg-blue-600 border-blue-600"
          >
            Deposit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center  ">
      <SideNav />
      <section></section>
      <section className="max-w-lg shadow-md rounded-lg bg-white p-4">
        <div className="m-4 py-2 px-2 border rounded-full border-gray-100 text-gray-700 ">
          Balance
          <span className="font-black px-2">10$</span>
        </div>
        <h2 className="text-xl text-gray-600 py-4">Payment</h2>
        <div className="flex justify-center pb-4">
          <span className=" p-2 rounded-xl cursor-pointer">
            <img src={mastercard} alt="" className="h-10" />
          </span>
          <span className=" cursor-pointer rounded-lg hover:shadow-lg p-2">
            <img src={paypall} alt="" className="h-11" />
          </span>
        </div>
        <div>
          <div className="flex flex-row justify-end pb-4 justify-items-end">
            {selectedCard ? (
              <Button onClick={(e) => reselect()} className="rounded-full">
                Select another card!
              </Button>
            ) : (
              <Button onClick={(e) => selectCard({})} className="rounded-full">
                New card!
              </Button>
            )}
          </div>
        </div>
        {!selectedCard &&
          payments.map((item) => (
            <div
              onClick={(e) => selectCard(item)}
              className="mx-4 px-8 py-4 cursor-pointer border border-gray-50 hover:border-gray-100 hover:shadow-md hover:bg-gray-100 hover:text-blue-500 bg-white flex flex-col items-start  shadow-sm"
            >
              <div className="font-semibold text-md flex flex-col  items-center lg:flex-row">
                <span className="mr-2">{item.firstName}</span>
                <span> {item.lastName}</span>
                <div className="ml-12">
                  {item.cardType === "MASTER_CARD" && (
                    <div>
                      {" "}
                      <img src={mastercard} alt="" className="h-7" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm  font-extralight">
                <span> Card-Number:</span>
                {item.cardNumber}
              </p>
            </div>
          ))}
        <div>{selectedCard && newCard(selectedCard)}</div>
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