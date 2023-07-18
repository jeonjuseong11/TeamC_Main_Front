import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table } from "antd";
import styled from "styled-components";

import RankSchoolCard from "../components/RankSchoolCard";
import RankSelector from "../components/RankSelector";
import { LOAD_SCHOOL_LIST_REQUEST } from "../constants/actionTypes";

const StyledTable = styled(Table)`
  && {
    .ant-table-tbody > tr:hover > td {
      cursor: pointer;
    }
    .ant-table-tbody > tr > td {
      border: none;
    }
  }
`;

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
    const copiedData = schools.slice();
    const rankedData = copiedData.map((item, index) => ({
      ...item,
      rank: index,
      reviews: schoolReviews.length,
    }));
    setRankData(rankedData.filter((item) => item.schoolId !== 0));
  }, [schools]);

  useEffect(() => {
    setSelectedSchool(rankData[0]);
  }, [rankData]);

  const handleSchoolSelect = (school) => {
    setSelectedSchool(school);
  };

  const handleFilterValueChange = (value) => {
    setFilterValue(value);
  };

  const filteredData = rankData.filter((item) => {
    if (filterValue === "") {
      return true;
    }
    return item.tag.some((tag) => filterValue.includes(tag));
  });
  useEffect(() => {
    setSelectedSchool(filteredData[0]);
  }, [filterValue]);
  const columns = [
    {
      title: "랭킹",
      dataIndex: "rank",
      key: "rank",
      render: (text, record) => (
        <a
          style={{
            marginLeft: ".5rem",
            textAlign: "center",
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
      title: "학교 명",
      dataIndex: "schoolName",
      key: "schoolName",
      render: (text, record) => (
        <a
          style={{
            textAlign: "center",
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
      title: "사용자 수",
      dataIndex: "studentCount",
      key: "studentCount",
      render: (text, record) => (
        <a
          style={{
            marginLeft: "1.3rem",
            textAlign: "center",
            textDecoration: "none",
            color: "black",
          }}
          onClick={() => handleSchoolSelect(record)}
        >
          {text}
        </a>
      ),
    },
  ];

  const rowClassName = (record) => {
    if (selectedSchool && selectedSchool.schoolId === record.schoolId) {
      return "selected-row";
    }
    return "";
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="center">
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
      <Row gutter={[16, 16]} justify="center" style={{ textAlign: "left", marginTop: "1rem" }}>
        <Col xs={24} md={10} flex="auto">
          <StyledTable
            style={{ minWidth: "14rem" }}
            columns={columns}
            dataSource={filterValue === "" ? rankData : filteredData}
            pagination={{
              pageSize: 10,
            }}
            rowClassName={rowClassName}
            rowKey={(record) => record.rank}
            bordered={false}
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
