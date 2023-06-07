import React, { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Avatar, Card, Col, List, Row, Table } from "antd";
import {
  EyeOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import RankSelector, { RankTopic } from "../components/RankSelector";

const SchoolRanking = () => {
  const [rankData, setRankData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현
    // 예시로 더미 데이터 사용
    const dummyData = [
      { name: "OO1고등학교", review: 10, user: 10, view: 10 },
      { name: "OO2고등학교", review: 8, user: 8, view: 8 },
      { name: "OO3고등학교", review: 15, user: 15, view: 12 },
      { name: "OO4고등학교", review: 11, user: 11, view: 11 },
      { name: "OO5고등학교", review: 1, user: 1, view: 1 },
      { name: "OO6고등학교", review: 2, user: 2, view: 2 },
      { name: "OO7고등학교", review: 3, user: 3, view: 3 },
      { name: "OO8고등학교", review: 4, user: 4, view: 4 },
      { name: "OO9고등학교", review: 5, user: 5, view: 5 },
      { name: "O10고등학교", review: 6, user: 6, view: 6 },
      { name: "O11고등학교", review: 9, user: 9, view: 9 },
      { name: "O12고등학교", review: 14, user: 14, view: 14 },
      { name: "O13고등학교", review: 13, user: 13, view: 13 },
      { name: "O14고등학교", review: 12, user: 12, view: 12 },
      { name: "O15고등학교", review: 19, user: 19, view: 19 },
      // ...
    ];
    const sortedData = dummyData.sort((a, b) => b.review - a.review);
    const rankedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
    setRankData(rankedData);
    setSelectedSchool(rankedData[0]);
  }, []);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
  };

  const columns = [
    {
      title: "랭킹",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "학교 명",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a
          style={{
            textDecoration: "none",
            color: "black",
          }}
          onClick={() => handleSchoolSelect(record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "리뷰 수",
      dataIndex: "review",
      key: "review",
    },
    {
      title: "유저 수",
      dataIndex: "user",
      key: "user",
    },
  ];
  const rowClassName = (record) => {
    if (selectedSchool && selectedSchool.name === record.name) {
      return "selected-row";
    }
    return "";
  };
  return (
    <AppLayout>
      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={15}>
          <div
            style={{
              backgroundColor: "#f2f2f2",
              padding: "2rem",
              borderRadius: "10px",
              marginTop: "1rem",
            }}
          >
            <h2>Highway Ranking</h2>
            <p>새로운 특성화고 랭킹 서비스</p>
          </div>
        </Col>
        {/* <Col xs={24} md={15}>
            <h2 style={{ margin: "0", textAlign: "left" }}>Highway 랭킹</h2>
          </Col> */}
        <RankSelector />
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={15} offset={9}>
          <div style={{ lineHeight: "0.5rem", paddingTop: "0.7rem" }}>
            <span style={{ marginLeft: "8.5rem" }}>리뷰 평정순 |</span> <span>조회수 순 |</span>{" "}
            <span>리뷰 많은 거</span>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ textAlign: "left", marginTop: "1rem" }}>
        <Col xs={24} md={10} flex="auto" style={{ minWidth: "14rem" }}>
          <Table
            columns={columns}
            dataSource={rankData}
            pagination={false}
            rowClassName={rowClassName}
          />
        </Col>
        <Col xs={24} md={5} flex="auto">
          {selectedSchool && (
            <Card
              style={{ backgroundColor: "#f2f2f2" }}
              actions={[
                <div>
                  <SearchOutlined /> 상세 정보 보기
                </div>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar size={64}>학교로고</Avatar>}
                title={selectedSchool.name}
                description={
                  <div>
                    <p style={{ margin: "0" }}>
                      {" "}
                      <ProfileOutlined style={{ marginRight: "0.5rem" }} />
                      리뷰 수 {selectedSchool.review}
                    </p>
                    <p style={{ margin: "0" }}>
                      <UserOutlined style={{ marginRight: "0.5rem" }} />
                      사용자 수 {selectedSchool.user}
                    </p>
                    <p style={{ margin: "0" }}>
                      <EyeOutlined style={{ marginRight: "0.5rem" }} />
                      조회 수 {selectedSchool.view}
                    </p>
                  </div>
                }
              />
            </Card>
          )}
        </Col>
      </Row>
    </AppLayout>
  );
};

export default SchoolRanking;
