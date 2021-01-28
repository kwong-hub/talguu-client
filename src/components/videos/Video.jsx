import React from "react";

const Video = (props) => {
  console.log("props", props);
  return (
    <div className="flex flex-col items-center justify-center w-64 m-4 ">
      <video width={props.width} height={props.height} >
        <source src={props.video_link} type="video/mp4" />
      </video>
      <h3>{props.title}</h3>
      {/* <p>{props.describe}</p> */}
    </div>
  );
};

export default Video;
