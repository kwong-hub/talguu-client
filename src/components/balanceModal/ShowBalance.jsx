import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import paymentService from "../../_services/payment.service";

const ShowBalance = (props) => {
  console.log("props", props);
  const [balance, setbalance] = useState(0);
  useEffect(() => {
    getBalance();
    return () => {};
  }, []);

  const getBalance = () => {
    paymentService
      .getBalance()
      .then((data) => {
        if (data.success) {
          if (!isNaN) {
            setbalance(data.balance);
          } else {
            setbalance(0);
          }
        }
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <Modal
        className="w-1/2 opacity-95"
        centered
        closable={true}
        mask={false}
        // footer={null}
        visible={props.modalVisible}
        onOk={() => props.changePaymentModalVisible(false)}
        onCancel={() => props.changePaymentModalVisible(false)}
        okText="Ok">
        <div className="flex flex-col justify-center items-center py-4 ">
          <h2>Balance</h2>
          <p className="text-2xl font-bold ">{(Math.round(balance * 100) / 100).toFixed(2)}$</p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowBalance;
