import { Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RecommendList from "../components/Promotion/RecommendList";
import { PromotionWrapper } from "../styles/PromotionStyle";
import {items} from "../utils/PromotionList";

const Promotion = () => {
  const location = useLocation();

  return (
    <PromotionWrapper>
      <RecommendList />
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={location.pathname}
        />
      <Outlet />
    </PromotionWrapper>
  );
};

export default Promotion;
