import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartTwoTone, MessageOutlined, MessageTwoTone } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import CommentDummyDatas from "../../utils/CommentDummyDatas";
import { useDispatch, useSelector } from "react-redux";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";

const ToggleGoodAndCommentBtn = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const { likePostLoading, unlikePostLoading, schoolBoardPostComments } = useSelector(
    (state) => state.post
  );
  const [good, setGood] = useState(false);
  const { postId } = useParams();
  const userinfo = JSON.parse(localStorage.getItem("USERINFO"));
  const likers = JSON.parse(localStorage.getItem("LIKER"));

  const likePost = () => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { boardId: postId },
    });
    // setGood(true);
  };
  const unlikePost = () => {
    const userId = userinfo.userId;
    const targetLiker = likers.find((liker) => liker.boardId == postId && liker.uid == userId);
    if (targetLiker) {
      const { id } = targetLiker;
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: { heartId: id },
      });
    }
    // setGood(false);
  };
  useEffect(() => {
    const userId = userinfo.userId;
    const hasLiked = likers?.some((liker) => liker.uid == userId && liker.boardId == postId);
    // console.log(hasLiked);

    setGood(hasLiked);
  }, [postId, userinfo, likers]);

  return (
    <>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }} style={{ textAlign: "left" }}>
        {good ? (
          <Button type="text" onClick={unlikePost} loading={unlikePostLoading}>
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
            좋아요
          </Button>
        ) : (
          <Button type="text" onClick={likePost} loading={likePostLoading}>
            <HeartOutlined key="heart" /> 좋아요
          </Button>
        )}
        {!toggle ? (
          <Button
            style={{ marginLeft: "1rem" }}
            type="text"
            onClick={() => {
              setToggle(!toggle);
            }}
            icon={<MessageOutlined />}
          >
            댓글 {schoolBoardPostComments.length}
          </Button>
        ) : (
          <Button
            style={{ marginLeft: "1rem" }}
            type="text"
            onClick={() => {
              setToggle(!toggle);
            }}
            icon={<MessageTwoTone twoToneColor="#8282ff" />}
          >
            <span
              style={{
                color: !toggle ? "black" : "#8282ff",
                fontWeight: !toggle ? "" : "700",
              }}
            >
              댓글 {schoolBoardPostComments.length}
            </span>
          </Button>
        )}
      </Col>
    </>
  );
};

export default ToggleGoodAndCommentBtn;
