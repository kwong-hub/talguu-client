import { Button, Form, Input, message, PageHeader, Select } from "antd";
import React, { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import paymentService from "../../_services/payment.service";
import mastercard from "../../assets/images/mastercard.svg";
import visa from "../../assets/images/visa.png";
import SideNav from "../../partials/sideNav/SideNav";

const Deposit = (props) => {
  const history = useHistory();
  const [user, setUser] = useState(props?.user?.user);
  const [payments, setPayments] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setloading] = useState(false);
  const onFinish = (values) => {
    setloading(true);
    paymentService
      .addDeposit({ ...values, id: values.selectedCard })
      .then((data) => {
        setloading(false);
        if (data.success) {
          message.success("Succesfully Deposited!");
          getBalance();
          history.goBack();
        } else {
          message.error("Failed to deposited");
        }
      })
      .catch((err) => {
        message.error("Failed to deposited!" + err);
        setloading(false);
      });
  };

  const addPaymentInfo = () => {
    history.push("/settings", { paymentModalVisible: true });
  };

  useEffect(() => {
    paymentService
      .getPaymentInfos(user.username)
      .then(paymentInfo)
      .catch((err) => console.log("err", err));
    getBalance();
    return () => {};
  }, []);

  const getBalance = () => {
    paymentService
      .getBalance()
      .then((data) => {
        if (data.success) {
          if (!isNaN(data.balance)) {
            setBalance(data.balance);
          } else {
            setBalance(0);
          }
        }
      })
      .catch((err) => console.log("err", err));
  };
  const paymentInfo = (data) => {
    if (data.success) {
      setPayments(data.payment_infos);
    }
  };

  return (
    <div>
      <SideNav />
      <PageHeader
        className="ml-16 mt-16"
        onBack={() => history.goBack()}
        title="Deposit"
        subTitle="deposit money for later use"
      />
      <div className="flex flex-col items-center justify-center  ">
        <section className="max-w-lg min-w-max w-1/2 shadow-md rounded-lg bg-gray-50 p-4">
          <div className="m-4 py-2 px-2 border rounded-full border-gray-100 text-gray-700 text-lg">
            Balance
            <span className="font-black px-2">{(Math.round(balance * 100) / 100).toFixed(2)}$</span>
          </div>
          <h2 className="text-xl text-gray-800 font-semibold py-4">Payment</h2>
          <div className="flex justify-center pb-4">
            <span className=" px-2 rounded-xl ">
              <img src={mastercard} alt="" className="h-10" />
            </span>
            <span className=" cursor-pointer px-2">
              <img src={visa} alt="" className="h-11" />
            </span>
          </div>

          <div className="text-gray-700 text-md pb-2">
            {payments.length > 0 ? (
              <Form
                name="normal_login"
                className="login-form px-4 w-full md:px-8"
                initialValues={{ amount: 10 }}
                onFinish={onFinish}
                layout="vertical">
                <Form.Item
                  name="selectedCard"
                  label="Select Card"
                  className=""
                  rules={[{ required: true, message: "Please select your card!" }]}>
                  <Select className="rounded-xl" defaultValue={<h2>Select Your card.</h2>}>
                    {payments.map((item) => (
                      <option value={item.id}>
                        <div>
                          <div className="">
                            <div className="w-full font-semibold text-md flex  relative ">
                              <span className="mr-2">{item.firstName}</span>
                              <span> {item.lastName}</span>
                              <div className="absolute top-1 right-2">
                                {item.cardType === "MASTER_CARD" && (
                                  <div>
                                    <img src={mastercard} alt="" className="h-7" />
                                  </div>
                                )}
                                {item.cardType === "VISA" && (
                                  <div>
                                    <img src={visa} alt="" className="h-7" />
                                  </div>
                                )}
                              </div>
                            </div>

                            <p className="text-sm  font-extralight">
                              <span> Card-Number:</span>
                              {item.cardNumber}
                            </p>
                          </div>
                        </div>
                      </option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    {
                      required: true,
                      min: 2,
                      message: "Please input your Amount!",
                    },
                  ]}
                  help="Deposit amount should greater than 10$">
                  <Input
                    className="rounded-md "
                    prefix={<FaDollarSign className="site-form-item-icon" />}
                    type="number"
                    min="9"
                    placeholder="Deposit Amount"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    shape="round"
                    className="login-form-button w-full my-4 bg-blue-600 border-blue-600">
                    Deposit
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <span>"No payment information added yet."</span>
                <Button
                  onClick={(e) => addPaymentInfo()}
                  type="primary"
                  className="rounded-full mx-auto my-4 flex">
                  Add Payment Information
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
const mapStateToProps = (props) => {
  return {
    user: props.authentication,
  };
};

export default connect(mapStateToProps, null)(Deposit);
