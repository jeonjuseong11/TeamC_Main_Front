import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Table } from "antd";

import RankSchoolCard from "../components/RankSchoolCard";
import RankSelector from "../components/RankSelector";

const SchoolRanking = () => {
  const { schools } = useSelector((state) => state.school);
  const [rankData, setRankData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현
    // 예시로 더미 데이터
    const dummyData = [
      {
        id: 1,
        name: "OO1고등학교",
        reviews: 10,
        members: 10,
        male: 100,
        female: 120,
        views: 10,
        hmpg_ADRES: "http://daejindesign.sen.hs.kr7", //학교 홈페이지
        tags: ["전자", "IT", "디자인"],
      },
    ];
    const copiedData = schools.slice();
    const sortedData = copiedData.sort(
      (a, b) => b.reviews.length - a.reviews.length
    );
    const rankedData = sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
      views: Math.floor(Math.random() * 101), //더미데이터 생성
      male: Math.floor(Math.random() * 101), //더미데이터 생성
      female: Math.floor(Math.random() * 101), //더미데이터 생성
    }));
    setRankData(rankedData);
    setSelectedSchool(rankedData[0]);
  }, []);
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
  };
  const filteredData = rankData.filter((item) => {
    if (filterValue === "") {
      return true;
    }
    // 여기서 필터링 조건을 설정합니다.
    // 예를 들어, "ooo"에 해당하는 데이터만 필터링하려면 item.tags === "Value 1"과 같이 설정합니다.
    return item.tags.includes(filterValue);
  });

  const columns = [
    {
      title: "랭킹",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "학교 명",
      dataIndex: "schul_NM",
      key: "schul_NM",
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
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews) => reviews.length,
    },
    {
      title: "유저 수",
      dataIndex: "members",
      key: "members",
      render: (members) => members.length,
    },
  ];
  const rowClassName = (record) => {
    if (selectedSchool && selectedSchool.schul_NM === record.schul_NM) {
      return "selected-row";
    }
    return "";
  };
  return (
    <>
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
        <Col xs={24} md={15}>
          <RankSelector setFilterValue={setFilterValue} />
        </Col>
      </Row>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{ textAlign: "left", marginTop: "1rem" }}
      >
        <Col xs={24} md={10} flex="auto">
          <Table
            style={{ minWidth: "14rem" }}
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            rowClassName={rowClassName}
          />
        </Col>
        <Col xs={24} md={5} flex="auto">
          {selectedSchool && <RankSchoolCard selectedSchool={selectedSchool} />}
        </Col>
      </Row>
    </>
  );
};

export default SchoolRanking;
