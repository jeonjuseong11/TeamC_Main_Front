import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { SubPageWrapper } from "./SchoolDetailStyle";

const QuestionWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  height: 20rem;
`;
const FrequentAsked = styled.div`
  background: white;
  border-radius: 10px;
  height: 20rem;
  width: 100%;
`;
const SchoolDetailQuestion = () => {
  return (
    <SubPageWrapper>
      <Row
        gutter={[16, 16]}
        xgutter={[16]}
        style={{ justifyContent: "center", marginBottom: "1rem" }}
      >
        <Col span={7}>
          <QuestionWrapper>본인 질문</QuestionWrapper>
        </Col>
        <Col span={7}>
          <QuestionWrapper>한줄평</QuestionWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
        <Col span={14}>
          <FrequentAsked>dkssud</FrequentAsked>
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailQuestion;
