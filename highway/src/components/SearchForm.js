import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import React from "react";
import styled from "styled-components";
import { RankTopic } from "./RankSelector";

const SearchInput = styled(Input)`
  width: 60%;
  height: 3rem;
  border-radius: 50px;
`;
const SearchForm = () => {
  return (
    <>
      <Row justify="center" gutter={[24, 24]} style={{ marginTop: "2rem" }}>
        <Col xs={24} md={15}>
          <h3>나에게 맞는 분야는 무엇일까요?</h3>
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]}>
        <Col xs={24} md={15}>
          <SearchInput
            placeholder="검색"
            prefix={<SearchOutlined style={{ color: "black" }} />}
          />
        </Col>
      </Row>
      <Row justify="center" gutter={[24, 24]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={15}>
          {RankTopic.map((item) => {
            return (
              <Button
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
