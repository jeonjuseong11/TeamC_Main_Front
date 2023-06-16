import React, { useState } from "react";
import { Form, Input, Button, Upload, message, Modal, Row, Col, Select } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
const BoardPostForm = () => {
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
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={15} style={{ textAlign: "left", marginTop: "1rem", padding: "1rem" }}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item>
              <Select
                placeholder="게시판 종류"
                style={{
                  width: "30%",
                  borderRadius: "0",
                }}
              />
              <Select
                placeholder="관련 태그"
                style={{
                  width: "30%",
                  borderRadius: "0",
                  marginLeft: "1rem",
                }}
              />
            </Form.Item>
            <Form.Item name="title">
              <Input className="custom-input" placeholder="제목을 입력해주세요" style={{}} />
            </Form.Item>
            <Form.Item name="content">
              <TextArea
                rows={10}
                style={{ resize: "none", padding: "1rem" }}
                placeholder="
                    글의 내용을 입력해주세요 &#13;&#10;주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되어 일정 수
                    이상 신고를 받는 경우 글이 블라인드 처리될 수 있습니다.
                "
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
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "10rem", height: "3rem", borderRadius: "50px", float: "right" }}
              >
                완료 <EditOutlined />
              </Button>
            </Form.Item>
            <Form.Item></Form.Item>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
              <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default BoardPostForm;
