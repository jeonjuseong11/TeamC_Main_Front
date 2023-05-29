import React from "react";
import { SearchOutlined } from "@ant-design/icons";

import BoardMiddleList from "../../components/Board/BoardMiddleList";
import BoardSmallList from "../../components/Board/BoardSmallList";
import { Col, Input, Row } from "antd";

export const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const BoardMain = () => {
  return (
    <>
      <Col xs={24} md={10}>
        <BoardMiddleList data={data} />
      </Col>
      <Col xs={24} md={4}>
        <div
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: "10px",
            height: "20rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Hot topic(조회수 기준 순위)
        </div>
      </Col>
    </>
  );
};
export default BoardMain;
