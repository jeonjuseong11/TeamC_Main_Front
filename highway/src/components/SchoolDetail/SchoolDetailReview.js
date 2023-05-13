import React from "react";
import { Col, Rate, Row } from "antd";
import { ReviewDetailWrapper, SubPageWrapper, StarRateWrapper } from "./SchoolDetailStyle";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneLineReview from "./OneLineReview";

const SchoolDetailReview = () => {
  const { school } = useSelector((state) => state.school);
  const schoolId = useParams();
  const StarRate = school[schoolId.schoolId - 1].rate;
  const totalRate =
    (StarRate.trafficRate +
      StarRate.facilityRate +
      StarRate.cafeteriaRate +
      StarRate.educationRate +
      StarRate.employmentRate) /
    5;
  return (
    <SubPageWrapper>
      <Row
        gutter={[16, 16]}
        style={{ justifyContent: "center" }}
        // grid={{ gutter: 8, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      >
        <Col xs={22} md={8} style={{ minWidth: "30rem" }}>
          <StarRateWrapper>
            <div style={{ width: "60%" }}>
              <p>전체 리뷰 통계</p>
              <h1 style={{ fontSize: "3rem", fontWeight: "500" }}>{totalRate}</h1>
              <Rate
                disabled
                defaultValue={totalRate}
                allowHalf
                style={{
                  fontSize: "2rem",
                }}
              />
            </div>
            <div
              style={{
                width: "40%",
                display: "inline-block",
                paddingTop: "1rem",
                paddingLeft: "1rem",
              }}
            >
              <p style={{ margin: "0" }}>교통</p>
              <Rate
                disabled
                allowHalf
                defaultValue={StarRate.trafficRate}
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              />
              <p style={{ margin: "0" }}>시설만족도</p>
              <Rate
                disabled
                allowHalf
                defaultValue={StarRate.facilityRate}
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              />
              <p style={{ margin: "0" }}>급식</p>
              <Rate
                disabled
                allowHalf
                defaultValue={StarRate.cafeteriaRate}
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              />
              <p style={{ margin: "0" }}>수업만족도</p>
              <Rate
                disabled
                allowHalf
                defaultValue={StarRate.educationRate}
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              />
              <p style={{ margin: "0" }}>취업</p>
              <Rate
                disabled
                allowHalf
                defaultValue={StarRate.employmentRate}
                style={{
                  alignItems: "center",
                  fontSize: "1rem",
                }}
              />
            </div>
          </StarRateWrapper>
          <ReviewDetailWrapper>상세 리뷰</ReviewDetailWrapper>
        </Col>
        <Col xs={22} md={6} style={{ minWidth: "25rem" }}>
          <OneLineReview />
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailReview;
