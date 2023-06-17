import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RankTopic } from "./RankSelector";

const SearchInput = styled(Input)`
  width: 60%;
  height: 3rem;
  border-radius: 50px;
`;
const SearchForm = ({ setFilterValue, filterValue }) => {
  const [searchText, setSearchText] = useState([""]);

  useEffect(() => {}, [searchText, filterValue]);
  return (
    <>
      <Row justify="center" gutter={[24, 24]} style={{ marginTop: "3rem" }}>
        <Col xs={24} md={15}>
          <h3>나에게 맞는 분야는 무엇일까요?</h3>
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        <Col xs={24} md={15}>
          <SearchInput
            placeholder="검색"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setSearchText([e.target.value]);
                setFilterValue(searchText);
              }
            }}
            prefix={<SearchOutlined style={{ color: "black" }} />}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={15}>
          {RankTopic.map((item) => {
            return (
              <Button
                onClick={() => {
                  setFilterValue(item.value);
                  setSearchText([""]);
                }}
                key={item.value}
                shape="circle"
                style={{
                  height: "4em",
                  width: "4em",
                  marginTop: "1rem",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
                icon={item.icon}
              />
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default SearchForm;
