import React, { useEffect } from "react";
import { Col, Breadcrumb, Button, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST, REMOVE_POST_REQUEST } from "../../constants/actionTypes";
import { useNavigate, useParams } from "react-router-dom";
import ToggleComment from "../../components/schoolBoardDetail/ToggleComment";
import { changeCategory, formatDate } from "./BoardMain";
import { UserOutlined } from "@ant-design/icons";

const SchoolBoardDetail = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { schoolBoardPost } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const { postId, category } = useParams();

  const removePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        id: schoolBoardPost?.board?.id,
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
  }, [postId, category]);

  return (
    <>
      <Col xs={23} md={11} style={{ textAlign: "left" }}>
        <Breadcrumb
          items={[
            {
              title: (
                <>
                  <a href={`/schoolboard/${category}`}>{changeCategory(category)}</a>
                </>
              ),
            },
          ]}
        />
        <div>
          <div style={{ borderBottom: "1px solid #f2f2f2" }}>
            <h2>{schoolBoardPost?.board?.title}</h2>
            <Avatar
              style={{ marginTop: "-1rem", backgroundColor: "#d2d2d2" }}
              size={32}
              icon={<UserOutlined />}
            />
            <div style={{ marginLeft: "1rem", display: "inline-block" }}>
              <span style={{ fontWeight: "600" }}>{schoolBoardPost?.userName}</span>
              <br></br>
              <span style={{ fontSize: "0.5rem" }}>
                {formatDate(schoolBoardPost?.board?.createDate)}
              </span>
            </div>
            <p style={{ marginLeft: "1rem" }}></p>
          </div>
          <div
            style={{ height: "20rem" }}
            dangerouslySetInnerHTML={{ __html: schoolBoardPost?.board?.content }}
          />
          <a href={`/schoolboard/${category}`}>
            <Button
              danger
              style={{ float: "right" }}
              onClick={() => {
                removePost();
              }}
            >
              삭제
            </Button>
          </a>
          <Button
            style={{ float: "right", marginRight: "1rem" }}
            onClick={() => {
              navigator(`/schoolboard/${schoolBoardPost?.board.id}/update`);
            }}
          >
            수정
          </Button>
        </div>
      </Col>
      <ToggleComment />
    </>
  );
};

export default SchoolBoardDetail;
