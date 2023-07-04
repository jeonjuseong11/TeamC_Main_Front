import { Col, Breadcrumb, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_COMMENTS_REQUEST, LOAD_POST_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";
import { changeCategory, formatDate } from "./BoardMain";

const SchoolBoardDetail = () => {
  const dispatch = useDispatch();
  const { schoolBoardPosts, schoolBoardPost } = useSelector((state) => state.post);
  const [parentId, setParentId] = useState(null);
  const { postId, category } = useParams();
  const loadPostComments = () => {
    dispatch({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: {
        boardId: postId,
      },
    });
  };
  const loadPost = (postId) => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: postId,
    });
  };

  useEffect(() => {
    loadPost(postId);
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
          <h2>{schoolBoardPost?.board.title}</h2>
          <p>작성자 : {schoolBoardPost?.board.userId}</p>
          <p>{formatDate(schoolBoardPost?.board.createDate)}</p>
          <p
            style={{ borderTop: "1px solid #c2c2c2", paddingTop: "1rem", paddingBottom: "5rem" }}
            dangerouslySetInnerHTML={{ __html: schoolBoardPost?.board.content }}
          ></p>
        </div>
      </Col>
      <ToggleComment loadPostComments={loadPostComments} />
    </>
  );
};

export default SchoolBoardDetail;
