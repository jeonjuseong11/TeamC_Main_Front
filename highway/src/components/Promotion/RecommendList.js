import React from "react";
import RecommendHeadLine from "./RecommendHeadLine";
import { RecommendImage, RecommendWrapper } from "../../styles/PromotionStyle";
import { Link } from "react-router-dom";

const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const RecommendList = () => {
  return (
    <RecommendWrapper>
      <h1>HIGHWAY TIMES</h1>
      <Link to={"/"}>
        <RecommendImage
          width={753}
          height={424}
          preview={{
            mask: <RecommendHeadLine />,
          }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Link>
    </RecommendWrapper>
  );
};

export default RecommendList;
