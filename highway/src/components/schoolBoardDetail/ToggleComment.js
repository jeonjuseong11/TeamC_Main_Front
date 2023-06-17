import { Button, Col, Form, Input, List, Row } from "antd";
import React, { useState } from "react";
import {
  ADD_COMMENT_REQUEST,
  ADD_POST_COMMENT_REPLY_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import CommentDummyDatas from "../../utils/CommentDummyDatas";
import { HeartOutlined, HeartTwoTone, MessageOutlined, MessageTwoTone } from "@ant-design/icons";

const ToggleComment = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  // const { schoolBoardPostComments } = useSelector((state) => state.post);
  // const schoolBoardPostCommentsData = schoolBoardPostComments.data;
  console.log(CommentDummyDatas);
  const { postId } = useParams();
  const [replyCommentNum, setReplyCommnetNum] = useState([]);
  const [commentNum, setCommentNum] = useState(false);
  const [commnetCount, setCommentCount] = useState(0);
  const [parentId, setParentId] = useState(false);
  const [inputContent, setInputContent] = useState("");
  const [checkReply, setCheckReply] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [good, setGood] = useState(false);
  const onToggleGoods = () => {
    setGood(!good);
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
  const updatePostComment = (item) => {
    dispatch({
      type: UPDATE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
        content: inputContent,
      },
    });
  };
  const removePostComment = (item) => {
    console.log("RemovePostCommnet");
    dispatch({
      type: REMOVE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
      },
    });
  };

  const addCommentReply = () => {
    console.log("addCommentReply");
    dispatch({
      type: ADD_POST_COMMENT_REPLY_REQUEST,
      data: {
        content: inputContent,
        createData: moment(),
        modifiedDate: moment(),
        userId: me.userId,
        boardId: postId,
        parentId: parentId,
      },
    });
  };

  const onCheckReply = (item) => {
    if (item > 0) {
      setCheckReply(true);
    } else {
      setCheckReply(false);
    }
  };

  const onFinish = (values) => {
    if (values === undefined) {
      alert("빈칸이 있습니다.");
      return;
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: values.content,
        createData: moment(),
        modifiedDate: moment(),
        userId: me.userId,
        boardId: postId,
        parentId: parentId,
      },
    });
  };

  return (
    <>
      <Col xs={23} md={11} offset={4}>
        <div style={{ display: "inline-block", float: "left" }}>
          {good ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleGoods}
              style={{ marginRight: "0.5rem" }}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleGoods} style={{ marginRight: "0.5rem" }} />
          )}
          좋아요 {good ? CommentDummyDatas.data.length + 1 : CommentDummyDatas.data.length}
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
      {!toggle ? (
        <></>
      ) : (
        <Col xs={23} md={11} offset={4}>
          <Input
            placeholder="댓글을 적어주세요."
            style={{
              height: "5rem",
              marginBottom: "1rem",
            }}
          />
          <List
            size="large"
            bordered
            dataSource={CommentDummyDatas.data}
            renderItem={(item) => {
              const CommentUserChecked = userCheck(item);
              return (
                <List.Item style={{ padding: "0px" }}>
                  <ul
                    style={{
                      listStyle: "none",
                      textAlign: "left",
                      marginLeft: "-2rem",
                      width: "50rem",
                    }}
                  >
                    <li style={{ color: "blue" }}>
                      <li
                        style={{
                          float: "left",
                          marginLeft: "1rem",
                        }}
                      >
                        {item.userId}
                        <br />
                        {item.content}
                      </li>
                      {item.id === commentNum ? (
                        <ul style={{ listStyle: "none" }}>
                          <li
                            onClick={() => {
                              setCommentNum(false);
                            }}
                          >
                            <button>취소</button>
                          </li>
                          <li
                            style={{
                              float: "left",
                              width: "38rem",
                              marginTop: "2rem",
                              marginLeft: "-2.5rem",
                            }}
                          >
                            <input
                              placeholder="수정해주세요"
                              value={inputContent}
                              onChange={(e) => {
                                setInputContent(e.target.value);
                              }}
                            />
                          </li>
                          <li style={{ width: "45rem" }}>
                            <button
                              onClick={() => {
                                setCommentNum(false);
                              }}
                              style={{
                                width: "9rem",
                                marginLeft: "1rem",
                                height: "5rem",
                                marginTop: "2rem",
                              }}
                            >
                              수정
                            </button>
                          </li>
                        </ul>
                      ) : (
                        <li>
                          {CommentUserChecked ? (
                            <li>
                              <button
                                onClick={() => {
                                  setParentId(item.id);
                                  setCommentNum(false);
                                }}
                              >
                                답글
                              </button>
                              <button
                                onClick={() => {
                                  setCommentNum(item.id);
                                  setParentId(false);
                                }}
                              >
                                수정
                              </button>
                              <button
                                onClick={() => {
                                  removePostComment(item);
                                }}
                              >
                                삭제
                              </button>
                            </li>
                          ) : (
                            <li>
                              <button
                                onClick={() => {
                                  setParentId(item.id);
                                  setCommentNum(false);
                                }}
                              >
                                답글
                              </button>
                            </li>
                          )}
                        </li>
                      )}
                    </li>

                    <List
                      dataSource={item.children}
                      renderItem={(v) => {
                        setCheckReply(v.length);
                        return (
                          <List.Item>
                            <li>
                              {v.id}
                              <br />
                              {v.content}
                            </li>
                            {CommentUserChecked ? (
                              <>
                                <li>수정</li>
                                <li>삭제</li>
                              </>
                            ) : (
                              <li></li>
                            )}
                          </List.Item>
                        );
                      }}
                    />

                    {parentId === item.id ? (
                      <ul style={{ listStyle: "none" }}>
                        <li
                          onClick={() => {
                            setParentId(false);
                          }}
                        >
                          <button>취소</button>
                        </li>
                        <li
                          style={{
                            float: "left",
                            width: "38rem",
                            marginTop: "2rem",
                            marginLeft: "-2.5rem",
                          }}
                        >
                          <input
                            value={inputContent}
                            onChange={(e) => {
                              setInputContent(e.target.value);
                            }}
                            style={{
                              width: "37rem",
                              height: "5rem",
                            }}
                          />
                        </li>
                        <li style={{ width: "45rem" }}>
                          <button
                            onClick={() => {
                              addCommentReply();
                              setCommentNum(false);
                            }}
                            style={{
                              width: "9rem",
                              marginLeft: "1rem",
                              height: "5rem",
                              marginTop: "2rem",
                            }}
                          >
                            답글달기
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <></>
                    )}
                  </ul>
                </List.Item>
              );
            }}
          />
        </Col>
      )}
    </>
  );
};

export default ToggleComment;
