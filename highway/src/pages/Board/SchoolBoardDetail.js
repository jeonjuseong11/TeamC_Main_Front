import { Col, Breadcrumb, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST, LOAD_POST_COMMENTS_REQUEST } from "../../constants/actionTypes";
import { useParams } from "react-router-dom";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";
import { changeCategory, formatDate } from "./BoardMain";

const SchoolBoardDetail = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { schoolBoardPosts } = useSelector((state) => state.post);
  const [parentId, setParentId] = useState(null);
  const { postId, category } = useParams();

  const schoolBoardPost = schoolBoardPosts.find((post) => post.id === postId - 1);
  const loadPostComments = () => {
    // console.log("loadPostCommnets");
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    dispatch({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: {
        boardId: postId,
      },
    });
  };

  useEffect(() => {
    loadPostComments();
  }, []);

  return (
    <>
      <Col xs={23} md={11} style={{ textAlign: "left" }}>
        <Breadcrumb
          items={[
            // {
            //   title: <a href="">{schoolBoardPost.board}</a>, //게시판으로 이동
            // },
            {
              title: <a href={`/schoolboard/${category}`}>{changeCategory(category)}</a>, //특성화 분야로 이동하게
            },
          ]}
        />
        <div>
          <h2>{schoolBoardPost?.title}</h2>
          <p>작성자 : {schoolBoardPost?.userId}</p>
          <p>{formatDate(schoolBoardPost?.createDate)}</p>
          <p style={{ borderTop: "1px solid #c2c2c2", paddingTop: "1rem" }}>
            {schoolBoardPost?.content}
          </p>
        </div>
      </Col>
      <ToggleComment loadPostComments={loadPostComments} />
    </>
  );
};

export default SchoolBoardDetail;
