import React from "react";
import { Link } from "react-router-dom";

const Video = (props) => {
  console.log("props", props);
  return (
    <Link to="/">
      <div className="flex flex-col items-center justify-center w-64 p-4 hover:shadow-inner cursor-pointer ">
        <video width={props.width} height={props.height}>
          <source src={props.video_link} type="video/mp4" />
        </video>
        <h3>{props.title}</h3>
        {/* <p>{props.describe}</p> */}
      </div>
    </Link>
  );
};

export default Video;
