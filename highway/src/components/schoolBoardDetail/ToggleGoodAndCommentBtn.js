import React, { useEffect, useState } from "react";
import { HeartOutlined, HeartTwoTone, MessageOutlined, MessageTwoTone } from "@ant-design/icons";
import { Button, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";

const ToggleGoodAndCommentBtn = ({ toggle, setToggle }) => {
  const { schoolBoardPost } = useSelector((state) => state.post);

  const dispatch = useDispatch();
  const { likePostLoading, unlikePostLoading, schoolBoardPostComments } = useSelector(
    (state) => state.post
  );
  const filteredComments = schoolBoardPostComments.filter((item) => !item.isDeleted);

  const [good, setGood] = useState(false);
  const { postId } = useParams();
  useEffect(() => {
    if (schoolBoardPost) {
      setGood(schoolBoardPost.heart == null ? false : true);
    }
  }, [schoolBoardPost]);
  const likePost = () => {
    dispatch({
      type: LIKE_POST_REQUEST,
      data: { boardId: postId },
    });
    setGood(true);
  };
  const unlikePost = () => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: { boardId: postId, heartId: schoolBoardPost.heart.id },
    });
    setGood(false);
  };

  return (
    <>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }} style={{ textAlign: "left" }}>
        {good ? (
          <Button type="text" onClick={unlikePost} loading={likePostLoading}>
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" />
            좋아요
          </Button>
        ) : (
          <Button type="text" onClick={likePost} loading={unlikePostLoading}>
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
            댓글 {filteredComments.length}
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
              댓글 {filteredComments.length}
            </span>
          </Button>
        )}
      </Col>
    </>
  );
};

export default ToggleGoodAndCommentBtn;
