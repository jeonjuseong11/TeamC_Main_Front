import { StarOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, List, Menu, Row, Segmented } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardList from "../components/Card/CardList";
import { CardItem, IconText } from "../components/Card/CardStyle";
import DepartsTags from "../components/DepartsTags";

const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  const { schools } = useSelector((state) => state.school);
  const [selection, setSelection] = useState("학교");
  const data = [1, 2, 3, 4, 1, 1, 1, 1, 11, 1111, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <Row gutter={[16, 16]} justify="center" style={{ paddingTop: "1rem" }}>
        <Col xs={24} md={4}>
          <div style={{ borderRadius: "10px", backgroundColor: "white" }}>
            <Menu style={{ paddingBottom: "1rem", borderRadius: "10px" }}>
              <div style={{ marginBottom: "2rem" }}>
                <Avatar size={100} icon={<UserOutlined />} style={{ margin: "2rem" }} />
                <h2>유저 닉네임 님</h2>
              </div>
              <Menu.Item>회원 정보</Menu.Item>
              <Menu.Item>나의 관심</Menu.Item>
              <Menu.Item>최근 기록</Menu.Item>
            </Menu>
          </div>
        </Col>
        <Col xs={24} md={11}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "left",
              padding: "2rem",
            }}
          >
            <h3>최근 본 {selection}</h3>
            최근 본 {selection}은 가장 마지막으로 본 5개까지 볼 수 있습니다.
            <div>
              <Segmented
                block
                options={["학교", "게시물"]}
                value={selection}
                style={{ width: "100%" }}
                onChange={setSelection}
              />

              <List
                style={{ marginTop: "1rem" }}
                itemLayout="horizontal"
                dataSource={schools}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 5,
                  align: "center",
                }}
                grid={{ gutter: 12, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 5 }}
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
                                  text={item.reviews.length}
                                  key="list-vertical-star-o"
                                />
                                <IconText
                                  icon={UserOutlined}
                                  text={item.members.length}
                                  key="list-vertical-message"
                                />
                              </CardItem>
                            }
                          />
                          <Meta title={<DepartsTags schoolInfo={item} />} />
                        </Card>
                      </Link>
                    </Col>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={11}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "left",
              padding: "2rem",
            }}
          >
            <h3 style={{ margin: "0" }}>내가 작성한 게시물</h3>
          </div>
        </Col>
        <Col xs={24} md={11}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              textAlign: "left",
              padding: "2rem",
            }}
          >
            <h3 style={{ margin: "0" }}>회원 정보</h3>
            <p>이름</p> <p>닉네임</p> <p>이메일</p> <p>성별</p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
