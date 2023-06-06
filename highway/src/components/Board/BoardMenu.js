import { Col, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LOGOUT_REQUEST } from "../../constants/actionTypes";
import { NoDecoLink } from "../../styles/PageStyle";

const BoardMenu = () => {
  const { schoolId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { me } = useSelector((state) => state.user);
  const localRefreshToken = localStorage.getItem("REFRESHTOKEN");
  useEffect(() => {
    if (!localRefreshToken) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
  }, [me, navigate]);
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} md={14}>
        <Menu mode="horizontal" style={{ gap: "1rem" }}>
          <NoDecoLink to={`/schoolboard/${schoolId}`}>
            <h1 style={{ margin: "0", padding: "1rem", paddingLeft: "0" }}>학교게시판</h1>
          </NoDecoLink>
          <Menu.Item style={{ padding: "1rem" }}>
            <Link to={`/schoolboard/${schoolId}`}>홈</Link>
          </Menu.Item>
          <Menu.Item style={{ padding: "1rem" }}>
            <Link to={`/schoolboard/${schoolId}/list`}>게시판</Link>
          </Menu.Item>
          <Menu.Item style={{ padding: "1rem" }}>
            <Link to="/">인기글</Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default BoardMenu;
