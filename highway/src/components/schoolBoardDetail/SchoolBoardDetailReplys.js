import { Col, Input, List, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { needLogin } from "../../utils/Message";

const SchoolBoardDetailReplys = ({
  info,
  removePostComment,
  updatePostComment,
  linkLogin,
}) => {
  const { me } = useSelector((state) => state.user);
  const [commentNum, setCommentNum] = useState(false);
  const [parentId, setParentId] = useState(false);

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

  return (
    <>
      <List
        dataSource={info.children}
        renderItem={(v) => {
          const ReplyCheck = userCheck(v);
          return (
            <List.Item
              style={{
                padding: "0px",
                background: "#f2f2f2",
                borderTop: "1px solid #d2d2d2",
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
                      {v.userId}
                    </Col>
                    {ReplyCheck ? (
                      <Col
                        xs={16}
                        md={19}
                        style={{
                          textAlign: "right",
                          width: "33rem",
                          marginTop: "1rem",
                        }}
                      >
                        {commentNum !== v.id ? (
                          <ul style={{ listStyle: "none" }}>
                            {parentId !== v.id ? (
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
                                    removePostComment(v);
                                  }}
                                >
                                  삭제
                                </li>
                                <li
                                  style={{
                                    float: "right",
                                  }}
                                  onClick={() => {
                                    setCommentNum(v.id);
                                    setParentId(false);
                                  }}
                                >
                                  수정
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
                        {parentId !== v.id ? (
                          <></>
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
                    )}
                  </Row>
                  <Row>
                    {commentNum === v.id ? (
                      <Col xs={22} md={23}>
                        <Input
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              if (me === null) {
                                needLogin(linkLogin);
                              } else {
                                updatePostComment(e.target.value);
                              }
                            }
                          }}
                          name="InputContent"
                          style={{
                            marginTop: "1rem",
                            marginLeft: "1rem",
                            marginBottom: "1rem",
                          }}
                          placeholder="수정 내용을 적어주세요"
                        />
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
                        {v.content}
                      </Col>
                    )}
                  </Row>
                </Col>
              </>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default SchoolBoardDetailReplys;
