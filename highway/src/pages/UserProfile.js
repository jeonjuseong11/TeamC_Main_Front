import { UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Menu, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const access = localStorage.getItem("ACCESSTOKEN");
  useEffect(() => {
    if (access === null) {
      navigate("/");
    }
  }, [me]);
  const renderUserRole = () => {
    if (me?.userRole === 1) {
      return " 학생";
    } else if (me?.userRole === 2) {
      return " 부모님";
    } else if (me?.userRole === 3) {
      return " 선생님";
    } else {
      return "";
    }
  };
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={24} md={4}>
          <div
            style={{
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "10px",
              minWidth: "12rem",
            }}
          >
            <Avatar size={100} icon={<UserOutlined />} />
            <h2 style={{ marginTop: "2rem" }}>
              {me?.userName}
              {renderUserRole()}
            </h2>
            <h4 style={{ paddingTop: "1rem" }}>{me?.schoolName}</h4>
            <table style={{ marginTop: "1rem", width: "90%", height: "10rem", margin: "0 auto" }}>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>{me?.userId}</td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>{me?.userEmail}</td>
                </tr>
                <tr>
                  <th>성별</th>
                  <td>{me?.userGender}</td>
                </tr>
                <tr>
                  <th>소속학교</th>
                  <td>{me?.schoolName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <Menu.Item key="/profile">
              <NavLink to="/profile">회원 정보</NavLink>
            </Menu.Item>
            <Menu.Item key="/profile/recentrecord">
              <NavLink to="/profile/recentrecord">나의 관심</NavLink>
            </Menu.Item> */}
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default UserProfile;
