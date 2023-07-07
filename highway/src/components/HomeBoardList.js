import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Col, List, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changeCategory } from "../pages/Board/BoardMain";
import { IconText } from "./Card/CardStyle";

const HomeBoardList = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const { category } = useParams();
  return (
    <Row justify="center" gutter={[16, 16]} style={{ marginTop: "1rem", textAlign: "left" }}>
      <Col xs={24} md={15} style={{ marginBottom: "2rem" }}>
        <h3>Highway 커뮤니티에 물어보세요</h3>
        <p style={{ fontSize: "1.5rem" }}>자유게시판</p>
        <List
          size="large"
          dataSource={schoolBoardPosts.slice(0, 4)}
          itemLayout="horizontal"
          grid={{
            gutter: 0,
            column: 2,
          }}
          renderItem={(item, index) => (
            <div
              style={{
                borderTop: "1px solid #f2f2f2",
                padding: "1rem",
              }}
            >
              {/* <Link to={`/schoolboard/${item.category}/${item.id}`}> */}
              {/* 카테고리를 주소에 첨부할지 말지는 아직 고민중 */}
              <Link to={`/schoolboard/${item.category}/${item.id}`}>
                <List.Item
                  key={item.title}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    textAlign: "left",
                    borderRadius: "10px",
                    alignItems: "center",
                    padding: "1rem",
                    background: hoveredItem === index ? "#f5f5f5" : "transparent",
                    transition: "background 0.3s",
                  }}
                >
                  <List.Item.Meta title={item.title} description={item.content} />
                </List.Item>
              </Link>
            </div>
          )}
        />
      </Col>
    </Row>
  );
};

export default HomeBoardList;
