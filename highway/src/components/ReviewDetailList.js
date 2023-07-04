import { StarFilled } from "@ant-design/icons";
import { Avatar, Button, List, Rate, Skeleton } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { REMOVE_SCHOOL_REVIEW_REQUEST } from "../constants/actionTypes";
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
const ReviewDetailList = ({ setWrite, setEditing, setEditContent }) => {
  const { schoolReviews, loadSchoolReviewsLoading } = useSelector((state) => state.school);
  const { me } = useSelector((state) => state.user);
  const userinfo = JSON.parse(localStorage.getItem("USERINFO"));

  const dispatch = useDispatch();
  const { schoolId } = useParams();

  const filteredReviews = schoolReviews.filter((item) => !item.deleted);

  const removeReview = (id) => {
    const access_TOKEN = localStorage.getItem("ACCESSTOKEN");
    axios.defaults.headers.common["ACCESS_TOKEN"] = `${access_TOKEN}`;
    dispatch({
      type: REMOVE_SCHOOL_REVIEW_REQUEST,
      data: { id: id, schoolId: schoolId },
    });
  };

  const handleEdit = (review) => {
    // 수정 상태로 변경하고 리뷰 데이터를 전달합니다.
    console.log(review);
    setEditContent(review);
    setEditing(true);
    setWrite(true);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={filteredReviews}
        pagination={{
          align: "center",
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 2,
        }}
        renderItem={(item) => (
          <List.Item key={item?.id}>
            <Skeleton loading={loadSchoolReviewsLoading} active>
              <List.Item.Meta
                title={
                  <>
                    <DetailReviewAvatarWrapper>
                      <Avatar size={50} style={{ marginTop: "2rem" }}>
                        {item?.userName && item.userName.length > 0 ? item.userName[0] : ""}
                      </Avatar>
                      <h3>{item?.userName}</h3>
                      <span>
                        <StarFilled style={{ color: "#FFDC82", marginLeft: "-5rem" }} />
                        {(item?.trafficRate +
                          item?.facilityRate +
                          item?.cafeteriaRate +
                          item?.educationRate +
                          item?.employmentRate) /
                          5}
                      </span>
                      {item.userName === userinfo.userName && (
                        <div
                          style={{
                            gap: "10px",
                            fontWeight: "500",
                            color: "#a2a2a2",
                          }}
                        >
                          <span style={{ cursor: "pointer" }} onClick={() => handleEdit(item)}>
                            수정
                          </span>
                          <br />
                          <span style={{ cursor: "pointer" }} onClick={() => removeReview(item.id)}>
                            삭제
                          </span>
                        </div>
                      )}
                    </DetailReviewAvatarWrapper>

                    <DetailReviewUserTagsWrapper>
                      <TagsItem>{item?.tags}</TagsItem>
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
                        value={item.trafficRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>시설만족도</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        value={item?.facilityRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>급식</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        value={item?.cafeteriaRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>수업만족도</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        value={item?.educationRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                      <DetailReviewP>취업</DetailReviewP>
                      <Rate
                        disabled
                        allowHalf
                        value={item?.employmentRate}
                        style={{
                          alignItems: "center",
                          fontSize: "0.7rem",
                        }}
                      />
                    </DetailReviewsWrapper>
                    <DetailReviewContentWrapper>{item?.content}</DetailReviewContentWrapper>
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
