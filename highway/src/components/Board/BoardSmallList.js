import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import { List } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NoDecoLink } from "../../styles/PageStyle";

const BoardSmallList = ({ data }) => {
  const { schoolId } = useParams();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <List
      bordered={false}
      style={{
        textAlign: "left",
        borderRadius: "10px",
        border: "1px solid #f2f2f2",
        padding: "1rem",
        backgroundColor: "white",
        marginBottom: "10vh",
      }}
      header={
        <>
          <span style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>자유게시판</span>
          <NoDecoLink to={`/schoolboard/list`} style={{ float: "right", marginRight: "1rem" }}>
            <span>더보기</span>
          </NoDecoLink>
        </>
      }
      dataSource={data}
      renderItem={(item, idx) => (
        <List.Item
          key={idx}
          style={{
            paddingLeft: "1rem",
            alignItems: "center",
            background: hoveredItem === item ? "#f0f0f0" : "transparent",
          }}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
          actions={[
            <div style={{ display: "inline-block" }}>
              <span style={{ marginRight: "1rem" }}>
                <CommentOutlined />
                {3}
              </span>
              <span>
                <HeartOutlined />
                {4}
              </span>
            </div>,
          ]}
        >
          {item}
        </List.Item>
      )}
    />
  );
};

export default BoardSmallList;
