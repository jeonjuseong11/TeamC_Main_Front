import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Menu, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const location = useLocation();

  const data = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  return (
    <div style={{ backgroundColor: "#f2f2f2", height: "100%" }}>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={24} md={4}>
          <Menu
            className="custom-menu"
            selectedKeys={location.pathname}
            style={{
              paddingBottom: "1rem",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
              <Avatar size={100} icon={<UserOutlined />} />
              <h2 style={{ marginTop: "2rem" }}>{me?.userName} 님</h2>
            </div>
            <Menu.Item key="/profile">
              <NavLink to="/profile">회원 정보</NavLink>
            </Menu.Item>
            <Menu.Item key="/profile/recentrecord">
              <NavLink to="/profile/recentrecord">나의 관심</NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default UserProfile;
