import { Col, Input, List, Button, Row } from "antd";
import React, { useState, useCallback } from "react";
import { ADD_COMMENT_REQUEST, LIKE_POST_REQUEST } from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import CommentDummyDatas from "../../utils/CommentDummyDatas";
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

const ToggleComment = ({ loadPostComments }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  // const { schoolBoardPostComments } = useSelector((state) => state.post);
  // const schoolBoardPostCommentsData = schoolBoardPostComments.data;
  // console.log(CommentDummyDatas);
  const { postId } = useParams();
  const [replyCommentNum, setReplyCommnetNum] = useState([]);
  const [commentNum, setCommentNum] = useState(false);
  const [commnetCount, setCommentCount] = useState(0);
  const [parentId, setParentId] = useState(false);
  const [InputContent, setInputContent] = useState("");
  const [checkReply, setCheckReply] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [good, setGood] = useState(false);

  const onToggleGoods = useCallback(() => {
    setGood(!good);
  });

  const onCheckReply = (item) => {
    if (item > 0) {
      setCheckReply(true);
    } else {
      setCheckReply(false);
    }
  };

  const onFinish = (values) => {
    if (values === undefined) {
      alert("빈칸이 있습니다.");
      return;
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: values,
        createData: moment(),
        modifiedDate: moment(),
        userId: me.userId,
        boardId: postId,
        parentId: parentId,
      },
    });
    loadPostComments();
  };

  return (
    <>
      {!toggle ? (
        <>
          <Col xs={23} md={11} justify="center">
            <ToggleGoodAndCommentBtn toggle={toggle} setToggle={setToggle} />
          </Col>
        </>
      ) : (
        <>
          <Col xs={23} md={11} justify="center">
            <Col xs={24} md={24}>
              <ToggleGoodAndCommentBtn toggle={toggle} setToggle={setToggle} />
              <Input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (me === null) {
                      alert("로그인이 필요한 기능입니다.");
                    } else {
                      onFinish(e.target.value);
                    }
                  }
                }}
                name="content"
                placeholder="댓글을 적어주세요."
                style={{
                  height: "5rem",
                  marginBottom: "1rem",
                  marginTop: "1rem",
                }}
              />
              <SchoolBoardDetailComments loadPostComments={loadPostComments} />
            </Col>
          </Col>
        </>
      )}
    </>
  );
};

export default ToggleComment;
