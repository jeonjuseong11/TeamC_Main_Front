import { List, Input } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../pages/Board/BoardMain";
import {
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { CommentSpan } from "./SchoolBoardDetailComments";

const SchoolBoardDetailReplys = ({ info, updatePostComment, removePostComment }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");

  const handleKeyDown = (e, item) => {
    if (e.key === "Enter") {
      if (!me) {
        alert("로그인이 필요한 기능입니다.");
      } else {
        updatePostComment(item, editedComment);
        setEditingCommentId("");
      }
    }
  };

  return (
    <>
      {info.children.length === 0 ? (
        <></>
      ) : (
        <List
          itemLayout="vertical"
          dataSource={info.children}
          style={{ textAlign: "left" }}
          renderItem={(item) => {
            const isEditing = editingCommentId === item.id;

            return (
              <List.Item
                style={{
                  background: "#f2f2f2",
                  borderBottom: "1px solid #d2d2d2",
                }}
              >
                {me && me.userId === item.userId && (
                  <div>
                    {isEditing ? (
                      <>
                        <Input.TextArea
                          style={{ padding: "1rem", resize: "none" }}
                          maxLength="100"
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, item)}
                        />
                        <CommentSpan
                          onClick={() => {
                            updatePostComment(item, editedComment);
                            setEditingCommentId("");
                          }}
                        >
                          수정완료
                        </CommentSpan>
                        <CommentSpan
                          onClick={() => {
                            setEditingCommentId("");
                            setEditedComment("");
                          }}
                        >
                          취소
                        </CommentSpan>
                      </>
                    ) : (
                      <>
                        <List.Item.Meta
                          title={item.userId}
                          description={<div> {item.content}</div>}
                        />
                        <CommentSpan>{formatDate(item.modifiedDate)}</CommentSpan>
                        <CommentSpan
                          onClick={() => {
                            setEditingCommentId(item.id);
                            setEditedComment(item.content);
                          }}
                        >
                          수정
                        </CommentSpan>
                        <CommentSpan onClick={() => removePostComment(item)}>삭제</CommentSpan>
                      </>
                    )}
                  </div>
                )}
              </List.Item>
            );
          }}
        />
      )}
    </>
  );
};

export default SchoolBoardDetailReplys;
