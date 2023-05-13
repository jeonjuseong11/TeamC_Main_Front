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
          setFilterValue("1");
        }}
      >
        <DribbbleOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("2");
        }}
      >
        <DesktopOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("3");
        }}
      >
        <MedicineBoxOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("4");
        }}
      >
        <DollarCircleOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("5");
        }}
      >
        <ExperimentOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("6");
        }}
      >
        <FormatPainterOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("7");
        }}
      >
        <ToolOutlined style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("8");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("9");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
      <FilterButton
        shape="circle"
        onClick={(e) => {
          setFilterValue("10");
        }}
      >
        <BankFilled style={{ fontSize: "1.2rem" }} />
      </FilterButton>
    </SearchWrapper>
  );
};

export default SearchForm;
