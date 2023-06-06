import {
  BankFilled,
  DesktopOutlined,
  DollarCircleOutlined,
  DribbbleOutlined,
  ExperimentOutlined,
  FormatPainterOutlined,
  MedicineBoxOutlined,
  SearchOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
import styled from "styled-components";

const SearchWrapper = styled.div`
  width: 50%;
  margin: 5rem auto;
`;
const SearchInput = styled(Input)`
  width: 60%;
`;
const SearchForm = () => {
  return (
    <SearchWrapper>
      <h3>나에게 맞는 분야는 무엇일까요?</h3>
      <SearchInput
        placeholder="검색"
        prefix={<SearchOutlined style={{ color: "black" }} />}
      />
      <br />
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
        icon={<DribbbleOutlined style={{ fontSize: "1.2rem" }} />}
      />
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <DesktopOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <MedicineBoxOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <DollarCircleOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <ExperimentOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <FormatPainterOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <ToolOutlined style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </Button>
      <Button
        shape="circle"
        style={{
          height: "4em",
          width: "4em",
          marginTop: "1rem",
          marginRight: "1rem",
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </Button>
    </SearchWrapper>
  );
};

export default SearchForm;
