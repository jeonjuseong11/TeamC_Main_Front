import { CommentOutlined, FieldTimeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, List, Row, Form, Col, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_COMMENT_REQUEST,
  LOAD_POST_COMMENTS_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useParams } from "react-router-dom";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";
import { formatDate } from "./BoardMain";

const SchoolBoardDetail = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const [parentId, setParentId] = useState(null);
  const { postId } = useParams();
  const loadPostComments = () => {
    console.log("loadPostCommnets");
    dispatch({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: {
        boardId: postId,
      },
    });
  };
  return (
    <>
      <Col xs={23} md={11} style={{ textAlign: "left" }}>
        <Breadcrumb
          items={[
            {
              title: <a href="">{schoolBoardPosts[postId - 1].board}</a>, //게시판으로 이동
            },
            {
              title: <a href="">{schoolBoardPosts[postId - 1].category}</a>, //x특성화 분야로 이동하게
            },
          ]}
        />
        <div>
          <h2>{schoolBoardPosts[postId - 1].title}</h2>
          <p>작성자 : {schoolBoardPosts[postId - 1].userId}</p>
          <p>{formatDate(schoolBoardPosts[postId - 1].createDate)}</p>
          <p style={{ borderTop: "1px solid #c2c2c2", paddingTop: "1rem" }}>
            {schoolBoardPosts[postId - 1].content}
          </p>
        </div>
      </Col>
      <ToggleComment />
    </>
  );
};
export default SchoolBoardDetail;
