import React, { useEffect, useState } from "react";
import Slider from "../components/Slider/AdSlider";
import AppLayout from "../components/AppLayout";
import SearchForm from "../components/SearchForm";
import CardList from "../components/Card/CardList";
import { LOAD_USER_REQUEST } from "../constants/actionTypes";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    // console.log(userInfo);
    if (userInfo) {
      dispatch({
        type: LOAD_USER_REQUEST,
        data: userInfo.userNo,
      });
    }
  }, [userInfo]);
  return (
    <AppLayout>
      <Slider />
      <SearchForm filterValue={filterValue} setFilterValue={setFilterValue} />
      <CardList filterValue={filterValue} />
    </AppLayout>
  );
};

export default Home;
