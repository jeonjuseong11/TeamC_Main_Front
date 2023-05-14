import { Button, Form, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReviewDetailWrapper } from "./SchoolDetail/SchoolDetailStyle";
import moment from "moment"; //댓글 작성 시간표시를 위한 라이브러리
import "moment/locale/ko"; //한국어 적용
import { useParams } from "react-router-dom";
import DetailReviewForm from "./DetailReviewPost";
import ReviewDetailList from "./ReviewDetailList";

const ReviewPost = () => {
  // const { userName } = useSelector((state) => state.user.me?.userName);
  const schoolId = useParams();
  const { school } = useSelector((state) => state.school);
  const { me } = useSelector((state) => state.user);
  const reviews = school[schoolId.schoolId - 1].reviews;
  const [write, setWrite] = useState(false);
  const onToggleWrite = () => {
    setWrite(!write);
  };

  return (
    <>
      <Button onClick={onToggleWrite}>리뷰 작성하기</Button>
      <ReviewDetailWrapper>
        {write ? <DetailReviewForm /> : <ReviewDetailList />}
      </ReviewDetailWrapper>
    </>
  );
};

export default ReviewPost;
