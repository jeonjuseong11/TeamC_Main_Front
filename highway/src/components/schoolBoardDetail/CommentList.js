import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Dropdown, List, Menu, Input, Button } from "antd";
import { CommentDateSpan } from "./SchoolBoardDetailComments";
import { formatDate } from "./ToggleComment";
import { EllipsisOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_POST_COMMENTS_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { schoolBoardPostComments } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const replyInputRef = useRef(null);
  const [replyVisibleMap, setReplyVisibleMap] = useState({});

  useEffect(() => {
    loadPostComments(postId);
  }, [postId]);

  const loadPostComments = (postId) => {
    if (postId) {
      dispatch({
        type: LOAD_POST_COMMENTS_REQUEST,
        data: {
          boardId: postId,
        },
      });
    }
  };

  const updatePostComment = useCallback(
    (id, editedComment) => {
      dispatch({
        type: UPDATE_POST_COMMENT_REQUEST,
        data: {
          id: id,
          content: editedComment,
          boardId: postId,
        },
      });
      setEditedComment("");
      setEditCommentId(null);
    },
    [dispatch, postId]
  );

  const removePostComment = useCallback(
    (id) => {
      dispatch({
        type: REMOVE_POST_COMMENT_REQUEST,
        data: {
          id: id,
          boardId: postId,
        },
      });
    },
    [dispatch, postId]
  );

  const addPostComment = useCallback(
    (parentId) => {
      if (editedComment.trim() !== "") {
        dispatch({
          type: ADD_POST_COMMENT_REQUEST,
          data: {
            content: editedComment,
            boardId: postId,
            parentId: parentId,
          },
        });
        setEditedComment("");
        setReplyVisibleMap({});
      }
    },
    [dispatch, editedComment, postId]
  );

  const handleEdit = useCallback(
    (item) => {
      if (me?.userId === item?.userId) {
        setEditedComment(item.content);
        setEditCommentId(item.id);
      }
    },
    [me]
  );

  const cancelEdit = useCallback(() => {
    setEditedComment("");
    setEditCommentId(null);
  }, []);

  const handleReply = useCallback((id) => {
    setReplyVisibleMap((prevMap) => ({
      ...prevMap,
      [id]: true,
    }));
  }, []);

  const cancelReply = useCallback(() => {
    setReplyVisibleMap({});
  }, []);

  const renderComment = useCallback(
    (comment) => {
      const { id, content, userId, children, isDeleted, modifiedDate } = comment;
      if (isDeleted) {
        return null;
      }

      const isEditing = editCommentId === id;
      const isContentEmpty = editedComment.trim().length === 0;
      const canEditOrDelete = me?.userId === userId;

      return (
        <List.Item key={id} style={{ textAlign: "left", marginLeft: "1rem" }}>
          <List.Item.Meta
            title={
              <div>
                <span>{userId}</span>
                <span style={{ position: "absolute", right: 0 }}>
                  {canEditOrDelete && (
                    <Dropdown
                      placement="bottomLeft"
                      overlay={
                        <Menu>
                          <Menu.Item onClick={() => handleEdit(comment)}>수정하기</Menu.Item>
                          <Menu.Item danger onClick={() => removePostComment(id)}>
                            삭제하기
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["hover"]}
                    >
                      <EllipsisOutlined />
                    </Dropdown>
                  )}
                </span>
              </div>
            }
            description={
              isEditing ? (
                <>
                  <Input.TextArea
                    rows={4}
                    value={editedComment}
                    style={{ padding: "1rem" }}
                    onChange={(e) => setEditedComment(e.target.value)}
                    placeholder="댓글을 입력해주세요"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "1rem",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => updatePostComment(id, editedComment)}
                      disabled={isContentEmpty || editedComment === content} // 수정된 내용이 없거나 원본과 동일한 경우 버튼 비활성화
                    >
                      저장
                    </Button>
                    <Button type="text" onClick={cancelEdit}>
                      취소
                    </Button>
                  </div>
                </>
              ) : (
                <div style={{ whiteSpace: "pre-wrap" }}>{content}</div>
              )
            }
          />
          <CommentDateSpan>{formatDate(modifiedDate)}</CommentDateSpan>
          <Button type="text" onClick={() => handleReply(id)}>
            답글달기
          </Button>
          {replyVisibleMap[id] && (
            <div style={{ marginTop: "1rem" }}>
              <Input.TextArea
                style={{ padding: "1rem" }}
                ref={replyInputRef}
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                placeholder="댓글을 입력해주세요"
                autoSize={{ minRows: 2, maxRows: 6 }}
                autoFocus
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button type="primary" onClick={() => addPostComment(id)}>
                  댓글 작성
                </Button>
                <Button type="text" onClick={cancelReply}>
                  취소
                </Button>
              </div>
            </div>
          )}

          {children?.length > 0 && (
            <List
              style={{ marginTop: "1rem" }}
              size="small"
              dataSource={children}
              itemLayout="vertical"
              renderItem={(reply) => renderComment(reply)}
            />
          )}
        </List.Item>
      );
    },
    [
      addPostComment,
      cancelEdit,
      cancelReply,
      editCommentId,
      editedComment,
      handleEdit,
      handleReply,
      me,
      removePostComment,
      updatePostComment,
      replyVisibleMap,
    ]
  );

  const filteredComments = schoolBoardPostComments.filter(
    (schoolBoardPostComment) => !schoolBoardPostComment.isDeleted
  );

  return (
    <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }} style={{ marginBottom: "3rem" }}>
      {filteredComments.length !== 0 ? (
        <List
          itemLayout="vertical"
          dataSource={filteredComments}
          renderItem={(comment) => renderComment(comment)}
        />
      ) : (
        <></>
      )}
    </Col>
  );
};

export default CommentList;
