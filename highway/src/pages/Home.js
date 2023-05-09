import React, { useState } from "react";
import Slider from "../components/Slider/AdSlider";
import AppLayout from "../components/AppLayout";
import SearchForm from "../components/SearchForm";
import CardList from "../components/Card/CardList";

const Home = () => {
  const [filterValue, setFilterValue] = useState("");
  return (
    <AppLayout>
      <Slider />
      <SearchForm
        filterValue={filterValue}
        setFilterValue={setFilterValue}
      />
      <CardList
        filterValue={filterValue}
      />
    </AppLayout>
  );
};

export default Home;
