import { Col, Row } from "antd";
import React from "react";

const SchoolDetailReview = () => {
  return (
    <div
      style={{
        backgroundColor: "#F2F2F2",
        paddingTop: "1rem",
        boxSizing: "border-box",
        paddingBottom: "1rem",
      }}
    >
      <Row gutter={[16, 16]} style={{ boxSizing: "border-box", justifyContent: "center" }}>
        <Col span={12}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              height: "10rem",
              marginBottom: "1rem",
            }}
          >
            학교 별점
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              height: "20rem",
            }}
          >
            한줄평
          </div>
        </Col>

        <Col span={10}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              height: "31rem",
            }}
          >
            뭐할까
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SchoolDetailReview;
