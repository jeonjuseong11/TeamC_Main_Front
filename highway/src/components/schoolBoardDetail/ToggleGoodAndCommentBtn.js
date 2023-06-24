import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartTwoTone, MessageOutlined, MessageTwoTone } from "@ant-design/icons";
import { Button, Col } from "antd";
import CommentDummyDatas from "../../utils/CommentDummyDatas";
import { useDispatch, useSelector } from "react-redux";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";

const ToggleGoodAndCommentBtn = ({ toggle, setToggle }) => {
  const dispatch = useDispatch();
  const { Likers } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [good, setGood] = useState(false);
  const { postId } = useParams();

  const likePost = () => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { boardId: postId },
    });
  };
  const unlikePost = () => {
    const userinfo = JSON.parse(localStorage.getItem("USERINFO"));
    const likers = JSON.parse(localStorage.getItem("LIKER"));
    const userId = userinfo.userId;
    const targetLiker = likers.find((liker) => liker.boardId == postId && liker.uid == userId);

    if (targetLiker) {
      const { id } = targetLiker;
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: { heartId: id },
      });
    }
    setGood(false);
  };
  const userinfo = JSON.parse(localStorage.getItem("USERINFO"));

  useEffect(() => {
    // console.log(Likers);
    // const hasLiked = likers.some((liker) => liker.uid === userinfo.userId);
    // const [good, setGood] = useState(hasLiked);

    const hasLiked = Likers.some(
      (liker) => liker.boardId == postId && liker.uid == userinfo.userId
    );

    setGood(hasLiked);
  }, [Likers, postId]);

  return (
    <Col xs={23} md={11}>
      <div style={{ display: "inline-block", float: "left" }}>
        {good ? (
          <Button type="text" onClick={unlikePost}>
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
            좋아요
          </Button>
        ) : (
          <Button type="text" onClick={likePost}>
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
            댓글 {CommentDummyDatas.data.length}
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
              댓글 {CommentDummyDatas.data.length}
            </span>
          </Button>
        )}
      </div>
    </Col>
  );
};

export default ToggleGoodAndCommentBtn;
