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
        if (data.success) setbalance(data.balance);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div>
      <Modal
        className="py-4 px-2 w-32 mx-4 opacity-95"
      
        centered
        closable={false}
        mask={false}
        footer={null}
        visible={props.modalVisible}
        onOk={() => props.changePaymentModalVisible(false)}
        onCancel={() => props.changePaymentModalVisible(false)}
        okText="back"
      >
        <div className="p-4">
         <h2>Balance</h2>
         <p className="text-2xl font-bold ">{balance}$</p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowBalance;
