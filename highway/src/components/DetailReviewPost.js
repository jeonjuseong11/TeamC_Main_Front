import React, { useCallback, useEffect, useState } from "react";
import { Form, Rate, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SCHOOL_REVIEW_REQUEST,
  UPDATE_SCHOOL_REVIEW_REQUEST,
  LOAD_SCHOOL_REVIEWS_REQUEST,
} from "../constants/actionTypes";
import axios from "axios";

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

const DetailReviewForm = ({ setWrite, review, editing, setEditing, setEditContent }) => {
  const { schoolId } = useParams();
  const { me } = useSelector((state) => state.user);
  // console.log(review);
  // Form instance with form hook
  const [form] = Form.useForm();

  // State to manage messages for each rate category
  const [trafficMessage, setTrafficMessage] = useState("평가해주세요.");
  const [facilityMessage, setFacilityMessage] = useState("평가해주세요.");
  const [cafeteriaMessage, setCafeteriaMessage] = useState("평가해주세요.");
  const [educationMessage, setEducationMessage] = useState("평가해주세요.");
  const [employmentMessage, setEmploymentMessage] = useState("평가해주세요.");

  // Function to handle rate change for each category
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

  // Function to get the message based on the rate value
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

  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = useCallback(
    (values) => {
      if (me.schoolId === schoolId) {
        if (editing) {
          // When in edit mode, dispatch update review action
          dispatch({
            type: UPDATE_SCHOOL_REVIEW_REQUEST,
            data: {
              id: review.id,
              author: me.userId,
              tags: "디자인",
              content: values.content,
              trafficRate: values.trafficRate,
              facilityRate: values.facilityRate,
              cafeteriaRate: values.cafeteriaRate,
              educationRate: values.educationRate,
              employmentRate: values.employmentRate,
              schoolId: schoolId,
            },
          });
          setEditing(false); // Disable edit mode
          setEditContent("");
        } else {
          // When not in edit mode, dispatch add review action
          dispatch({
            type: ADD_SCHOOL_REVIEW_REQUEST,
            data: {
              author: me.userId,
              tags: "디자인",
              content: values.content,
              trafficRate: values.trafficRate,
              facilityRate: values.facilityRate,
              cafeteriaRate: values.cafeteriaRate,
              educationRate: values.educationRate,
              employmentRate: values.employmentRate,
              schoolId: schoolId,
            },
          });
        }
        form.setFieldsValue(""); // Clear form fields
        setWrite(false); // Close write mode
      } else {
        alert("현재 학교는 본인의 학교가 아닙니다.");
      }
    },
    [form, me, schoolId, setWrite, dispatch, editing, review]
  );

  useEffect(() => {
    // When a review is provided (entered edit mode), set the form fields with the review data
    if (review) {
      form.setFieldsValue({
        content: review.content,
        secretContent: review.secretContent,
        trafficRate: review.trafficRate,
        facilityRate: review.facilityRate,
        cafeteriaRate: review.cafeteriaRate,
        educationRate: review.educationRate,
        employmentRate: review.employmentRate,
      });
    }
  }, [form, review]);

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
        <Form.Item name="trafficRate" rules={[{ required: true }]} style={{ margin: "0" }}>
          <Rate onChange={(value) => handleRateChange("trafficRate", value)} />
        </Form.Item>
        <MessageWrapper>{trafficMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>시설만족도</FormItemP>
        <Form.Item name="facilityRate" rules={[{ required: true }]} style={{ margin: "0" }}>
          <Rate onChange={(value) => handleRateChange("facilityRate", value)} />
        </Form.Item>
        <MessageWrapper>{facilityMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>급식</FormItemP>
        <Form.Item name="cafeteriaRate" rules={[{ required: true }]} style={{ margin: "0" }}>
          <Rate onChange={(value) => handleRateChange("cafeteriaRate", value)} />
        </Form.Item>
        <MessageWrapper>{cafeteriaMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>교육</FormItemP>
        <Form.Item name="educationRate" rules={[{ required: true }]} style={{ margin: "0" }}>
          <Rate onChange={(value) => handleRateChange("educationRate", value)} />
        </Form.Item>
        <MessageWrapper>{educationMessage}</MessageWrapper>
      </FormItemWrapper>
      <FormItemWrapper>
        <FormItemP>취업</FormItemP>
        <Form.Item name="employmentRate" rules={[{ required: true }]} style={{ margin: "0" }}>
          <Rate onChange={(value) => handleRateChange("employmentRate", value)} />
        </Form.Item>
        <MessageWrapper>{employmentMessage}</MessageWrapper>
      </FormItemWrapper>
      <Form.Item style={{ float: "right", marginTop: "1rem" }}>
        <Button htmlType="submit" type="primary">
          {editing ? "리뷰 수정" : "리뷰 작성"}
          {/* Show "리뷰 수정" button when in edit mode */}
        </Button>
        <Button
          style={{ marginLeft: "1rem" }}
          onClick={() => {
            setWrite(false);
            setEditing(false);
            setEditContent("");
          }}
        >
          취소
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailReviewForm;
