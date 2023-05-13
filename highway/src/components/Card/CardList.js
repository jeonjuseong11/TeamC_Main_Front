import React from "react";

import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import Meta from "antd/es/card/Meta";
import { CardItem, IconText, ListWrapper, TagsItem } from "./CardStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DepartsTags from "../DepartsTags";

const CardList = () => {
  const { school } = useSelector((state) => state.school);
  return (
    <ListWrapper>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={school}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Link to={`/schooldetail/${item.id}/review`}>
              <Card
                hoverable
                bodyStyle={{
                  padding: "1rem",
                  textAlign: "left",
                }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta title={item.name} description={item.descript} />
                <Meta
                  description={
                    <CardItem>
                      <IconText
                        icon={StarOutlined}
                        text={item.followList.length}
                        key="list-vertical-star-o"
                      />
                      <IconText icon={LikeOutlined} text={item.good} key="list-vertical-like-o" />
                      <IconText
                        icon={MessageOutlined}
                        text={item.comments.length}
                        key="list-vertical-message"
                      />
                    </CardItem>
                  }
                />
                <Meta description={<DepartsTags schoolInfo={item} />} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </ListWrapper>
  );
};

export default CardList;
