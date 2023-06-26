import { Col, Breadcrumb, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_COMMENTS_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";
import { changeCategory, formatDate } from "./BoardMain";

const SchoolBoardDetail = () => {
  const dispatch = useDispatch();
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const [parentId, setParentId] = useState(null);
  const { postId, category } = useParams();

  const schoolBoardPost = schoolBoardPosts.find((post) => post.id === Number(postId));
  const loadPostComments = () => {
    dispatch({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: {
        boardId: postId,
      },
    });
  };

  useEffect(() => {
    loadPostComments();
  }, [postId, category]);

  return (
    <>
      <Col xs={23} md={11} style={{ textAlign: "left" }}>
        <Breadcrumb
          items={[
            {
              title: <a href={`/schoolboard/${category}`}>{changeCategory(category)}</a>,
            },
          ]}
        />
        <div>
          <h2>{schoolBoardPost?.title}</h2>
          <p>작성자 : {schoolBoardPost?.userId}</p>
          <p>{formatDate(schoolBoardPost?.createDate)}</p>
          <p style={{ borderTop: "1px solid #c2c2c2", paddingTop: "1rem", paddingBottom: "5rem" }}>
            {schoolBoardPost?.content}
          </p>
        </div>
      </Col>
      <ToggleComment loadPostComments={loadPostComments} />
    </>
  );
};

export default SchoolBoardDetail;
