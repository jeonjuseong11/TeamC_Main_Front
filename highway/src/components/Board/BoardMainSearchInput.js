import { SearchOutlined } from "@ant-design/icons";
import { Col, Input } from "antd";
import React from "react";

const BoardMainSearchInput = () => {
  return (
    <Col xs={24} md={10}>
      <Input
        style={{
          height: "3.5rem",
          borderRadius: "50px",
          marginTop: "2rem",
        }}
        prefix={<SearchOutlined />}
        placeholder="관심있는 내용을 검색해보세요"
      />
    </Col>
  );
};
export default BoardMainSearchInput;
