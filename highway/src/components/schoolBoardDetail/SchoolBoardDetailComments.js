import { Col, Input, List, Row } from "antd";
import React, { useState } from "react";
import CommentDummyDatas from "../../utils/CommentDummyDatas";
import SchoolBoardDetailReplys from "./SchoolBoardDetailReplys";
import {
  ADD_POST_COMMENT_REPLY_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { needLogin } from "../../utils/Message";

const SchoolBoardDetailComments = ({ loadPostComments }) => {
  const { me } = useSelector((state) => state.user);
  const [commentNum, setCommentNum] = useState(false);
  const [parentId, setParentId] = useState(false);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigator = useNavigate();
  const linkLogin = () => {
    navigator("/login");
  };

  const userCheck = (item) => {
    if (me === null) {
      return false;
    }
    if (me.userId === item.userId) {
      return true;
    } else {
      return false;
    }
  };

  const updatePostComment = (item, values) => {
    console.log(values);
    dispatch({
      type: UPDATE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
        content: values,
      },
    });
    loadPostComments();
  };
  const removePostComment = (item) => {
    console.log("RemovePostCommnet");
    dispatch({
      type: REMOVE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
      },
    });
    loadPostComments();
  };

  const addCommentReply = (item, values) => {
    console.log("addCommentReply");
    dispatch({
      type: ADD_POST_COMMENT_REPLY_REQUEST,
      data: {
        content: values,
        createData: moment(),
        modifiedDate: moment(),
        userId: me.userId,
        boardId: postId,
        parentId: item.id,
      },
    });
    loadPostComments();
  };
  return (
    <Col xs={24} md={24} style={{ marginBottom: "2rem" }}>
      <List
        size="large"
        bordered
        dataSource={CommentDummyDatas.data}
        renderItem={(item) => {
          const CommentUserChecked = userCheck(item);
          return (
            <List.Item
              style={{
                padding: "0px",
                borderBottom: "1px solid #d2d2d2",
              }}
            >
              <>
                <Col xs={24} md={24} style={{ padding: "0px" }}>
                  <Row>
                    <Col
                      xs={4}
                      md={4}
                      style={{
                        textAlign: "left",
                        width: "10rem",
                        marginLeft: "1.4rem",
                        marginTop: "1rem",
                        color: "blue",
                      }}
                    >
                      {item.userId}
                    </Col>
                    {CommentUserChecked ? (
                      <Col
                        xs={16}
                        md={19}
                        style={{
                          textAlign: "right",
                          width: "3rem",
                          marginTop: "1rem",
                        }}
                      >
                        {commentNum !== item.id ? (
                          <ul style={{ listStyle: "none" }}>
                            {parentId !== item.id ? (
                              <ul
                                style={{
                                  listStyle: "none",
                                  color: "#a2a2a2",
                                  fontSize: "0.8rem",
                                }}
                              >
                                <li
                                  style={{
                                    float: "right",
                                    marginLeft: "0.5rem",
                                  }}
                                  onClick={() => {
                                    removePostComment(item);
                                  }}
                                >
                                  삭제
                                </li>
                                <li
                                  style={{
                                    float: "right",
                                  }}
                                  onClick={() => {
                                    setCommentNum(item.id);
                                    setParentId(false);
                                  }}
                                >
                                  수정
                                </li>
                                <li
                                  style={{
                                    float: "right",
                                    color: "#a2a2a2",
                                    fontSize: "0.8rem",
                                    marginRight: "1rem",
                                  }}
                                  onClick={() => {
                                    if (me === null) {
                                      needLogin(linkLogin);
                                    } else {
                                      setParentId(item.id);
                                      setCommentNum(false);
                                    }
                                  }}
                                >
                                  답장
                                </li>
                              </ul>
                            ) : (
                              <li
                                style={{
                                  float: "right",
                                  color: "#a2a2a2",
                                  fontSize: "0.8rem",
                                }}
                                onClick={() => {
                                  setCommentNum(false);
                                  setParentId(false);
                                }}
                              >
                                취소
                              </li>
                            )}
                          </ul>
                        ) : (
                          <li
                            style={{
                              float: "right",
                              color: "#a2a2a2",
                              fontSize: "0.8rem",
                            }}
                            onClick={() => {
                              setCommentNum(false);
                              setParentId(false);
                            }}
                          >
                            취소
                          </li>
                        )}
                      </Col>
                    ) : (
                      <Col
                        xs={16}
                        md={19}
                        style={{
                          textAlign: "right",
                          width: "33rem",
                        }}
                      >
                        {parentId !== item.id ? (
                          <li
                            style={{
                              float: "right",
                              marginTop: "1rem",
                              color: "#a2a2a2",
                              fontSize: "0.8rem",
                            }}
                            onClick={() => {
                              if (me === null) {
                                needLogin(linkLogin);
                              } else {
                                setParentId(item.id);
                                setCommentNum(false);
                              }
                            }}
                          >
                            답장
                          </li>
                        ) : (
                          <li
                            style={{
                              marginTop: "1rem",
                              color: "#a2a2a2",
                              fontSize: "0.8rem",
                            }}
                            onClick={() => {
                              setCommentNum(false);
                              setParentId(false);
                            }}
                          >
                            취소
                          </li>
                        )}
                      </Col>
                    )}
                  </Row>
                  <Row>
                    {commentNum === item.id ? (
                      <Col xs={22} md={23}>
                        <Input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (me === null) {
                                alert("로그인이 필요한 기능입니다.");
                              } else {
                                updatePostComment(e.target.value);
                              }
                            }
                          }}
                          style={{
                            marginTop: "1rem",
                            marginLeft: "1rem",
                            marginBottom: "1rem",
                          }}
                          placeholder="수정 내용을 적어주세요"
                        ></Input>
                      </Col>
                    ) : (
                      <Col
                        xs={23}
                        md={23}
                        style={{
                          textAlign: "left",
                          marginLeft: "1.4rem",
                          marginTop: "1rem",

                          marginBottom: "2rem",
                        }}
                      >
                        {item.content}
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col xs={22} md={23}>
                      {parentId === item.id ? (
                        <Input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (me === null) {
                                alert("로그인이 필요한 기능입니다.");
                              } else {
                                addCommentReply(item, e.target.value);
                              }
                            }
                          }}
                          style={{
                            marginTop: "1rem",
                            marginLeft: "1rem",
                            marginBottom: "1rem",
                          }}
                          placeholder="답글을 적어주세요"
                        ></Input>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                  {item.children.length === 0 ? (
                    <></>
                  ) : (
                    <SchoolBoardDetailReplys
                      info={item}
                      me={me}
                      removePostComment={removePostComment}
                      updatePostComment={updatePostComment}
                      loadPostComments={loadPostComments}
                      linkLogin={linkLogin}
                    />
                  )}
                </Col>
              </>
            </List.Item>
          );
        }}
      />
    </Col>
  );
};

export default SchoolBoardDetailComments;
