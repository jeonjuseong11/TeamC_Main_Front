import { Avatar, Col, List, Menu, Row } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SchoolBoardMenu = () => {
  const data = [
    {
      id: 1,
      title: "제목",
      content: "내용",
      category: 0,
      createDate: "2023-06-14T17:01:59.744865",
      modifiedDate: "2023-06-14T17:01:59.744865",
      good: 1,
    },
    {
      id: 2,
      title: "제목2",
      content: "내용2",
      category: 0,
      createDate: "2023-06-19T17:01:59.744865",
      modifiedDate: "2023-06-19T17:01:59.744865",
      good: 2,
    },
    {
      id: 3,
      title: "제목3",
      content: "내용3",
      category: 0,
      createDate: "2023-06-19T17:01:59.744865",
      modifiedDate: "2023-06-19T17:01:59.744865",
      good: 3,
    },
    {
      id: 4,
      title: "제목4",
      content: "내용4",
      category: 0,
      createDate: "2023-06-19T17:01:59.744865",
      modifiedDate: "2023-06-19T17:01:59.744865",
      good: 4,
    },
  ];
  const location = useLocation();
  return (
    <>
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
        >
          <Menu.Item key="/schoolboard">
            <NavLink to="">전체</NavLink>
          </Menu.Item>
          <Menu.Item key="/schoolboard/free">
            <NavLink to="">😀 자유게시판</NavLink>
          </Menu.Item>
          <Menu.Item key="/schoolboard/question">
            <NavLink to="">고민게시판</NavLink>
          </Menu.Item>
          <Menu.Item key="/schoolboard/popular">
            <NavLink to="">인기글</NavLink>
          </Menu.Item>
          <Menu.Item key="/schoolboard/projects">
            <NavLink to="">프로젝트 모집</NavLink>
          </Menu.Item>
        </Menu>
        <div
          style={{
            border: "1px solid #f2f2f2",
            borderRadius: "10px",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <h3 style={{ marginTop: "0", textAlign: "left" }}>
            하이웨이 Top user
          </h3>
          <List
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
                  {item.count}
                </p>
              </List.Item>
            )}
          />
        </div>
      </Col>
    </>
  );
};

export default SchoolBoardMenu;
