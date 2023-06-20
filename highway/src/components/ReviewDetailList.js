import { StarFilled } from "@ant-design/icons";
import { Avatar, List, Rate, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TagsItem } from "./Card/CardStyle";

const DetailReviewsWrapper = styled.div`
  text-align: left;
  font-size: 0.5rem;
  margin-top: 1rem;
  width: 6.5rem;
  float: left;
  margin-left: 1rem;
`;
const DetailReviewP = styled.p`
  margin: 0;
  color: black;
  width: 100%;
  box-sizing: border-box;
`;
const DetailReviewAvatarWrapper = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  height: 2rem;
  margin-left: 1rem;
`;
const DetailReviewUserTagsWrapper = styled.div`
  display: flex;
  margin-left: 9rem;
`;
const DetailReviewContentWrapper = styled.div`
  color: black;
  word-break: break-all;
  height: 11vh;
  float: left;
  display: inline-block;
  text-align: left;
  margin-left: 1.5rem;
  margin-top: 1rem;
`;
const ReviewDetailList = () => {
  const { schoolId } = useParams();
  const { schoolReviews, loadSchoolReviewsLoading } = useSelector((state) => state.school);

  useEffect(() => {
    console.log(loadSchoolReviewsLoading);
  }, [loadSchoolReviewsLoading]);
  // console.log(schoolReviews);
  let trafficRateSum = 0;
  let facilityRateSum = 0;
  let cafeteriaRateSum = 0;
  let educationRateSum = 0;
  let employmentRateSum = 0;

  // 객체들의 별점들을 합산합니다.
  for (let i = 0; i < schoolReviews.length; i++) {
    trafficRateSum += schoolReviews[i].trafficRate;
    facilityRateSum += schoolReviews[i].facilityRate;
    cafeteriaRateSum += schoolReviews[i].cafeteriaRate;
    educationRateSum += schoolReviews[i].educationRate;
    employmentRateSum += schoolReviews[i].employmentRate;
  }

  // 별점들의 평균을 계산합니다.
  const trafficRateAverage = schoolReviews.length > 0 ? trafficRateSum / schoolReviews.length : 0;
  const facilityRateAverage = schoolReviews.length > 0 ? facilityRateSum / schoolReviews.length : 0;
  const cafeteriaRateAverage =
    schoolReviews.length > 0 ? cafeteriaRateSum / schoolReviews.length : 0;
  const educationRateAverage =
    schoolReviews.length > 0 ? educationRateSum / schoolReviews.length : 0;
  const employmentRateAverage =
    schoolReviews.length > 0 ? employmentRateSum / schoolReviews.length : 0;
  const totalRate =
    schoolReviews.length > 0
      ? (trafficRateAverage +
          facilityRateAverage +
          cafeteriaRateAverage +
          educationRateAverage +
          employmentRateAverage) /
        5
      : 0;
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={schoolReviews}
        pagination={{
          align: "center",
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 2,
        }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Skeleton loading={loadSchoolReviewsLoading} active>
              <List.Item.Meta
                title={
                  <>
                    <DetailReviewAvatarWrapper>
                      <Avatar size={50} style={{ marginTop: "2rem" }}>
                        {item?.id[0]}
                      </Avatar>
                      <h3>{item?.id}</h3>
                      <span>
                        <StarFilled style={{ color: "#FFDC82", marginLeft: "-5rem" }} />
                        {(item.trafficRate +
                          item.facilityRate +
                          item.cafeteriaRate +
                          item.educationRate +
                          item.employmentRate) /
                          5}
                      </span>
                    </DetailReviewAvatarWrapper>
                    <DetailReviewUserTagsWrapper>
                      <TagsItem>{item.tags}</TagsItem>
                    </DetailReviewUserTagsWrapper>
                  </>
                }
                description={
                  <>
                    <DetailReviewsWrapper>
                      <DetailReviewP>교통</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.trafficRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>시설만족도</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.facilityRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>급식</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.cafeteriaRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>수업만족도</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.educationRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>취업</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.employmentRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                    </DetailReviewsWrapper>
                    <DetailReviewContentWrapper>{item.content}</DetailReviewContentWrapper>
                  </>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default ReviewDetailList;
