import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RankTopic } from "./RankSelector";

const SearchInput = styled(Input)`
  background-color: #f2f2f2;
  border-radius: 10px;
  border: #f2f2f2;
  height: 3.5rem;
  width: 85%;
`;

const SearchForm = ({ setFilterValue, filterValue }) => {
  const [searchText, setSearchText] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    setFilterValue(filterValue);
  }, [filterValue, setFilterValue]);

  const handleButtonClick = (value) => {
    if (activeButton === value) {
      setFilterValue("");
      setActiveButton("");
    } else {
      setFilterValue(value);
      setActiveButton(value);
    }
  };

  return (
    <>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Col xs={24} md={15}>
          <h2 style={{ margin: "0" }}>나에게 맞는 분야는 무엇일까요?</h2>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Col xs={24} md={10}>
          <SearchInput
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setFilterValue(searchText);
              }
            }}
            prefix={<SearchOutlined style={{ color: "black", fontSize: "1rem" }} />}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "1.5rem" }}>
        <Col
          xs={24}
          md={10}
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {RankTopic.map((item) => (
            <Button
              key={item.value}
              onClick={() => handleButtonClick(item.value)}
              shape="square"
              style={{
                borderRadius: "10px",
                paddingTop: "1rem",
                height: "6rem",
                width: "6rem",
                backgroundColor: item.value === activeButton ? "#8282ff" : "",
                color: item.value === activeButton ? "white" : "",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              <span>{item.icon}</span>
              <span style={{ margin: "0.5rem" }}>{item.content}</span>
            </Button>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default SearchForm;
