import { Col, Row } from "antd";
import React from "react";
import BoardMenu from "../../components/Board/BoardMenu";

const SchoolBoardDetail = () => {
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={14}>
          <BoardMenu />
        </Col>
      </Row>
      글 상세 페이지
      <Row gutter={[16, 16]} justify="center"></Row>
    </>
  );
};
export default SchoolBoardDetail;
