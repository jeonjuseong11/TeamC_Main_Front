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
import React from "react";
import { FilterButton, SearchInput, SearchWrapper } from "../styles/SearchFormStyle";

const SearchForm = ({ setFilterValue }) => {
  return (
    <SearchWrapper>
      <h3>나에게 맞는 분야는 무엇일까요?</h3>
      <SearchInput placeholder="검색" prefix={<SearchOutlined style={{ color: "black" }} />} />
      <br />
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("운동");
        }}
      >
        <DribbbleOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("IT");
        }}
      >
        <DesktopOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("의료");
        }}
      >
        <MedicineBoxOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("회계");
        }}
      >
        <DollarCircleOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("과학");
        }}
      >
        <ExperimentOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("디자인");
        }}
      >
        <FormatPainterOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("전자");
        }}
      >
        <ToolOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("경영");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("미정");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("미정");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
    </SearchWrapper>
  );
};

export default SearchForm;
