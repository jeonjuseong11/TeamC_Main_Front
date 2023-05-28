import {
  HeartOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Col, List, Menu, Row } from "antd";
import BoardMenu from "../../components/Board/BoardMenu";
import { IconText } from "../../components/Card/CardStyle";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
  "Los Angeles battles huge wildfires111.",
];
const items = [
  {
    label: "인기게시판",
    key: "app",
  },
  {
    label: "자유게시판",
    key: "SubMenu",
  },
];
const SchoolBoardList = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const schoolId = useParams();
  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  return (
    <>
      <Row justify="center">
        <Col xs={24} md={14}>
          <BoardMenu />
        </Col>
        <Col xs={24} md={14} style={{ marginTop: "-2rem" }}>
          <Menu mode="horizontal" items={items} />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "1rem", textAlign: "left" }}>
        <Col xs={24} md={14}>
          <List
            itemLayout="vertical"
            size="large"
            grid={{
              gutter: 0,
              column: 2,
            }}
            dataSource={data}
            renderItem={(item, idx) => (
              <List.Item
                style={{
                  marginTop: "-1rem",
                  borderBottom: "1px solid #ccc",
                  padding: "1rem",
                  height: "10rem",
                  background: hoveredItem === item ? "#f0f0f0" : "transparent",
                }}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
                key={item.title}
                actions={[
                  <div style={{ position: "relative" }}>
                    <IconText
                      icon={HeartOutlined}
                      text="156"
                      key="list-vertical-star-o"
                    />
                  </div>,
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
              >
                <Link to={`/schoolboard/${schoolId.schoolId}/list/${idx + 1}`}>
                  <List.Item.Meta
                    title={"글제목" + item.title}
                    description={item}
                  />
                </Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
export default SchoolBoardList;
