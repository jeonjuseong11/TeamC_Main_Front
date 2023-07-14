// CommentList 컴포넌트
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_POST_COMMENTS_REQUEST,
  REMOVE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_REQUEST,
} from "../../constants/actionTypes";
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const CommentList = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { schoolBoardPostComments } = useSelector((state) => state.post);
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  const [replyTargetId, setReplyTargetId] = useState(null);
  const replyInputRef = useRef(null);

  useEffect(() => {
    loadPostComments(postId);
  }, [postId]);

  const loadPostComments = useCallback(
    (postId) => {
      if (postId) {
        dispatch({
          type: LOAD_POST_COMMENTS_REQUEST,
          data: {
            boardId: postId,
          },
        });
      }
    },
    [dispatch]
  );

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

  const addPostComment = useCallback(() => {
    if (editedComment.trim() !== "") {
      dispatch({
        type: ADD_POST_COMMENT_REQUEST,
        data: {
          content: editedComment,
          boardId: postId,
          parentId: replyTargetId,
        },
      });
      setEditedComment("");
      setReplyTargetId(null);
      setIsReplyVisible(false);
    }
  }, [dispatch, editedComment, postId, replyTargetId]);

  const handleEdit = useCallback((item) => {
    setEditedComment(item.content);
    setEditCommentId(item.id);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditedComment("");
    setEditCommentId(null);
  }, []);

  const handleReply = useCallback((item) => {
    setIsReplyVisible(true);
    setReplyTargetId(item.id);
  }, []);

  const cancelReply = useCallback(() => {
    setIsReplyVisible(false);
    setReplyTargetId(null);
  }, []);

  const filteredComments = schoolBoardPostComments.filter(
    (schoolBoardPostComment) => !schoolBoardPostComment.isDeleted
  );

  return (
    <Col xs={{ span: 24, offset: 0 }} md={{ span: 11, offset: 4 }} style={{ marginBottom: "3rem" }}>
      {filteredComments.length !== 0 ? (
        <List
          itemLayout="vertical"
          dataSource={filteredComments}
          renderItem={(comment) => (
            <Comment
              comment={comment}
              editedComment={editedComment}
              editCommentId={editCommentId}
              isReplyVisible={isReplyVisible}
              replyTargetId={replyTargetId}
              replyInputRef={replyInputRef}
              handleEdit={handleEdit}
              cancelEdit={cancelEdit}
              removePostComment={removePostComment}
              handleReply={handleReply}
              cancelReply={cancelReply}
              updatePostComment={updatePostComment}
              addPostComment={addPostComment}
              setEditedComment={setEditedComment}
              setEditCommentId={setEditCommentId}
              setIsReplyVisible={setIsReplyVisible}
              setReplyTargetId={setReplyTargetId}
            />
          )}
        />
      ) : (
        <></>
      )}
    </Col>
  );
};

export default CommentList;
