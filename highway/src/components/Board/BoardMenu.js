import { Avatar, Button, Menu } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const BoardMenu = () => {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  const { me } = useSelector((state) => state.user);

  const navigate = useNavigate();
  return (
    <>
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
      {me == null ? (
        <Avatar
          style={{ float: "right", position: "relative", top: "-3.5rem", marginLeft: "1rem" }}
        >
          ddd
        </Avatar>
      ) : (
        <Button
          style={{ float: "right", position: "relative", top: "-3.5rem" }}
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
      )}
      <Button style={{ float: "right", position: "relative", top: "-3.5rem" }}>글쓰기</Button>
    </>
  );
};

export default BoardMenu;
