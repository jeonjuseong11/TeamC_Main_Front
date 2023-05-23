import React, { useEffect, useState } from "react";
import { ReviewDetailWrapper } from "./SchoolDetail/SchoolDetailStyle";
import DetailReviewForm from "./DetailReviewPost";
import ReviewDetailList from "./ReviewDetailList";
import { NoDecoLink } from "../styles/PageStyle";
import { useSelector } from "react-redux";

const ReviewPost = () => {
  const [write, setWrite] = useState(false);
  const onToggleWrite = () => {
    setWrite(!write);
  };
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (me) {
      // console.log(me);
    }
  }, []);
  return (
    <>
      {me ? (
        <NoDecoLink
          style={{ position: "relative", top: "1rem", left: "-1rem" }}
          onClick={onToggleWrite}
        >
          {write ? "취소" : "리뷰작성"}
        </NoDecoLink>
      ) : (
        <></>
      )}

      <ReviewDetailWrapper>
        {write ? <DetailReviewForm setWrite={setWrite} /> : <ReviewDetailList />}
      </ReviewDetailWrapper>
    </>
  );
};

export default ReviewPost;
