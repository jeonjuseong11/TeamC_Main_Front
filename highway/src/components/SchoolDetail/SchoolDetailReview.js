import React, { useEffect, useRef } from "react";
import { Col, Rate, Row } from "antd";
import { SubPageWrapper, StarRateWrapper } from "./SchoolDetailStyle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneLineReview from "./OneLineReview";
import ReviewDetail from "../ReviewDetail";

const SchoolDetailReview = () => {
  const targetRef = useRef(null);
  const adjustRef = useRef(null);

  useEffect(() => {
    const targetHeight = targetRef.current.clientHeight;
    adjustRef.current.style.height = targetHeight + "px";
  }, []);

  const { schools } = useSelector((state) => state.school);
  const dispatch = useDispatch();
  const schoolId = useParams();
  const StarRate = schools[schoolId.schoolId - 1].totalRate;
  const totalStarRate =
    (StarRate.trafficRate +
      StarRate.facilityRate +
      StarRate.cafeteriaRate +
      StarRate.educationRate +
      StarRate.employmentRate) /
    5;
  return (
    <SubPageWrapper>
      <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
        <Col xs={22} md={10} style={{ minWidth: "30rem" }} ref={targetRef}>
          <StarRateWrapper>
            <div style={{ width: "60%" }}>
              <p>전체 리뷰 통계</p>
              <h1 style={{ fontSize: "3rem", fontWeight: "500" }}>{totalStarRate}</h1>
              <Rate
                disabled
                defaultValue={totalStarRate}
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
          <ReviewDetail />
        </Col>
        <Col xs={22} md={4} style={{ minWidth: "15rem" }} ref={adjustRef}>
          <OneLineReview />
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailReview;
