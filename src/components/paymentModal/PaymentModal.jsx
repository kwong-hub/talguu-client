import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { FaDollarSign } from "react-icons/fa";

function PaymentModal(props) {
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
      <p className="text-gray-700 text-xs text-center w-full my-6">
        Notice: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam illo quas, facilis
      </p>
      <div
        onClick={() => props.purchaseVideo(props.video.id)}
        className="h-10 bg-blue-500 -mx-6 text-center text-white text-md flex items-center justify-center cursor-pointer font-semibold pay_button">
        Pay From Balance <FaDollarSign />
        {props.video?.video_price}
      </div>
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
