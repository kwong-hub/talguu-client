import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { FaDollarSign } from "react-icons/fa";
import paymentService from "../../_services/payment.service";
import { useHistory } from "react-router-dom";

function PaymentModal(props) {
  const [balance, setBalance] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // console.log("getting balance");
    paymentService
      .getBalance()
      .then((res) => {
        if (res.success) {
          if (!isNaN(res.balance)) {
            setBalance(res?.balance);
          }
        }
      })
      .catch((err) => console.log(err));
    return () => {};
  }, []);

  const routeToDeposit = () => {
    history.push("/deposit");
  };

  return (
    <Modal
      className="max-w-xs h-auto px-5 opacity-95"
      centered
      closable={false}
      mask={false}
      footer={null}
      visible={props.paymentModalVisible}
      onOk={() => props.paymentModalVisibleFunc(false)}
      onCancel={() => props.paymentModalVisibleFunc(false)}>
      <div className="absolute -left-8 top-1 w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
        <FaDollarSign /> {props.video?.video_price}
      </div>
      <h3 className="text-gray-600 uppercase text-center w-full text-lg mb-3">Payment</h3>
      <div>
        <img src={props.video?.thumbnial} alt="" />
      </div>
      {balance && balance > props.video?.video_price && (
        <p className="text-gray-700 text-xs text-center w-full my-6">
          Notice: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo quas, facilis
        </p>
      )}
      {(!balance || balance < props.video?.video_price) && (
        <p className="text-gray-700 text-xs text-center w-full my-6">
          You do not have enough balance or you do not have balance at all. Please deposit first to
          purchase this video
        </p>
      )}
      {balance && balance > props.video?.video_price && (
        <div
          onClick={() => props.purchaseVideo(props.video.id)}
          className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
          Pay From Balance <FaDollarSign />
          {props.video?.video_price}
        </div>
      )}
      {(!balance || balance < props.video?.video_price) && (
        <div
          onClick={() => routeToDeposit()}
          className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
          Deposit
        </div>
      )}
    </Modal>
  );
}

PaymentModal.propTypes = {
  purchaseVideo: PropTypes.func,
  paymentModalVisibleFunc: PropTypes.func,
  video: PropTypes.shape({
    id: PropTypes.string,
    thumbnial: PropTypes.string,
  }),
  paymentModalVisible: PropTypes.bool,
};

export default PaymentModal;
