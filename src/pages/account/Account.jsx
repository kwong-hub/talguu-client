import { Avatar } from "antd";
import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { UserOutlined } from "@ant-design/icons";
import { userActions } from "../../_actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Account = (props) => {
  var history = useHistory();
  const logout = () => {
    props.logout();
    history.push("/login");
  };
  return (
    <div>
      <SideNav></SideNav>
      <div className="flex flex-col items-center">
        <Avatar size="large" icon={<UserOutlined />} />
        <p>Jane Doe</p>
        <button
          onClick={(e) => logout()}
          className="items-center bg-gray-500 px-4 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (response) => ({ response });
const actionCreators = {
  logout: userActions.logout,
};
export default connect(mapStateToProps, actionCreators)(Account);
