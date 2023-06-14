import { Avatar, Button, Col, Input, List, Menu, Row, Space, Tag } from "antd";
import BoardMain from "../../components/Board/BoardMain";
import BoardMainSearchInput from "../../components/Board/BoardMainSearchInput";
import BoardMainList from "../../components/Board/BoardMainList";
import { NavLink, Outlet } from "react-router-dom";
import {
  CommentOutlined,
  EditOutlined,
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import SearchForm from "../../components/SearchForm";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const SchoolBoard = () => {
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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const sortedData = [...data]; // Create a copy of the data array

  if (sortOrder === "latest") {
    sortedData.sort((a, b) => {
      return new Date(b.createDate) - new Date(a.createDate);
    });
  } else if (sortOrder === "most-liked") {
    sortedData.sort((a, b) => {
      return b.good - a.good;
    });
  }
  const handleSortOrder = (order) => {
    setSortOrder((prevOrder) => (prevOrder === order ? "" : order));
  };

  return (
    <div>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={23} md={15}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2>커뮤니티</h2>
            <Button
              type="primary"
              style={{ width: "10rem", height: "3rem", display: "inline-block" }}
            >
              글쓰기
              <EditOutlined />
            </Button>
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
            <h3 style={{ marginTop: "0", textAlign: "left" }}>하이웨이 Top user</h3>
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
        <Col xs={23} md={11}>
          <Input
            placeholder="궁금한 내용을 찾아보세요"
            style={{ borderRadius: "50px", padding: "1rem", marginBottom: "1rem" }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setSearchText([e.target.value]);
                setFilterValue(searchText);
              }
            }}
            prefix={<SearchOutlined style={{ color: "black" }} />}
          />
          <div style={{ textAlign: "left" }}>
            <Button
              type="text"
              style={{
                borderRadius: "50px",
                background: sortOrder === "latest" ? "#8282ff" : "transparent",
                color: sortOrder === "latest" ? "white" : "black",
              }}
              onClick={() => handleSortOrder("latest")}
            >
              최신순
            </Button>
            <Button
              type="text"
              style={{
                borderRadius: "50px",
                background: sortOrder === "most-liked" ? "#8282ff" : "transparent",
                color: sortOrder === "most-liked" ? "white" : "black",
              }}
              onClick={() => handleSortOrder("most-liked")}
            >
              좋아요 많은순
            </Button>
          </div>

          <List
            itemLayout="vertical"
            size="large"
            dataSource={sortedData}
            grid={{
              gutter: 0,
              column: 2,
            }}
            renderItem={(item, index) => (
              <div
                style={{
                  marginTop: "1rem",
                  borderTop: "1px solid #f2f2f2",
                  padding: "1rem",
                }}
              >
                <List.Item
                  key={item.title}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    textAlign: "left",
                    borderRadius: "10px",
                    padding: "1rem",
                    alignItems: "center",
                    background: hoveredItem === index ? "#f5f5f5" : "transparent",
                    transition: "background 0.3s",
                  }}
                  actions={[
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}
                >
                  <List.Item.Meta title={item.title} description={item.content} />
                </List.Item>
              </div>
            )}
          />
        </Col>
        {/* <Outlet /> */}
      </Row>
      {/* <Row gutter={[16, 16]} justify="center">
        <BoardMainSearchInput />
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
        <BoardMain />
      </Row>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "1rem" }}>
        <BoardMainList />
      </Row> */}
    </div>
  );
};

export default SchoolBoard;
