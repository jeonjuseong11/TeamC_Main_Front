import React, { useEffect, useRef } from "react";
import { Col, Rate, Row } from "antd";
import { SubPageWrapper, StarRateWrapper } from "./SchoolDetailStyle";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneLineReview from "./OneLineReview";
import ReviewDetail from "../ReviewDetail";

const SchoolDetailReview = () => {
  const { schools } = useSelector((state) => state.school);
  const { schoolId } = useParams();
  // console.log(schoolId);
  const school = schools[schoolId - 1];
  console.log(school);

  const totalStarRate =
    (school.trafficRate +
      school.facilityRate +
      school.cafeteriaRate +
      school.educationRate +
      school.employmentRate) /
    5;
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={22} md={10} style={{ minWidth: "30rem" }}>
        <StarRateWrapper>
          <div style={{ width: "60%" }}>
            <p>전체 리뷰 통계</p>
            {totalStarRate === 0 ? (
              <p style={{ fontSize: "1rem" }}>리뷰가 없습니다.</p>
            ) : (
              <>
                <h1 style={{ fontSize: "3rem", fontWeight: "500" }}>
                  {totalStarRate}
                </h1>
                <Rate
                  disabled
                  defaultValue={totalStarRate}
                  allowHalf
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </>
            )}
          </div>
          <div
            style={{
              display: "inline-block",
              paddingTop: "1rem",
              paddingLeft: "3rem",
              lineHeight: "1.1rem",
            }}
          >
            <p style={{ margin: "0" }}>교통</p>
            <Rate
              disabled
              allowHalf
              defaultValue={school.trafficRate}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>시설만족도</p>
            <Rate
              disabled
              allowHalf
              defaultValue={school.facilityRate}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>급식</p>
            <Rate
              disabled
              allowHalf
              defaultValue={school.cafeteriaRate}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>수업만족도</p>
            <Rate
              disabled
              allowHalf
              defaultValue={school.educationRate}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>취업</p>
            <Rate
              disabled
              allowHalf
              defaultValue={school.employmentRate}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
          </div>
        </StarRateWrapper>
        <ReviewDetail />
      </Col>
      <Col xs={22} md={5} style={{ minWidth: "15rem" }}>
        <OneLineReview />
      </Col>
    </Row>
  );
};

export default SchoolDetailReview;
