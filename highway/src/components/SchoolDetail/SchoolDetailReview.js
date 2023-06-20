import React, { useEffect } from "react";
import { Col, Rate, Row } from "antd";
import { StarRateWrapper } from "./SchoolDetailStyle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OneLineReview from "./OneLineReview";
import ReviewDetail from "../ReviewDetail";
import { LOAD_SCHOOL_REVIEWS_REQUEST } from "../../constants/actionTypes";

const SchoolDetailReview = () => {
  const { schoolReviews, loadSchoolReviewsLoading } = useSelector((state) => state.school);
  const { schoolId } = useParams();
  const dispatch = useDispatch();

  const loadSchoolReviews = () => {
    dispatch({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: schoolId,
    });
  };
  useEffect(() => {
    loadSchoolReviews();
  }, []);

  const reviewCount = schoolReviews.length;

  const rateSums = {
    traffic: 0,
    facility: 0,
    cafeteria: 0,
    education: 0,
    employment: 0,
  };

  for (let i = 0; i < reviewCount; i++) {
    const { trafficRate, facilityRate, cafeteriaRate, educationRate, employmentRate } =
      schoolReviews[i];

    rateSums.traffic += trafficRate;
    rateSums.facility += facilityRate;
    rateSums.cafeteria += cafeteriaRate;
    rateSums.education += educationRate;
    rateSums.employment += employmentRate;
  }

  const rateAverages = {
    traffic: rateSums.traffic / reviewCount,
    facility: rateSums.facility / reviewCount,
    cafeteria: rateSums.cafeteria / reviewCount,
    education: rateSums.education / reviewCount,
    employment: rateSums.employment / reviewCount,
  };

  const totalRate =
    (rateAverages.traffic +
      rateAverages.facility +
      rateAverages.cafeteria +
      rateAverages.education +
      rateAverages.employment) /
    5;

  const roundedTotalRate = Math.round(totalRate * 2) / 2;

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={22} md={10} style={{ minWidth: "30rem" }}>
        <StarRateWrapper>
          <div style={{ width: "60%" }}>
            <p>전체 리뷰 통계</p>
            {reviewCount === 0 ? (
              <p style={{ fontSize: "1rem" }}>리뷰가 없습니다.</p>
            ) : (
              <>
                <h1 style={{ fontSize: "3rem", fontWeight: "500" }}>
                  {roundedTotalRate.toFixed(1)}
                </h1>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={Math.round(roundedTotalRate * 2) / 2}
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
              defaultValue={3} //{Math.round(rateAverages.traffic * 2) / 2}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>시설만족도</p>
            <Rate
              disabled
              allowHalf
              defaultValue={3} //{Math.round(rateAverages.facility * 2) / 2}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>급식</p>
            <Rate
              disabled
              allowHalf
              defaultValue={3} //{Math.round(rateAverages.cafeteria * 2) / 2}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>수업만족도</p>
            <Rate
              disabled
              allowHalf
              defaultValue={3} //{Math.round(rateAverages.education * 2) / 2}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>취업</p>
            <Rate
              disabled
              allowHalf
              defaultValue={3} //{Math.round(rateAverages.employment * 2) / 2}
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
