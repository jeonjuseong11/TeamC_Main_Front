import { Avatar, List, Rate } from "antd";
import React from "react";
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
  const { school } = useSelector((state) => state.school);
  const { schoolId } = useParams();
  console.log(schoolId);
  const reviews = school[schoolId - 1].reviews;
  console.log(reviews);
  return (
    <List
      style={{ width: "100%" }}
      itemLayout="horizontal"
      dataSource={reviews}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <Avatar size={40} style={{ display: "flex" }}>
                {item.userName[0]}
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
              position: "relative",
              top: "-4rem",
              left: "-5rem",
              textAlign: "left",
            }}
            title={
              <>
                <div style={{ fontWeight: "500" }}>{item.userName}</div>
                <div>
                  {item.tags.map((v, idx) => {
                    return <TagsItem key={idx}>{v}</TagsItem>;
                  })}
                </div>
              </>
            }
            description={
              <div style={{ marginTop: "1rem", color: "black" }}>
                {item.content}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default ReviewDetailList;
