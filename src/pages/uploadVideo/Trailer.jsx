import React, { Component } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message, Button } from "antd";
export default class Trailer extends Component {
  state = {
    fileList: [],
    uploading: false,
  };
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });

    this.setState({
      uploading: true,
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
          fileList: [...state.fileList, file],
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
