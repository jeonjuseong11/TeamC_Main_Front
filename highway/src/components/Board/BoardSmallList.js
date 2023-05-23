import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const BoardSmallList = ({ data }) => {
  return (
    <List
      style={{ textAlign: "left", marginLeft: "1rem" }}
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
          style={{ marginLeft: "1rem", height: "5rem", alignItems: "center" }}
          actions={[
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span>
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
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />
  );
};

export default BoardSmallList;
