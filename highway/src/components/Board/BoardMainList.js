import React from "react";
import BoardSmallList from "./BoardSmallList";
import { Col } from "antd";
import { data } from "./BoardMain";
const BoardMainList = () => {
  return (
    <>
      <Col md={4}></Col>
      <Col xs={24} md={5} style={{ textAlign: "left" }}>
        <BoardSmallList data={data} />
      </Col>
      <Col xs={24} md={5} style={{ textAlign: "left" }}>
        <BoardSmallList data={data} />
      </Col>
    </>
  );
};
export default BoardMainList;
