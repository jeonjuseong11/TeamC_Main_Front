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
          <div>
            <p style={{ margin: "0" }}>전체 리뷰 통계 ({reviewCount})</p>
            {reviewCount === 0 ? (
              <p style={{ fontSize: "1rem" }}>리뷰가 없습니다.</p>
            ) : (
              <>
                <h1
                  style={{
                    fontSize: "3rem",
                    fontWeight: "500",
                  }}
                >
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
              height: "100%",
              paddingLeft: "3rem",
              display: "flex",
              flexDirection: "column",
              width: "15rem",

              gap: "5px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", height: "2rem" }}>
              <h4 style={{ margin: "0", lineHeight: "2rem", fontWeight: "500" }}>교통</h4>
              <Rate disabled allowHalf value={rateAverages.traffic} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", height: "2rem" }}>
              <h4 style={{ margin: "0", lineHeight: "2rem", fontWeight: "500" }}>시설만족도</h4>
              <Rate disabled allowHalf value={rateAverages.facility} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", height: "2rem" }}>
              <h4 style={{ margin: "0", lineHeight: "2rem", fontWeight: "500" }}>급식</h4>
              <Rate disabled allowHalf value={rateAverages.cafeteria} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", height: "2rem" }}>
              <h4 style={{ margin: "0", lineHeight: "2rem", fontWeight: "500" }}>수업만족도</h4>
              <Rate disabled allowHalf value={rateAverages.education} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", height: "2rem" }}>
              <h4 style={{ margin: "0", lineHeight: "2rem", fontWeight: "500" }}>취업</h4>
              <Rate disabled allowHalf value={rateAverages.employment} />
            </div>
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
