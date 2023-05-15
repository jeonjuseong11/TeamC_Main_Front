import { Avatar, Button, List, Rate } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TagsItem } from "./Card/CardStyle";

const DetailReviewsWrapper = styled.div`
  text-align: left;
  font-size: 0.5rem;
  margin-top: 1rem;
`;
const DetailReviewP = styled.p`
  margin: 0;
  color: black;
  width: 100%;
  box-sizing: border-box;
`;
const ReviewDetailList = () => {
  const { schoolId } = useParams();
  const { reviews } = useSelector((state) => state.school.schools[schoolId - 1]);
  console.log(reviews);
  return (
    <>
      <List
        style={{ width: "100%" }}
        itemLayout="horizontal"
        dataSource={reviews}
        pagination={{
          align: "center",
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 2,
        }}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Avatar size={40} style={{ display: "flex" }}>
                  {item.author[0]}
                </Avatar>
              }
              description={
                <DetailReviewsWrapper>
                  <DetailReviewP>교통</DetailReviewP>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rate.trafficRate}
                    style={{
                      alignItems: "center",
                      fontSize: "0.7rem",
                    }}
                  />
                  <DetailReviewP>시설만족도</DetailReviewP>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rate.facilityRate}
                    style={{
                      alignItems: "center",
                      fontSize: "0.7rem",
                    }}
                  />
                  <DetailReviewP>급식</DetailReviewP>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rate.cafeteriaRate}
                    style={{
                      alignItems: "center",
                      fontSize: "0.7rem",
                    }}
                  />
                  <DetailReviewP>수업만족도</DetailReviewP>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rate.educationRate}
                    style={{
                      alignItems: "center",
                      fontSize: "0.7rem",
                    }}
                  />
                  <DetailReviewP>취업</DetailReviewP>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rate.employmentRate}
                    style={{
                      alignItems: "center",
                      fontSize: "0.7rem",
                    }}
                  />
                </DetailReviewsWrapper>
              }
            />
            <List.Item.Meta
              style={{
                textAlign: "left",
              }}
              title={
                <>
                  <div style={{ fontWeight: "500" }}>{item.author}</div>
                  <div>
                    {item.tags.map((v, idx) => {
                      return <TagsItem key={idx}>{v}</TagsItem>;
                    })}
                  </div>
                </>
              }
              description={
                <div style={{ color: "black", wordBreak: "break-all" }}>{item.content}</div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ReviewDetailList;
