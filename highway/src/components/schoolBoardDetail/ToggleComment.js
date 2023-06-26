import { Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { ADD_COMMENT_REQUEST } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import ToggleGoodAndCommentBtn from "./ToggleGoodAndCommentBtn";
import SchoolBoardDetailComments from "./SchoolBoardDetailComments";

export const formatDate = (dateString) => {
  const currentTime = moment();
  const targetTime = moment(dateString);
  const duration = moment.duration(currentTime.diff(targetTime));

  if (duration.asSeconds() < 60) {
    return "방금 전";
  } else if (duration.asMinutes() < 60) {
    const minutes = Math.floor(duration.asMinutes());
    return `${minutes}분 전`;
  } else if (duration.asHours() < 24) {
    const hours = Math.floor(duration.asHours());
    return `${hours}시간 전`;
  } else if (duration.asDays() < 2) {
    return "어제";
  } else if (duration.asMonths() < 1) {
    const days = Math.floor(duration.asDays());
    return `${days}일 전`;
  } else {
    const months = Math.floor(duration.asMonths());
    return `${months}달 전`;
  }
};

const ToggleComment = React.memo(({ loadPostComments }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  const { postId } = useParams();
  const [toggle, setToggle] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const handleAddComment = () => {
    if (commentValue.trim() === "") {
      alert("빈칸이 있습니다.");
      return;
    }
    if (me === null) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    // 댓글 추가 요청 전에 toggle 값을 변경하여 중복 요청을 방지
    setToggle(false);

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentValue,
        userId: me.userId,
        boardId: postId,
      },
    });

    setCommentValue(""); // 댓글 작성 후 입력 값 초기화
  };

  useEffect(() => {
    loadPostComments();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (me === null) {
        alert("로그인이 필요한 기능입니다.");
      } else {
        handleAddComment();
      }
    }
  };

  return (
    <>
      <ToggleGoodAndCommentBtn toggle={toggle} setToggle={setToggle} />
      {toggle && (
        <>
          <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }}>
            <Input.TextArea
              style={{ padding: "1rem", resize: "none" }}
              maxLength="100"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="댓글을 적어주세요.(100자 이내) &#13;&#10;작성 완료시 엔터키를 눌러주세요"
            />
          </Col>
        </>
      )}
      <SchoolBoardDetailComments />
    </>
  );
});

export default ToggleComment;
