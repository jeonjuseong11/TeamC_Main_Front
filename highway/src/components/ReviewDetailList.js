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
const DetailReviewAvatarWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 2rem;
`;
const DetailReviewUserTagsWrapper = styled.div`
  display: flex;
  margin-left: 3.5rem;
`;
const DetailReviewContentWrapper = styled.div`
  color: black;
  word-break: break-all;
  position: relative;
  left: -10vw;
  top: -1rem;
`;
const ReviewDetailList = () => {
  const { schoolId } = useParams();
  const { reviews } = useSelector(
    (state) => state.school.schools[schoolId - 1]
  );
  console.log(reviews);
  return (
    <>
      <List
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
                <>
                  <DetailReviewAvatarWrapper>
                    <Avatar size={40}>{item.author[0]}</Avatar>
                    <h3>{item.author}</h3>
                  </DetailReviewAvatarWrapper>
                  <DetailReviewUserTagsWrapper>
                    {item.tags.map((v, idx) => {
                      return <TagsItem key={idx}>{v}</TagsItem>;
                    })}
                  </DetailReviewUserTagsWrapper>
                </>
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
              description={
                <DetailReviewContentWrapper>
                  {item.content}
                </DetailReviewContentWrapper>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ReviewDetailList;
