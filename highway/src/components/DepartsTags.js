import React from "react";
import { CardItem, TagsItem } from "./Card/CardStyle";

const DepartsTags = ({ schoolInfo }) => {
  return (
    <CardItem>
      {schoolInfo?.map((v, idx) => {
        return (
          <TagsItem key={idx} style={{ marginRight: "0.5rem" }}>
            {v.tagName}
          </TagsItem>
        );
      })}
    </CardItem>
  );
};

export default DepartsTags;
