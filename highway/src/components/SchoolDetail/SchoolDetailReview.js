import React, { useEffect, useState } from "react";
import { Col, Rate, Row } from "antd";
import { StarRateWrapper } from "./SchoolDetailStyle";
import OneLineReview from "./OneLineReview";
import ReviewDetail from "../ReviewDetail";

const SchoolDetailReview = ({ reviewCount, rateAverages, roundedTotalRate }) => {
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={22} md={10} style={{ minWidth: "30rem" }}>
        <StarRateWrapper>
          <div style={{ width: "60%" }}>
            <p>전체 리뷰 통계 ({reviewCount})</p>
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
                  value={roundedTotalRate}
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
              value={rateAverages.traffic}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>시설만족도</p>
            <Rate
              disabled
              allowHalf
              value={rateAverages.facility}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>급식</p>
            <Rate
              disabled
              allowHalf
              value={rateAverages.cafeteria}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>수업만족도</p>
            <Rate
              disabled
              allowHalf
              value={rateAverages.education}
              style={{
                alignItems: "center",
                fontSize: "1rem",
              }}
            />
            <p style={{ margin: "0" }}>취업</p>
            <Rate
              disabled
              allowHalf
              value={rateAverages.employment}
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
        {/* <OneLineReview /> */}
      </Col>
    </Row>
  );
};

export default SchoolDetailReview;
