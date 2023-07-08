import React, { useEffect, useState } from "react";
import { ReviewDetailWrapper } from "./SchoolDetail/SchoolDetailStyle";
import DetailReviewForm from "./DetailReviewPost";
import ReviewDetailList from "./ReviewDetailList";
import { NoDecoLink } from "../styles/PageStyle";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReviewPost = () => {
  const [write, setWrite] = useState(false);
  const onToggleWrite = () => {
    setWrite(!write);
  };
  const [reviewWrite, setReviewWrite] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { schoolReviews } = useSelector((state) => state.school);
  const filteredReviews = schoolReviews.filter((item) => !item.deleted);
  const { schoolId } = useParams();
  useEffect(() => {
    // console.log(me.schoolId);
  }, [me]);
  const [editing, setEditing] = useState(false); // 수정 상태를 관리하는 상태
  const [editContent, setEditContent] = useState("");
  useEffect(() => {
    if (me) {
      const isUserReviewExist = filteredReviews.some((review) => review.userName === me.userId);
      setReviewWrite(isUserReviewExist);
    }
  }, [filteredReviews, me]);

  return (
    <ReviewDetailWrapper>
      {schoolId == me?.schoolId ? (
        <div style={{ textAlign: "right" }}>
          {me && !reviewWrite && (
            <NoDecoLink onClick={onToggleWrite}>{write ? "" : "리뷰작성"}</NoDecoLink>
          )}
        </div>
      ) : (
        <></>
      )}

      {write ? (
        <DetailReviewForm
          editing={editing}
          setEditing={setEditing}
          setWrite={setWrite}
          review={editContent}
          setEditContent={setEditContent}
        />
      ) : (
        <ReviewDetailList
          editing={editing}
          setEditing={setEditing}
          setWrite={setWrite}
          setEditContent={setEditContent}
        />
      )}
    </ReviewDetailWrapper>
  );
};

export default ReviewPost;
