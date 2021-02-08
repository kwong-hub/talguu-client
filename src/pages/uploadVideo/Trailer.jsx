import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message, Button } from "antd";
import videoService from "../../_services/video.service";
export default class Trailer extends Component {
  state = {
    fileList: [],
    uploading: false,
  };
  resetForm = () => {
    this.setState({ fileList: [], uploading: false });
  };

  successMessage = () => {
    message.success("Successfull Upload");
  };
  failedMessage = () => {
    message.error("Failed to upload");
  };

  handleUpload = () => {
    this.setState({
      uploading: true,
    });
    const { fileList } = this.state;
    var formData = new FormData();
    formData.append("id", this.props.video);
    formData.append("trailer", fileList[0]);
    console.log("fileList,formData", fileList[0], formData);
    videoService
      .addTrailer(formData)
      .then((data) => {
        if (data[0]) {
          this.resetForm();
          this.successMessage();
        }
      })
      .catch((err) => {
        this.resetForm();
        this.failedMessage();
      });
  };
  render() {
    const { uploading, fileList } = this.state;
    const propsVideo = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState((state) => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };
    return (
      <div>
        <Upload {...propsVideo} className="flex my-4 w-auto">
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        {fileList.length !== 0 && (
          <Button
            className="flex my-4 w-auto"
            type="primary"
            onClick={this.handleUpload}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        )}
      </div>
    );
  }
}
