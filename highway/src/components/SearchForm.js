import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RankTopic } from "./RankSelector";

const SearchInput = styled(Input)`
  width: 60%;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: #f2f2f2;
  height: 3rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
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
      <Row justify="center" gutter={[24, 24]} style={{ marginTop: "3rem" }}>
        <Col xs={24} md={15}>
          <h3>나에게 맞는 분야는 무엇일까요?</h3>
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        <Col xs={24} md={15}>
          <SearchInput
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setFilterValue(searchText);
              }
            }}
            prefix={<SearchOutlined style={{ color: "black" }} />}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} md={15}>
          <ButtonContainer>
            {RankTopic.map((item) => (
              <Button
                onClick={() => handleButtonClick(item.value)}
                key={item.value}
                shape="square"
                style={{
                  height: "5.5rem",
                  width: "5.5rem",
                  margin: "0 0.5rem",
                  backgroundColor: item.value === activeButton ? "#8282ff" : "",
                  color: item.value === activeButton ? "white" : "",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
                <span style={{ margin: "0.5rem" }}>{item.content}</span>
              </Button>
            ))}
          </ButtonContainer>
        </Col>
      </Row>
    </>
  );
};

export default SearchForm;
