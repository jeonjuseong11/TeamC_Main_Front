import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/AdSlider";
import AppLayout from "../components/AppLayout";
import SearchForm from "../components/SearchForm";
import CardList from "../components/Card/CardList";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_SCHOOL_LIST_REQUEST } from "../constants/actionTypes";
import HomeBoardList from "../components/HomeBoardList";

const Home = () => {
  const [filterValue, setFilterValue] = useState([""]);
  const dispatch = useDispatch();
  const loadSchoolInfo = () => {
    dispatch({
      type: LOAD_SCHOOL_LIST_REQUEST,
    });
  };
  useEffect(() => {
    loadSchoolInfo();
  }, []);

  return (
    <AppLayout>
      <Slider />
      <SearchForm filterValue={filterValue} setFilterValue={setFilterValue} />
      <CardList filterValue={filterValue} />
      <HomeBoardList />
    </AppLayout>
  );
};

export default Home;
