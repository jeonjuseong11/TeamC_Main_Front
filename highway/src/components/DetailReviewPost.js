import { Form, Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { produce } from "immer";
import { useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";
const FormItemWrapper = styled.div`
  display: flex;
  width: 100%;
  line-height: 2.3rem;
`;
const FormItemP = styled.p`
  margin: 0px;
  width: 30%;
`;
const MessageWrapper = styled.div`
  margin-left: 1rem;
`;
const DetailReviewForm = () => {
  const [form] = Form.useForm();
  const { addCommentLoading } = useSelector((state) => state.post);
  const [detailReviews, setDetailReview] = useState([]);
  const [trafficMessage, setTrafficMessage] = useState("");
  const [facilityMessage, setFacilityMessage] = useState("");
  const [cafeteriaMessage, setCafeteriaMessage] = useState("");
  const [educationMessage, setEducationMessage] = useState("");
  const [employmentMessage, setEmploymentMessage] = useState("");

  const handleRateChange = (name, value) => {
    const message = getMessage(value);
    switch (name) {
      case "trafficRate":
        setTrafficMessage(message);
        break;
      case "facilityRate":
        setFacilityMessage(message);
        break;
      case "cafeteriaRate":
        setCafeteriaMessage(message);
        break;
      case "educationRate":
        setEducationMessage(message);
        break;
      case "employmentRate":
        setEmploymentMessage(message);
        break;
      default:
        break;
    }
  };
  const getMessage = (value) => {
    if (value === 1) {
      return "매우 나쁨";
    } else if (value === 2) {
      return "나쁨";
    } else if (value === 3) {
      return "보통";
    } else if (value === 4) {
      return "좋음";
    } else if (value === 5) {
      return "매우 좋음";
    } else {
      return "";
    }
  };

  useEffect(() => {}, [detailReviews]);
  const handleSubmit = (values) => {
    // console.log(values);
    if (!values) {
      alert("빈칸이 있습니다.");
      return;
    }
    setDetailReview(
      produce(detailReviews, (draft) => {
        draft.push({
          author: "sss",
          avatar: "없음",
          tags: "디자인",
          content: values.content,
          secretContent: values.secretContent,
          datetime: moment().fromNow(),
          rate: {
            trafficRate: values.trafficRate,
            facilityRate: values.facilityRate,
            cafeteriaRate: values.cafeteriaRate,
            educationRate: values.educationRate,
            employmentRate: values.employmentRate,
          },
        });
      })
    );
  };
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{ width: "100%", textAlign: "left" }}
    >
      <h2 style={{ textAlign: "left", marginTop: "0" }}>리뷰작성</h2>
      <FormItemP>학교의 리뷰</FormItemP>
      <Form.Item rules={[{ required: true }]} name="content">
        <TextArea style={{ resize: "none", width: "100%" }} />
      </Form.Item>
      <FormItemP>못다한 이야기</FormItemP>
      <Form.Item rules={[{ required: true }]} name="secretContent">
        <TextArea style={{ resize: "none", width: "100%" }} />
      </Form.Item>
      <FormItemWrapper>
        <FormItemP>교통</FormItemP>
        <Form.Item
          name="trafficRate"
          rules={[{ required: true }]}
          style={{ margin: "0" }}
        >
          <Rate onChange={(value) => handleRateChange("trafficRate", value)} />
        </Form.Item>
        <MessageWrapper>{trafficMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>시설만족도</FormItemP>
        <Form.Item
          name="facilityRate"
          rules={[{ required: true }]}
          style={{ margin: "0" }}
        >
          <Rate onChange={(value) => handleRateChange("facilityRate", value)} />
        </Form.Item>
        <MessageWrapper>{facilityMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>급식</FormItemP>
        <Form.Item
          name="cafeteriaRate"
          rules={[{ required: true }]}
          style={{ margin: "0" }}
        >
          <Rate
            onChange={(value) => handleRateChange("cafeteriaRate", value)}
          />
        </Form.Item>
        <MessageWrapper>{cafeteriaMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>수업만족도</FormItemP>
        <Form.Item
          name="educationRate"
          rules={[{ required: true }]}
          style={{ margin: "0" }}
        >
          <Rate
            onChange={(value) => handleRateChange("educationRate", value)}
          />
        </Form.Item>
        <MessageWrapper>{educationMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>취업</FormItemP>
        <Form.Item
          name="employmentRate"
          rules={[{ required: true }]}
          style={{ margin: "0" }}
        >
          <Rate
            onChange={(value) => handleRateChange("employmentRate", value)}
          />
        </Form.Item>
        <MessageWrapper>{employmentMessage}</MessageWrapper>
      </FormItemWrapper>
      <Form.Item style={{ float: "right", marginTop: "1rem" }}>
        <Button htmlType="submit" loading={addCommentLoading} type="primary">
          리뷰 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailReviewForm;
