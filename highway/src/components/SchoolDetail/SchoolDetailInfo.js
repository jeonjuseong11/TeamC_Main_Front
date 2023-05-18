import { Col, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { FrequentAsked, QuestionWrapper, SubPageWrapper } from "./SchoolDetailStyle";

const SchoolDetailInfo = () => {
  const { schoolId, tags } = useParams();
  const schools = useSelector((state) => state.school.schools);
  const schoolDeparts = schools[schoolId - 1].tags;
  const [departsList, setDepartsList] = useState([]);

  return (
    <SubPageWrapper>
      <Row
        gutter={[16, 16]}
        xgutter={[16]}
        style={{ justifyContent: "center", marginBottom: "1rem" }}
      >
        <Col span={4}>
          <QuestionWrapper style={{ textAlign: "left", padding: "2rem" }}>
            <h3>학교 정보</h3>
            <h4>주소</h4>
            <h4>연락처</h4>
            <h4>계열</h4>
            <h4>산업군</h4>
            <h4>홈페이지</h4>
          </QuestionWrapper>
        </Col>
        <Col span={10}>
          <QuestionWrapper>
            학과
            {/* <Tabs items={schoolDeparts}>
              <Tags.TabPane tab={item} key={item}></Tags.TabPane>;
            </Tabs> */}
          </QuestionWrapper>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
        <Col span={14}>
          <FrequentAsked>취업 / 진학</FrequentAsked>
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailInfo;
