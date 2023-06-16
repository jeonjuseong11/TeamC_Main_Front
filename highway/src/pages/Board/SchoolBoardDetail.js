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
import BoardProfile from "../../components/Board/BoardProfile";
import moment from "moment";
import CommentDummyData, { CommentDummyDatas } from "../../utils/CommentDummyDatas";
import SchoolBoardMenu from "../../components/schoolBoardDetail/SchoolBoardMenu";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";

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
        <h2>{schoolBoardPosts[postId - 1].title}</h2>
        <ul
          style={{
            listStyle: "none",
            margin: "0",
            padding: "0",
          }}
        >
          <li style={{ marginBottom: "0.5rem" }}>작성자 : {schoolBoardPosts[postId - 1].userId}</li>
          <li style={{ float: "left" }}>{schoolBoardPosts[postId - 1].createData}</li>
          <li style={{ float: "left" }}>{CommentDummyData.length}</li>
          <li style={{}}>{schoolBoardPosts[postId - 1].good}</li>
          <hr />
          {schoolBoardPosts[postId - 1].content}
        </ul>
      </Col>
      <ToggleComment />
    </>
  );
};
export default SchoolBoardDetail;
