import React from "react";
import AppLayout from "../components/AppLayout";
import { Col, List, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
const SchoolRanking = () => {
  const data = [
    { rank: 1, name: "OO1고등학교", review: 10 },
    { rank: 2, name: "OO2고등학교", review: 8 },
    { rank: 3, name: "OO3고등학교", review: 15 },
    { rank: 4, name: "OO4고등학교", review: 11 },
    { rank: 5, name: "OO5고등학교", review: 1 },
  ];
  return (
    <AppLayout>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={15}>
          <div style={{ textAlign: "left", padding: "1rem" }}>
            <h2 style={{ margin: "0" }}>학교 랭킹</h2>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ textAlign: "left" }}>
        <Col xs={4} md={4} flex="auto" style={{ minWidth: "14rem" }}>
          <div style={{ minWidth: "14rem" }}>
            <h4 style={{ fontWeight: "600" }}>시설이 좋아요</h4>
            <List
              bordered
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: "600" }}>
                        {item.rank}. {item.name}
                      </span>
                    }
                  />
                  <div>{item.review}리뷰</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={4} md={4} flex="auto" style={{ minWidth: "14rem" }}>
          <div>
            <h4 style={{ fontWeight: "600" }}>급식이 맛있어요</h4>
            <List
              bordered
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: "600" }}>
                        {item.rank}. {item.name}
                      </span>
                    }
                  />
                  <div>{item.review}리뷰</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col xs={4} md={4} flex="auto" style={{ minWidth: "14rem" }}>
          <div>
            <h4 style={{ fontWeight: "600" }}>수업이 전문적이에요</h4>
            <List
              bordered
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span style={{ fontWeight: "600" }}>
                        {item.rank}. {item.name}
                      </span>
                    }
                  />
                  <div>{item.review}리뷰</div>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </AppLayout>
  );
};

export default SchoolRanking;
