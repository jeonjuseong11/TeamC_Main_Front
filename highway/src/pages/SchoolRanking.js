import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Table } from "antd";

import RankSchoolCard from "../components/RankSchoolCard";
import RankSelector from "../components/RankSelector";

const SchoolRanking = () => {
  const { schools, schoolReviews } = useSelector((state) => state.school);
  const [rankData, setRankData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현
    // 예시로 더미 데이터
    const dummyData = [
      {
        id: 1,
        schul_NM: "OO1고등학교", //학교 이름
        rank: 1, //랭크
        // reviews: 10, //리뷰 수
        members: 10, //재학생 회원 수
        male: 100, //남자 학생수
        female: 120, //여자 학생 수
        views: 10, //학교 조회수
        hmpg_ADRES: "http://daejindesign.sen.hs.kr7", //학교 홈페이지
        tags: ["전자", "IT", "디자인"], //학교 태그
      },
    ];
    const copiedData = schools.slice();
    const rankedData = copiedData.map((item, index) => ({
      ...item,
      rank: index + 1,
      views: Math.floor(Math.random() * 101), //더미데이터 생성
      male: Math.floor(Math.random() * 101), //더미데이터 생성
      female: Math.floor(Math.random() * 101), //더미데이터 생성
      reviews: schoolReviews.length,
    }));
    setRankData(rankedData);
  }, []);
  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
  };
  const handleFilterValueChange = (value) => {
    setFilterValue(value);
  };

  const filteredData = rankData.filter((item) => {
    if (filterValue == "") {
      return true;
    }
    return item.tags.some((tag) => filterValue.includes(tag));
  });
  useEffect(() => {
    if (selectedSchool == null) {
      setSelectedSchool(filteredData[0]);
    }
  }, [filteredData]);
  useEffect(() => {
    setSelectedSchool(filteredData[0]);
  }, [filterValue]);
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
    // {
    //   title: "리뷰 수",
    //   dataIndex: "reviews",
    //   key: "reviews",
    //   render: (reviews) => reviews,
    // },
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
          <RankSelector setFilterValue={handleFilterValueChange} />
        </Col>
      </Row>
      <Row gutter={[24, 24]} justify="center" style={{ textAlign: "left", marginTop: "1rem" }}>
        <Col xs={24} md={10} flex="auto">
          <Table
            style={{ minWidth: "14rem" }}
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            rowClassName={rowClassName}
            rowKey={(record) => record.id}
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
