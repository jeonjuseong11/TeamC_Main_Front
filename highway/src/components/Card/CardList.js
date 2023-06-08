import React from "react";

import { LikeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, List } from "antd";
import Meta from "antd/es/card/Meta";
import { CardItem, IconText, ListWrapper } from "./CardStyle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DepartsTags from "../DepartsTags";

const CardList = ({ filterValue }) => {
  const { schools } = useSelector((state) => state.school);
  const filtedSchool = schools.map((it) => {
    const schoolDeparts = it.tags;
    // console.log(schoolDeparts);
    const FiltedTag = schoolDeparts.map((item) => item.includes(filterValue));
    if (FiltedTag.includes(true)) {
      return it;
    }
  });
  const removeUndefinedList = filtedSchool.filter((it) => it !== undefined);
  return (
    <ListWrapper>
      <List
        grid={{ gutter: 8, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
        dataSource={removeUndefinedList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Col>
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
                  <Meta title={item.schul_NM} description={item.descript} />
                  <Meta
                    description={
                      <CardItem>
                        <IconText
                          icon={StarOutlined}
                          text={item.followList.length}
                          key="list-vertical-star-o"
                        />
                        <IconText
                          icon={LikeOutlined}
                          text={item.good}
                          key="list-vertical-like-o"
                        />
                        <IconText
                          icon={UserOutlined}
                          text={item.members.length}
                          key="list-vertical-message"
                        />
                      </CardItem>
                    }
                  />
                  <Meta description={<DepartsTags schoolInfo={item} />} />
                </Card>
              </Link>
            </Col>
          </List.Item>
        )}
      />
    </ListWrapper>
  );
};

export default CardList;
