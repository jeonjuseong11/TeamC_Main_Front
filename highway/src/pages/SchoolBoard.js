import { Avatar, Button, Col, List, Menu, Row } from "antd";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { EditOutlined, SearchOutlined, SmileOutlined, TeamOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { needLoginError } from "../utils/Message";
export const data = [
  {
    id: 1,
    title: "User1",
    good: 1,
  },
  {
    id: 2,
    title: "User2",
    good: 2,
  },
];
const SchoolBoard = () => {
  const { category } = useParams();
  const location = useLocation();
  const [title, setTItle] = useState("커뮤니티");
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const tag = [
    { id: 1, departs: "IT" },
    { id: 2, departs: "디자인" },
  ];
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
        <Col xs={23} md={15}>
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
          {/* <div
            style={{
              border: "1px solid #f2f2f2",
              borderRadius: "10px",
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            <h3 style={{ marginTop: "0", textAlign: "left" }}>하이웨이 Top user</h3> */}
          {/* <List
              className="custom-list"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={
                      <p
                        style={{
                          marginTop: "0.4rem",
                          marginLeft: "1rem",
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          textAlign: "left",
                        }}
                      >
                        {item.title}
                      </p>
                    }
                  />
                  <p
                    style={{
                      marginTop: "0.4rem",
                      marginLeft: "1rem",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                    }}
                  >
                    {item.good}
                  </p>
                </List.Item>
              )}
            /> */}
          {/* </div> */}
        </Col>
        <Outlet />
      </Row>
    </div>
  );
};

export default SchoolBoard;
