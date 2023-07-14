// Comment 컴포넌트
import React from "react";
import { List, Dropdown, Menu, Input, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { CommentDateSpan } from "./SchoolBoardDetailComments";
import { formatDate } from "./ToggleComment";

const Comment = ({
  comment,
  editedComment,
  editCommentId,
  isReplyVisible,
  replyTargetId,
  replyInputRef,
  handleEdit,
  cancelEdit,
  removePostComment,
  handleReply,
  cancelReply,
  updatePostComment,
  addPostComment,
  setEditedComment,
  setEditCommentId,
  setIsReplyVisible,
  setReplyTargetId,
}) => {
  const { id, content, userId, children, isDeleted, modifiedDate } = comment;
  const isEditing = editCommentId === id;
  const isContentEmpty = editedComment.trim().length === 0;

  const handleEditClick = () => {
    //수정
    handleEdit(comment);
  };
  const handleCancelEdit = () => {
    //수정 취소
    cancelEdit();
  };
  const handleUpdateComment = () => {
    //수정 저장
    updatePostComment(id, editedComment);
  };

  const handleRemoveClick = () => {
    //삭제
    removePostComment(id);
  };

  const handleReplyClick = () => {
    //답글
    handleReply(comment);
  };
  const handleCancelReply = () => {
    //답글 취소
    cancelReply();
  };

  const handleAddComment = () => {
    //댓글 달기
    addPostComment();
  };

  return (
    <List.Item key={id} style={{ textAlign: "left", marginLeft: "1rem" }}>
      <List.Item.Meta
        title={
          <div>
            <span>{userId}</span>
            <span style={{ position: "absolute", right: 0 }}>
              <Dropdown
                placement="bottomLeft"
                overlay={
                  <Menu>
                    <Menu.Item onClick={handleEditClick}>수정하기</Menu.Item>
                    <Menu.Item danger onClick={handleRemoveClick}>
                      삭제하기
                    </Menu.Item>
                  </Menu>
                }
                trigger={["hover"]}
              >
                <EllipsisOutlined />
              </Dropdown>
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
                  onClick={handleUpdateComment}
                  disabled={isContentEmpty || editedComment === content}
                >
                  저장
                </Button>
                <Button type="text" onClick={handleCancelEdit}>
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
      <Button type="text" onClick={handleReplyClick}>
        답글달기
      </Button>
      {children?.length > 0 && (
        <List
          style={{ marginTop: "1rem" }}
          size="small"
          dataSource={children}
          itemLayout="vertical"
          renderItem={(reply) => (
            <Comment
              comment={reply}
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
      )}
      {isReplyVisible && replyTargetId === comment.id && (
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
            <Button type="primary" onClick={handleAddComment}>
              댓글 작성
            </Button>
            <Button type="text" onClick={handleCancelReply}>
              취소
            </Button>
          </div>
        </div>
      )}
    </List.Item>
  );
};

export default Comment;
