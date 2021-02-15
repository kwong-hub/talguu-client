import React, { Component } from "react";
import { RiVideoUploadFill, RiUploadCloud2Line, RiArrowRightCircleLine } from "react-icons/ri";
import { Button, Progress, message } from "antd";
import videoService from "../../_services/video.service";
import SideNav from "../../partials/sideNav/SideNav";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { VIDEO_READY } from "../../redux/types";

const initialState = {
  drag: false,
  upload: false,
  title: "Title of the video",
  describe: "",
  files: {},
  progress: 0,
  active: "",
};

class UploadVideo extends Component {
  state = initialState;

  fileList = [];
  uploadFiles = (files) => {
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      this.fileList.push(files[i].name);
      this.setState({ active: "upload" });
      this.setState({ title: files[0].name, files: files[0] });
      this.props.dispatch({ type: VIDEO_READY, payload: this.state.files });
    }
  };
  errorMessage = () => {
    message.error("Failed to Upload");
  };

  dropRef = React.createRef();
  fileInput = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleOnclick = (e) => {
    this.fileInput.current.click();
  };
  handleFileSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.target.files && e.target.files.length > 0) {
      this.uploadFiles(e.target.files);
      // e.target.clearData();
      this.dragCounter = 0;
    }
  };
  handleDrop = (e) => {
    // console.log(e);
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.uploadFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };
  resetState() {
    this.setState(initialState);
  }
  submit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("describe", this.state.describe);
    formData.append("video", this.state.files, this.state.files.name);
    const config = {
      onUploadProgress: (progressEvent) => {
        this.setState({
          progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) - 5,
        });
      },
    };

    videoService
      .addVideo(formData, config)
      .then((json) => {
        let data = json.data;
        this.resetState();
        // this.successMessage();
        console.log("json", json);
        this.props.history.push("/finish-upload", { ...data });
      })
      .catch((err) => {
        this.errorMessage();
        this.resetState();
      });
  };
  nextClick = (to) => {
    this.setState({ active: to });
    this.props.history.push("/finish-upload");
  };
  componentDidMount = () => {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
    div.addEventListener("click", this.handleOnclick);
  };

  componentWillUnmount = () => {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  };
  uploadButton = () => (
    <div>
      <FaPlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  render() {
    return (
      <>
        <SideNav></SideNav>
        <div className="flex flex-col mt-8 m-4 mx-auto w-full max-w-4xl justify-center ">
          <div className="flex justify-around mx-4 ">
            <p className="text-2xl text-gray-600 m-2">One Step to Publish your video! </p>
            <Button
              size={60}
              type="primary"
              shape="round"
            
              icon={<RiUploadCloud2Line />}
              className="w-48 flex justify-center items-center text-xl p-4 transform hover:scale-110 motion-reduce:transform-none">
              Publish Video
            </Button>
          </div>

          <div ref={this.dropRef} className="flex justify-center my-4">
            <div className="shadow-inner border bg-white cursor-pointer border-gray-100 rounded-md w-2/3 max-w-3/4 transition duration-500 ease-in-out hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-110">
              <div className="h-64 flex flex-col justify-center items-center container mx-auto px-6 ">
                <RiVideoUploadFill className="text-5xl" />
                <p className="tracking-wider text-lg text-gray-500"> Drag and Drop the video </p>
                <input
                  type="file"
                  id="file-id"
                  ref={this.fileInput}
                  onChange={this.handleFileSelect}
                  className="hidden"
                />
                <button>Upload file</button>
                {this.state.progress > 0 && (
                  <Progress type="line" percent={this.state.progress} status="active" />
                )}
              </div>
            </div>
          </div>

          <div>
            {this.state.active !== "" && (
              <form
                onSubmit={this.submit}
                className="flex flex-col w-full items-center my-8 text-xl text-gray-500">
                <label className="flex items-baseline w-3/4">
                  Title
                  <input
                    className="border p-2 m-2 w-full rounded-xl focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                    type="text"
                    value={this.state.title}
                    onChange={(e) => {
                      this.setState({ title: e.target.value });
                    }}
                  />
                </label>

                <label className="flex items-baseline w-3/4">
                  Description
                  <textarea
                    className="border w-full p-1 m-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-transparent focus:border-blue-500"
                    type="text"
                    value={this.state.describe}
                    onChange={(e) => {
                      this.setState({ describe: e.target.value });
                    }}></textarea>
                </label>

                <Button
                  size={60}
                  type="primary"
                  shape="round"
                  icon={<RiArrowRightCircleLine />}
                  onClick={this.submit}
                  className="w-64 my-4 py-5 flex justify-center items-center text-xl p-4 transform hover:scale-110 motion-reduce:transform-none">
                  Next
                </Button>
              </form>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (props) => {
  // console.log(props);
  return {
    ...props.video,
  };
};

export default withRouter(connect(mapStateToProps, null)(UploadVideo));
