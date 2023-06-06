import { Row } from "antd";
import React from "react";
import BoardMenu from "../../components/Board/BoardMenu";
import BoardPostForm from "../../components/Board/BoardPostForm";
import BoardProfile from "../../components/Board/BoardProfile";

const SchoolBoardPost = () => {
  return (
    <div style={{ textAlign: "left" }}>
      <BoardMenu />
      <Row gutter={[16, 16]} justify="center">
        <BoardProfile />
        <BoardPostForm />
      </Row>
    </div>
  );
};

export default SchoolBoardPost;
