import React, { Component } from "react";
import { RiVideoUploadFill } from "react-icons/ri";
class Upload extends Component {
  state = {
    drag: false,
  };
  fileList=[]
  uploadFiles = (files) => {
      console.log(files);
    let fileList = this.state.files
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
      fileList.push(files[i].name)
    }
    this.setState({files: fileList})
  }
 
  dropRef = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    console.log(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.uploadFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  componentDidMount = () => {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  };
//   componentWillUnmount = () => {
//     let div = this.dropRef.current;
//     div.removeEventListener("dragenter", this.handleDragIn);
//     div.removeEventListener("dragleave", this.handleDragOut);
//     div.removeEventListener("dragover", this.handleDrag);
//     div.removeEventListener("drop", this.handleDrop);
//   };

  render() {
    return (
      <div  ref={this.dropRef} class="flex justify-center">
        <div class="shadow-lg w-2/3 max-w-3/4 transition duration-500 ease-in-out hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-110">
          <div class=" h-64 flex flex-col justify-center items-center container mx-auto px-6 ">
            <RiVideoUploadFill class="text-5xl" />
            <p class="tracking-wider text-lg text-gray-500">
              {" "}
              Drag and Drop the video{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
