import React from "react";
import PropTypes from "prop-types";
import SideNav from "../../partials/sideNav/SideNav";

function PurchasedPlaylist(props) {
  return (
    <div>
      <SideNav></SideNav>
      <div>Hello from purchased playlist</div>
    </div>
  );
}

PurchasedPlaylist.propTypes = {};

export default PurchasedPlaylist;
