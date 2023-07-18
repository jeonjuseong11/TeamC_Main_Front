import { Button, Col, Menu, Row } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { EditOutlined, SearchOutlined, SmileOutlined, TeamOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { needLoginError } from "../utils/Message";

const SchoolBoard = () => {
  const { category } = useParams();
  const location = useLocation();
  const [title, setTItle] = useState("커뮤니티");
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (category == "0") {
      setTItle("자유게시판");
    } else if (category == "1") {
      setTItle("질문게시판");
    } else if (category == "2") {
      setTItle("프로젝트 모집");
    }
  }, [category]);
  // useEffect(() => {
  //   console.log(me);
  // }, [me]);

  const menuItems = [
    {
      key: "/schoolboard/0",
      icon: <SmileOutlined />,
      label: "자유게시판",
      onClick: () => navigate("/schoolboard/0"),
    },
    {
      key: "/schoolboard/1",
      icon: <SearchOutlined />,
      label: "질문게시판",
      onClick: () => navigate("/schoolboard/1"),
    },
    {
      key: "/schoolboard/2",
      icon: <TeamOutlined />,
      label: "프로젝트 모집",
      onClick: () => navigate("/schoolboard/2"),
    },
    {
      key: "/schoolboard/10",
      icon: <TeamOutlined />,
      label: "잼민",
      onClick: () => navigate("/schoolboard/10"),
    },
    ...(me?.tag
      ? me.tag.map((t) => ({
          key: `/schoolboard/${t.tagCode}`,
          label: `${t.tagName} 커뮤니티`,
          onClick: () => navigate(`/schoolboard/${t.tagCode}`),
        }))
      : []),
  ];

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={24} md={15}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1 style={{ margin: "0", marginLeft: "1rem" }}>{title}</h1>
            {/* <Link to="/schoolboard/post"> */}
            <Button
              onClick={() => {
                if (me === null) {
                  needLoginError("글쓰기는 로그인 후에 가능합니다.", navigate);
                  return;
                } else {
                  navigate("/schoolboard/post");
                }
              }}
              type="primary"
              style={{
                width: "10rem",
                height: "3rem",
                display: "inline-block",
                borderRadius: "50px",
              }}
            >
              글쓰기
              <EditOutlined />
            </Button>
            {/* </Link> */}
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={24} md={4}>
          <Menu
            className="custom-menu"
            selectedKeys={location.pathname}
            style={{
              paddingBottom: "1rem",
              border: "0",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
            items={menuItems}
          />
          <div
            style={{
              backgroundColor: "#f2f2f2",
              padding: "1rem",
              borderRadius: "10px",
              fontWeight: "500",
              color: "#a1a1a1",
            }}
          >
            커뮤니티는 학교별 태그에 따라 생겨요
          </div>
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default SchoolBoard;
