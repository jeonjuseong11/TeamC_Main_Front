import { SearchOutlined } from "@ant-design/icons";
import { Col, Input } from "antd";
import React from "react";

const BoardMainSearchInput = () => {
  return (
    <>
      <Col xs={24} md={10}>
        <Input
          style={{
            float: "left",
            height: "3.5rem",
            borderRadius: "50px",
            marginTop: "2rem",
          }}
          prefix={<SearchOutlined />}
          placeholder="관심있는 내용을 검색해보세요"
        />
      </Col>
      <Col xs={24} md={4}>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            marginTop: "2rem",
            borderRadius: "10px",
            height: "5rem",
          }}
        >
          광고
        </div>
      </Col>
    </>
  );
};
export default BoardMainSearchInput;
