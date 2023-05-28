import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import { List, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const BoardMiddleList = ({ data }) => {
  return (
    <List
      style={{ textAlign: "left" }}
      header={
        <>
          <span style={{ fontSize: "1.2rem", marginLeft: "1rem" }}>인기글</span>
          <Link to="/" style={{ float: "right" }}>
            <span>더보기</span>
          </Link>
        </>
      }
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ marginLeft: "1rem", alignItems: "center" }}
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

export default BoardMiddleList;
