import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button, Upload, Modal, Row, Col, Select } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ADD_POST_REQUEST } from "../../constants/actionTypes";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { info, needLoginError } from "../../utils/Message";

const { TextArea } = Input;

const BoardPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addPostLoading } = useSelector((state) => state.post);
  const [form] = Form.useForm();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { me } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem("ACCESSTOKEN");

  useEffect(() => {
    // 새로고침 시 로컬 스토리지에서 로그인 정보 가져오기
    if (accessToken) {
    } else {
      navigate(-1);
    }
  }, [navigate, accessToken]);
  const boardPost = useCallback(
    (values) => {
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title: values.title,
          content: values.content.replace(/\r?\n/g, "<br>"),
          category: values.category,
          schoolId: me.schoolId,
        },
      });
      navigateToHomeBoard(values.category);
    },
    [dispatch]
  );

  const navigateToHomeBoard = useCallback(
    (category) => {
      navigate(`/schoolboard/${category}`);
    },
    [navigate]
  );

  const onFinish = (values) => {
    // console.log(values);
    boardPost(values);
  };

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

  const [options, setOptions] = useState();
  useEffect(() => {
    if (me?.tag) {
      const newOptions = [
        { value: 0, label: "자유게시판" },
        { value: 1, label: "질문게시판" },
        { value: 2, label: "프로젝트 모집" },
        ...me.tag.map((tag) => ({ value: tag.tagCode, label: tag.tagName })),
      ];
      setOptions(newOptions);
    }
  }, [me]);

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} md={15} style={{ textAlign: "left", marginTop: "1rem", padding: "1rem" }}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="category">
            <Select
              placeholder="게시판 종류"
              style={{
                width: "30%",
                borderRadius: "0",
              }}
              options={options}
            />
          </Form.Item>
          <Form.Item name="title">
            <Input className="custom-input" placeholder="제목을 입력해주세요" />
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
          {/* <Form.Item name="photo">
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
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "10rem", height: "3rem", borderRadius: "50px", float: "right" }}
              loading={addPostLoading}
            >
              완료 <EditOutlined />
            </Button>
          </Form.Item>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Form>
      </Col>
    </Row>
  );
};

export default BoardPostForm;
