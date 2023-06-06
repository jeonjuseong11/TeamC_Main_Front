import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Row, Col, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BoardProfile from "./BoardProfile";

const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const onFinish = (values) => {
  console.log("Received values of form:", values);
  // 여기에서 폼 데이터를 서버로 전송하거나 처리할 수 있습니다.
};
const PostForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("JPG/PNG 형식의 이미지 파일만 업로드 가능합니다!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("이미지 파일 크기는 2MB보다 작아야 합니다!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <>
      <Col xs={24} md={10}>
        <h2 style={{ fontWeight: "400" }}>글작성</h2>
        <Form form={form} onFinish={onFinish}>
          <Form.Item>
            <Select placeholder="게시판 종류" style={{ width: "50%" }} />
          </Form.Item>
          <Form.Item name="title">
            <Input placeholder="제목을 입력해주세요" style={{ padding: "0.5rem" }} />
          </Form.Item>
          <Form.Item name="content">
            <TextArea
              rows={10}
              style={{ resize: "none", padding: "1rem" }}
              placeholder="내용을 입력해주세요"
            />
          </Form.Item>
          <Form.Item name="photo">
            <label>사진</label>
            <Upload
              beforeUpload={beforeUpload}
              fileList={fileList}
              onChange={handleChange}
              onPreview={handlePreview}
              listType="picture-card"
            >
              {fileList.length >= 8 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "7rem", height: "3rem" }}>
              글 작성
            </Button>
            <Button
              onClick={() => navigate(-1)}
              style={{ marginLeft: "0.5rem", width: "7rem", height: "3rem" }}
              danger
            >
              취소
            </Button>
          </Form.Item>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form>
      </Col>
    </>
  );
};

export default PostForm;
