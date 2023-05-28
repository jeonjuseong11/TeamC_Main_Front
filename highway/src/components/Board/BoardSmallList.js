import { CommentOutlined, EyeOutlined, HeartOutlined } from "@ant-design/icons";
import { List } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const BoardSmallList = ({ data }) => {
  return (
    <List
      style={{ textAlign: "left" }}
      header={
        <>
          <span style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>유머</span>
          <Link to="/" style={{ float: "right", lineHeight: "2rem" }}>
            <span>더보기</span>
          </Link>
        </>
      }
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ marginLeft: "1rem", alignItems: "center" }}
          actions={[
            <span style={{ display: "flex" }}>
              <EyeOutlined /> {3}
            </span>,
          ]}
        >
          {item}
        </List.Item>
      )}
    />
  );
};

export default BoardSmallList;
