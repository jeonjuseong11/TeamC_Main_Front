import { Col, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  FrequentAsked,
  QuestionWrapper,
  SubPageWrapper,
} from "./SchoolDetailStyle";

const SchoolDetailInfo = () => {
  const { schoolId, tags } = useParams();
  const schools = useSelector((state) => state.school.schools);
  const school = schools[schoolId - 1];
  console.log(school);
  const schoolDeparts = schools[schoolId - 1].tags;
  const [departsList, setDepartsList] = useState([]);

  return (
    <SubPageWrapper>
      <Row
        justify="center"
        gutter={[16, 16]}
        xgutter={[16]}
        style={{ marginBottom: "1rem" }}
      >
        <Col xs={22} md={6}>
          <QuestionWrapper style={{ textAlign: "left", padding: "2rem" }}>
            <h3>학교 정보</h3>
            <h4>주소</h4>
            <p>{school.schul_RDNMA}</p>
            <h4>연락처</h4>
            <p>{school.user_TELNO}</p>
            <h4>계열</h4>
            <h4>산업군</h4>
            <h4>홈페이지</h4>
            <a href={school.hmpg_ADRES}>{school.hmpg_ADRES}</a>
          </QuestionWrapper>
        </Col>
        <Col xs={22} md={8}>
          <QuestionWrapper>학과</QuestionWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={22} md={14}>
          <FrequentAsked>취업 / 진학</FrequentAsked>
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailInfo;
