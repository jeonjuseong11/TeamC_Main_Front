import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/AdSlider";
import AppLayout from "../components/AppLayout";
import SearchForm from "../components/SearchForm";
import CardList from "../components/Card/CardList";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST, LOAD_SCHOOL_LIST_REQUEST } from "../constants/actionTypes";
import HomeBoardList from "../components/HomeBoardList";
import axios from "axios";

const Home = () => {
  const accessToken = localStorage.getItem("ACCESSTOKEN");
  const [filterValue, setFilterValue] = useState([""]);
  const dispatch = useDispatch();
  const loadSchoolInfo = () => {
    axios.defaults.headers.common["ACCESS_TOKEN"] = accessToken;
    dispatch({
      type: LOAD_SCHOOL_LIST_REQUEST,
    });
  };
  const loadPosts = () => {
    axios.defaults.headers.common["ACCESS_TOKEN"] = accessToken;
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  };
  useEffect(() => {
    loadSchoolInfo();
    loadPosts();
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
