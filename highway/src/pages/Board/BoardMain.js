import { LikeOutlined, MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, List, Space } from "antd";
import React, { useState } from "react";
import { data } from "../SchoolBoard";
import moment from "moment";
import { IconText } from "../../components/Card/CardStyle";

const formatDate = (dateString) => {
  const currentTime = moment();
  const targetTime = moment(dateString);
  const duration = moment.duration(currentTime.diff(targetTime));

  if (duration.asSeconds() < 60) {
    return "방금 전";
  } else if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes}분 전`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `${hours}시간 전`;
  } else if (duration.asDays() < 2) {
    return "어제";
  } else if (duration.asMonths() < 1) {
    const days = Math.floor(duration.asDays());
    return `${days}일 전`;
  } else {
    const months = Math.floor(duration.asMonths());
    return `${months}달 전`;
  }
};
const BoardMain = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const sortedData = [...data];

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
    <Col xs={24} md={11}>
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
                <IconText icon={LikeOutlined} text={item.good} key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta title={item.title} description={item.content} />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  textAlign: "right",
                  color: "#a2a2a2",
                }}
              >
                {formatDate(item.createDate)}
              </div>
            </List.Item>
          </div>
        )}
      />
    </Col>
  );
};

export default BoardMain;