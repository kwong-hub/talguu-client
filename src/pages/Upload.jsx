import React from "react";
import { RiVideoUploadFill } from "react-icons/ri";
const Upload = () => {
  return (
    <div class=" flex mx-auto shadow-lg w-2/3 max-w-3/4">
      <div class=" h-64 flex flex-col justify-center items-center container mx-auto px-6 ">
        <RiVideoUploadFill class="text-5xl" />
        <p class="tracking-wider text-lg"> Drag and Drop the video </p>
      </div>
    </div>
  );
};

export default Upload;
