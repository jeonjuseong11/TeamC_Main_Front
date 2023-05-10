import { Menu } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import RecommendItem from "../components/Promotion/RecommendItem";
import { PromotionWrapper, RecommendImage, RecommendWrapper } from "../styles/PromotionStyle";
import {items} from "../utils/PromotionList";

const Promotion = () => {
  const location = useLocation();

  return (
    <PromotionWrapper>
      <RecommendItem />
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={location.pathname}
        />
    </PromotionWrapper>
  );
};

export default Promotion;
