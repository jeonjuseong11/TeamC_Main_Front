import { Form, Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/ko"; //한국어 적용
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_REVIEW_REQUEST } from "../constants/actionTypes";
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
const DetailReviewForm = ({ setWrite }) => {
  const { schoolId } = useParams();
  const { schools } = useSelector((state) => state.school);
  const reviews = schools[schoolId - 1].reviews;
  const [form] = Form.useForm();
  // console.log(detailReviews);
  const dispatch = useDispatch();
  //별점 메시지를 위한 state
  const [trafficMessage, setTrafficMessage] = useState("평가해주세요.");
  const [facilityMessage, setFacilityMessage] = useState("평가해주세요.");
  const [cafeteriaMessage, setCafeteriaMessage] = useState("평가해주세요.");
  const [educationMessage, setEducationMessage] = useState("평가해주세요.");
  const [employmentMessage, setEmploymentMessage] = useState("평가해주세요.");

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

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);
  const handleSubmit = useCallback(
    (values) => {
      // console.log(values);
      if (!values) {
        alert("빈칸이 있습니다.");
        return;
      }

      dispatch({
        type: ADD_REVIEW_REQUEST,
        data: {
          values: {
            id: reviews.length + 1,
            author: "sss",
            tags: ["디자인"],
            content: values.content,
            secretContent: values.secretContent,
            datetime: moment(),
            rate: {
              trafficRate: values.trafficRate,
              facilityRate: values.facilityRate,
              cafeteriaRate: values.cafeteriaRate,
              educationRate: values.educationRate,
              employmentRate: values.employmentRate,
            },
          },
          schoolId: schoolId,
        },
      });

      form.setFieldsValue = "";
      setWrite(false);
    },
    [schoolId]
  );

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      style={{ width: "100%", textAlign: "left", marginBottom: "3rem" }}
    >
      <h2 style={{ textAlign: "left", marginTop: "0" }}>리뷰작성</h2>
      <FormItemP>학교의 리뷰</FormItemP>
      <Form.Item rules={[{ required: true }]} name="content">
        <TextArea
          style={{ resize: "none", width: "100%" }}
          placeholder="100자 이내로 입력해주세요."
          maxLength={100}
        />
      </Form.Item>
      <FormItemP>못다한 이야기</FormItemP>
      <Form.Item rules={[{ required: true }]} name="secretContent">
        <TextArea
          style={{ resize: "none", width: "100%" }}
          placeholder="100자 이내로 입력해주세요."
          maxLength={100}
        />
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
        <Button htmlType="submit" type="primary">
          리뷰 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailReviewForm;
