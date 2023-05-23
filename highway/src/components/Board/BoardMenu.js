import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const BoardMenu = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu onClick={onClick} mode="horizontal" style={{ gap: "1rem" }}>
      <h1 style={{ margin: "0", padding: "1rem", paddingLeft: "0" }}>학교게시판</h1>
      <Menu.Item style={{ padding: "1rem" }}>
        <Link to="/">홈</Link>
      </Menu.Item>
      <Menu.Item style={{ padding: "1rem" }}>
        <Link to="/">게시판</Link>
      </Menu.Item>
      <Menu.Item style={{ padding: "1rem" }}>
        <Link to="/">인기글</Link>
      </Menu.Item>
    </Menu>
  );
};

export default BoardMenu;
