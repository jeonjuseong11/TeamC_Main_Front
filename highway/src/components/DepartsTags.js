import React from "react";
import { CardItem, TagsItem } from "./Card/CardStyle";

const DepartsTags = ({ schoolInfo }) => {
  return (
    <CardItem>
      {schoolInfo.tags.map((v, idx) => {
        return <TagsItem key={idx}>{v}</TagsItem>;
      })}
    </CardItem>
  );
};

export default DepartsTags;
