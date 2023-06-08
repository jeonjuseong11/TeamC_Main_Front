import { Col, Row, Tabs } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SchoolDetailReview from "./SchoolDetailReview";
import { QuestionWrapper, SubPageWrapper } from "./SchoolDetailStyle";

const SchoolDetailInfo = () => {
  const { schoolId } = useParams();
  const schools = useSelector((state) => state.school.schools);
  const school = schools[schoolId - 1];
  // console.log(school);
  const [departsList, setDepartsList] = useState([]);
  school.departs.map((v, idx) => {
    departsList.push({
      key: `${idx}`,
      label: `${v.depart}`,
      children: `${v.description}`,
    });
    return departsList;
  });
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <SubPageWrapper>
      <Row justify="center" gutter={[24, 24]} style={{ marginBottom: "1rem" }}>
        <Col xs={22} md={6} style={{ minWidth: "15rem" }}>
          <QuestionWrapper style={{ textAlign: "left", padding: "2rem" }}>
            <h3 style={{ margin: "0" }}>학교 정보</h3>
            <h4>주소</h4>
            <p>{school.schul_RDNMA}</p>
            <h4>연락처</h4>
            <p style={{ margin: "0" }}>{school.user_TELNO}</p>
            <p style={{ margin: "0" }}>{school.USER_TELNO_SW}(교무실)</p>
            <p style={{ margin: "0" }}>{school.USER_TELNO_GA}(행정실)</p>
            <h4>홈페이지</h4>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href={school.hmpg_ADRES}
            >
              {school.hmpg_ADRES}
            </a>
          </QuestionWrapper>
        </Col>
        <Col xs={22} md={9} style={{ minWidth: "30rem" }}>
          <QuestionWrapper style={{ padding: "2rem", textAlign: "left" }}>
            <h3 style={{ margin: "0" }}>학과소개</h3>
            <Tabs
              defaultActiveKey="0"
              items={departsList}
              onChange={onChange}
            />
          </QuestionWrapper>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]} justify="center">
        <Col xs={22} md={14}>
          <SchoolDetailJob />
        </Col>
      </Row> */}
      <SchoolDetailReview />
    </SubPageWrapper>
  );
};

export default SchoolDetailInfo;
