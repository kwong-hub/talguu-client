import React, { Component } from "react";
import SideNav from "../../partials/sideNav/SideNav";
import { connect } from "react-redux";
import { Button } from "antd";
import { INCREMENT_ASYNC } from "../../redux/types";

export class WatchVideo extends Component {
  handleIncrement = () => {
    this.props.dispatch({ type: INCREMENT_ASYNC, payload: 1 });
  };
  render = () => {
    return (
      <div>
        <SideNav></SideNav>
        <div>Watch Video</div>
        <span>{this.props.count}</span>
        <Button onClick={this.handleIncrement}>Increment</Button>
      </div>
    );
  };
}

const mapStateToProps = (props) => {
  return {
    count: props.counter.count,
  };
};

export default connect(mapStateToProps, null)(WatchVideo);
