import { Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LOAD_SCHOOL_INFO_REQUEST } from "../../constants/actionTypes";
import SchoolDetailReview from "./SchoolDetailReview";
import { QuestionWrapper, SubPageWrapper } from "./SchoolDetailStyle";

const SchoolDetailInfo = ({ rateAverages, roundedTotalRate, reviewCount }) => {
  const { singleSchool } = useSelector((state) => state.school);
  const [departsList, setDepartsList] = useState([]);

  useEffect(() => {
    const departs = singleSchool?.dept;
    const updatedDepartsList = departs?.map((v, idx) => ({
      key: `${idx}`,
      label: `${v.deptName}`,
      children: `${v.description}`,
    }));
    setDepartsList(updatedDepartsList);
  }, [singleSchool]);

  const [activeTab, setActiveTab] = useState("0");

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <SubPageWrapper>
      <Row justify="center" gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
        <Col xs={22} md={6} style={{ minWidth: "15rem" }}>
          <QuestionWrapper style={{ textAlign: "left", padding: "2rem" }}>
            <h3 style={{ margin: "0" }}>학교 정보</h3>
            <h4>주소</h4>
            <p>{singleSchool?.sch?.schoolStreetAddress}</p>
            <h4>연락처</h4>
            <p style={{ margin: "0" }}>{singleSchool?.sch?.telephoneNumber}</p>
            {singleSchool?.sch?.administrationPhoneNumber == -1 ? null : (
              <p style={{ margin: "0" }}>{singleSchool?.sch?.administrationPhoneNumber}(행정실)</p>
            )}
            {singleSchool?.sch?.officePhoneNumber == -1 ? null : (
              <p style={{ margin: "0" }}>{singleSchool?.sch?.officePhoneNumber}(교무실)</p>
            )}
            <h4>홈페이지</h4>
            <a
              style={{ color: "black", textDecoration: "none" }}
              href={singleSchool?.sch?.websiteAddress}
            >
              {singleSchool?.sch?.websiteAddress}
            </a>
          </QuestionWrapper>
        </Col>
        <Col xs={22} md={9} style={{ minWidth: "30rem" }}>
          <QuestionWrapper style={{ padding: "2rem", textAlign: "left" }}>
            <h3 style={{ margin: "0" }}>학과소개</h3>
            <Tabs activeKey={activeTab} onChange={onChange} items={departsList} />
          </QuestionWrapper>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]} justify="center">
        <Col xs={22} md={14}>
          <SchoolDetailJob />
        </Col>
      </Row> */}
      <SchoolDetailReview
        reviewCount={reviewCount}
        rateAverages={rateAverages}
        roundedTotalRate={roundedTotalRate}
      />
    </SubPageWrapper>
  );
};

export default SchoolDetailInfo;
