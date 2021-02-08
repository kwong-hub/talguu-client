import React, { Component } from "react";
import { Upload, Modal, Button, message } from "antd";
import { FaPlus } from "react-icons/fa";
import videoService from "../../_services/video.service";
import ImgCrop from "antd-img-crop";
import { environment } from "../../config/config";
const intialState = {
  uploading: false,
  uploaded: false,
  previewVisible: false,
  previewImage: "",
  previewTitle: "",

  fileList: [
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ],
};
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export class Thumbnail extends Component {
  state = intialState;
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ fileList }) => {
    console.log("fileList", fileList);
    console.log("this.props", this.props);
    this.setState({ uploading: true });
    this.setState({ fileList });
  };
  successMessage = () => {
    message.success("Successfull Upload");
  };

  onUpload = () => {
    this.setState({ uploaded: true });
    var formData = new FormData();
    formData.append("id", this.props.video);
    formData.append("picture", this.state.fileList[1].originFileObj);
    videoService
      .addThumbnail(formData)
      .then((data) => {
        console.log("data", data);
        this.setState({ uploading: false, uploaded: false });
        this.successMessage();
      })
      .catch((err) => console.log("err", err));
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <FaPlus />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <ImgCrop rotate aspect={245 / 164}>
          <Upload
            
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            className="w-auto m-2"
          >
            {fileList.length >= 2 ? null : uploadButton}
          </Upload>
        </ImgCrop>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        {this.state.uploading && (
          <Button
            className="flex my-4 w-auto"
            type="primary"
            onClick={this.onUpload}
            loading={this.state.uploaded}
            style={{ marginTop: 16 }}
          >
            {this.state.uploaded ? "Uploading" : "Start Upload"}
          </Button>
        )}
      </>
    );
  }
}

export default Thumbnail;
