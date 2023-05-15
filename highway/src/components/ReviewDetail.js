import React, { useState } from "react";
import { ReviewDetailWrapper } from "./SchoolDetail/SchoolDetailStyle";
import DetailReviewForm from "./DetailReviewPost";
import ReviewDetailList from "./ReviewDetailList";
import { NoDecoLink } from "../styles/PageStyle";

const ReviewPost = () => {
  const [write, setWrite] = useState(false);
  const onToggleWrite = () => {
    setWrite(!write);
  };

  return (
    <>
      <NoDecoLink
        style={{ position: "relative", top: "1rem", left: "-1rem" }}
        onClick={onToggleWrite}
      >
        {write ? "취소" : "리뷰작성"}
      </NoDecoLink>
      <ReviewDetailWrapper>
        {write ? (
          <DetailReviewForm setWrite={setWrite} />
        ) : (
          <ReviewDetailList />
        )}
      </ReviewDetailWrapper>
    </>
  );
};

export default ReviewPost;
