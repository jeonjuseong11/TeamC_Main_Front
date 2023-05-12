import React from "react";
import { Col, Row } from "antd";
import {
  OneLineReviewWrapper,
  ReviewDetailWrapper,
  SubPageWrapper,
  StarRateWrapper,
} from "./SchoolDetailStyle";

const SchoolDetailReview = () => {
  return (
    <SubPageWrapper>
      <Row gutter={[16, 16]} style={{ justifyContent: "center" }}>
        <Col span={8}>
          <StarRateWrapper>학교 별점</StarRateWrapper>
          <ReviewDetailWrapper>상세 리뷰</ReviewDetailWrapper>
        </Col>
        <Col span={6}>
          <OneLineReviewWrapper>한줄평</OneLineReviewWrapper>
        </Col>
      </Row>
    </SubPageWrapper>
  );
};

export default SchoolDetailReview;
