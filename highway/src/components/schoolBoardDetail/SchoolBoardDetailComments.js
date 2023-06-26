import { Button, Col, Input, List, Modal } from "antd";
import React, { useCallback, useState } from "react";
import SchoolBoardDetailReplys from "./SchoolBoardDetailReplys";
import {
  ADD_POST_COMMENT_REPLY_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { needLogin } from "../../utils/Message";
import styled from "styled-components";
import SchoolBoardDetailCommentForm from "../Board/SchoolBoardDetailCommentForm";
import { formatDate } from "../../pages/Board/BoardMain";

export const CommentDateSpan = styled.span`
  color: #a2a2a2;
  font-size: 0.8rem;
  margin-right: 1rem;
`;
export const CommentSpan = styled.span`
  color: #a2a2a2;
  font-size: 0.8rem;
  cursor: pointer;
  margin-right: 1rem;
`;
const SchoolBoardDetailComments = () => {
  const { me } = useSelector((state) => state.user);
  const { schoolBoardPostComments } = useSelector((state) => state.post);
  const [commentNum, setCommentNum] = useState("");
  const [parentId, setParentId] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const dispatch = useDispatch();
  const { postId } = useParams();
  const navigator = useNavigate();
  const linkLogin = () => {
    navigator("/login");
  };

  const updatePostComment = useCallback((item, editedComment) => {
    dispatch({
      type: UPDATE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
        content: editedComment,
        boardId: postId,
      },
    });
    setEditedComment("");
  }, []);

  const removePostComment = useCallback((item) => {
    console.log("RemovePostComment");
    dispatch({
      type: REMOVE_POST_COMMENT_REQUEST,
      data: {
        id: item.id,
        boardId: postId,
      },
    });
  }, []);

  const addCommentReply = useCallback((item, values, me) => {
    console.log("addCommentReply");
    dispatch({
      type: ADD_POST_COMMENT_REPLY_REQUEST,
      data: {
        content: values,
        userId: me.userId,
        boardId: postId,
        parentId: item.id,
      },
    });
    setParentId(""); //답글 입력창 닫기
  }, []);

  if (schoolBoardPostComments.length === 0) {
    return <div style={{ height: "10rem" }}></div>; // 렌더링하지 않고 종료
  }

  return (
    <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }} style={{ marginBottom: "3rem" }}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={schoolBoardPostComments}
        renderItem={(item) => {
          const isEditing = editingCommentId === item.id; //수정중인 상태를 위해

          return (
            <>
              <List.Item
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #d2d2d2",
                }}
                actions={[
                  me && me.userId === item.userId ? ( //내가 작성한 댓글인가?
                    isEditing ? ( //수정중인가?
                      <>
                        <CommentSpan
                          key="update"
                          onClick={() => {
                            updatePostComment(item, editedComment);
                            setEditingCommentId("");
                          }}
                        >
                          수정완료
                        </CommentSpan>
                        <CommentSpan
                          key="cancel"
                          onClick={() => {
                            setEditingCommentId("");
                            setEditedComment("");
                          }}
                        >
                          취소
                        </CommentSpan>
                      </>
                    ) : (
                      //수정중이 아니면
                      <>
                        <CommentDateSpan>{formatDate(item.modifiedDate)}</CommentDateSpan>
                        <CommentSpan
                          key="edit"
                          onClick={() => {
                            setEditingCommentId(item.id);
                            setEditedComment(item.content);
                          }}
                        >
                          수정
                        </CommentSpan>
                      </>
                    )
                  ) : null,
                  me && me.userId === item.userId && !isEditing ? ( //수정중이 아닐경우만 삭제 답글 버튼이 나오게
                    <CommentSpan
                      key="delete"
                      onClick={() => {
                        removePostComment(item);
                      }}
                    >
                      삭제
                    </CommentSpan>
                  ) : null,
                  !isEditing && (
                    <CommentSpan
                      key="reply"
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
                    </CommentSpan>
                  ),
                ]}
              >
                <>
                  {isEditing ? (
                    <Input.TextArea
                      style={{ padding: "1rem", resize: "none" }}
                      maxLength="100"
                      value={editedComment} //수정중인 댓글 바로 값으로 등록
                      onChange={(e) => setEditedComment(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (isEditing) {
                            if (me === null) {
                              alert("로그인이 필요한 기능입니다.");
                            } else {
                              updatePostComment(item, editedComment);
                              setEditingCommentId("");
                            }
                          }
                        }
                      }}
                    />
                  ) : (
                    <List.Item.Meta title={item.userId} description={<div>{item.content}</div>} />
                  )}
                </>
              </List.Item>
              <SchoolBoardDetailCommentForm
                parentId={parentId}
                setParentId={setParentId}
                setCommentNum={setCommentNum}
                item={item}
                isEditing={isEditing}
                addCommentReply={addCommentReply}
              />
              <SchoolBoardDetailReplys
                info={item}
                removePostComment={removePostComment}
                updatePostComment={updatePostComment}
                setCommentNum={setCommentNum}
                setParentId={setParentId}
                editedComment={editedComment}
                setEditedComment={setEditedComment}
              />
            </>
          );
        }}
      />
    </Col>
  );
};

export default SchoolBoardDetailComments;
