import React from "react";

import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import Meta from "antd/es/card/Meta";
import { CardItem, IconText, ListWrapper, TagsItem } from "./CardStyle";
import { Link } from "react-router-dom";

const School = [
  {
    id: 1,
    name: "학교 이름1",
    descript: "학교 랭킹1",
    tags: ["IT", "미디어"],
    comments: [
      {
        id: 1,
        content: "hello",
      },
      {
        id: 2,
        content: "hello",
      },
      {
        id: 1,
        content: "hello",
      },
      {
        id: 2,
        content: "hello",
      },
    ],
    good: 10,
    followList: ["1", "2"],
  },
  {
    id: 2,
    name: "학교 이름2",
    descript: "학교 랭킹2",
    tags: ["IT", "체육"],
    comments: [],
    good: 9,
    followList: ["1", "2"],
  },
  {
    id: 3,
    name: "학교 이름3",
    descript: "학교 랭킹3",
    tags: ["전자", "디자인"],
    comments: [],
    good: 1,
    followList: ["1", "2"],
  },
  {
    id: 4,
    name: "학교 이름4",
    descript: "학교 랭킹4",
    tags: ["경영", "회계"],
    comments: [
      {
        id: 1,
        content: "hello",
      },
      {
        id: 2,
        content: "hello",
      },
      {
        id: 4,
        content: "hello",
      },
      {
        id: 1,
        content: "hello",
      },
    ],
    good: 5,
    followList: ["1", "2"],
  },
  {
    id: 5,
    name: "학교 이름5",
    descript: "학교 랭킹5",
    tags: ["회계", "경영"],
    comments: [
      {
        id: 1,
        content: "hello",
      },
      {
        id: 2,
        content: "hello",
      },
    ],
    good: 15,
    followList: ["1", "2"],
  },
];
const CardList = () => {
  return (
    <ListWrapper>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={School}
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
                <Meta
                  description={
                    <CardItem>
                      {item.tags.map((v, idx) => {
                        return <TagsItem key={idx}>{v}</TagsItem>;
                      })}
                    </CardItem>
                  }
                />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </ListWrapper>
  );
};

export default CardList;
