import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table } from "antd";

import RankSchoolCard from "../components/RankSchoolCard";
import RankSelector from "../components/RankSelector";
import { LOAD_SCHOOL_LIST_REQUEST } from "../constants/actionTypes";

const SchoolRanking = () => {
  const { schools, schoolReviews } = useSelector((state) => state.school);
  const [rankData, setRankData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_SCHOOL_LIST_REQUEST,
    });
  }, []);
  useEffect(() => {
    // 데이터 가져오는 로직을 여기에 구현

    const copiedData = schools.slice();
    const rankedData = copiedData.map((item, index) => ({
      ...item,
      rank: index + 1,
      // views: Math.floor(Math.random() * 101), //더미데이터 생성
      reviews: schoolReviews.length,
    }));
    setRankData(rankedData);
  }, [schools]);
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
    return item.tag.some((tag) => filterValue.includes(tag));
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
      dataIndex: "schoolName",
      key: "schoolName",
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
    // {
    //   title: "유저 수",
    //   dataIndex: "members",
    //   key: "members",
    //   render: (members) => members.length,
    // },
  ];
  const rowClassName = (record) => {
    if (selectedSchool && selectedSchool.schoolName === record.schoolName) {
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
