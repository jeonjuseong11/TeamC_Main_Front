import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_TAG_POSTS_FAILURE,
  LOAD_TAG_POSTS_REQUEST,
  LOAD_TAG_POSTS_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  LOAD_POST_COMMENTS_FAILURE,
  LOAD_POST_COMMENTS_REQUEST,
  LOAD_POST_COMMENTS_SUCCESS,
  UPDATE_POST_COMMENT_REQUEST,
  UPDATE_POST_COMMENT_SUCCESS,
  UPDATE_POST_COMMENT_FAILURE,
  REMOVE_POST_COMMENT_REQUEST,
  REMOVE_POST_COMMENT_SUCCESS,
  REMOVE_POST_COMMENT_FAILURE,
  ADD_POST_COMMENT_REPLY_FAILURE,
  ADD_POST_COMMENT_REPLY_REQUEST,
  ADD_POST_COMMENT_REPLY_SUCCESS,
} from "../constants/actionTypes";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../constants/actionTypes";

function uploadImagesAPI(data) {
  //이미지 업로드
  return axios.post("", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  //게시글 좋아요
  return axios.post(`heart?boardId=${data.boardId}`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data.data,
    });
    yield put({
      type: LOAD_POST_REQUEST,
      data: action.data.boardId,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  //게시글 좋아요 취소
  return axios.delete(`heart?heartId=${data.heartId}`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: { data: result.data.data, heartId: action.data.heartId },
    });
    yield put({
      type: LOAD_POST_REQUEST,
      data: action.data.boardId,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  //단일 게시글 로딩
  return axios.get(`/board/detail/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    // console.log(result.data.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function loadUserPostsAPI(data, lastId) {
  //사용자 게시글 로딩
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function loadTagPostsAPI(data, lastId) {
  //특정 게시판 게시글 로딩
  return axios.get(``);
}

function* loadTagPosts(action) {
  try {
    const result = yield call(loadTagPostsAPI, action.data);
    yield put({
      type: LOAD_TAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TAG_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function loadPostsAPI(data) {
  // console.log(data)
  return axios.get(`/board/list/${data.schoolId}?cateNo=${data.category}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  //게시글 작성
  return axios.post(
    `/board?title=${data.title}&content=${data.content}&category=${data.category}`,
    data
  );
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POSTS_REQUEST,
      data: action.data.category,
    });
    // yield put({
    //   type: ADD_POST_TO_ME,
    //   data: result.data.id,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  //게시글 삭제
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostAPI(data) {
  //게시글 수정
  return axios.patch(`/post/${data.PostId}`, data);
}

function* updatePost(action) {
  try {
    const result = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  // 게시물 댓글 작성
  // return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
  return axios.post(`/comment?content=${data.content}&boardId=${data.boardId}`, data); // POSTMAN에 나온 주소
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: { boardId: action.data.boardId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostCommentsAPI(data) {
  //학교 게시판 댓글 조회
  return axios.get(`/comment/list?boardId=${data.boardId}`);
}

function* loadPostComments(action) {
  try {
    const result = yield call(loadPostCommentsAPI, action.data);
    yield put({
      type: LOAD_POST_COMMENTS_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_COMMENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostCommentAPI(data) {
  // 게시물 댓글 삭제
  return axios.delete(`/comment/?id=${data.id}`, data);
}

function* removePostComment(action) {
  try {
    const result = yield call(removePostCommentAPI, action.data);
    yield put({
      type: REMOVE_POST_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: { boardId: action.data.boardId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function updatePostCommentAPI(data) {
  // 게시물 댓글 수정
  return axios.put(`/comment/?id=${data.id}&content=${data.content}`, data);
}

function* updatePostComment(action) {
  try {
    const result = yield call(updatePostCommentAPI, action.data);
    yield put({
      type: UPDATE_POST_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: { boardId: action.data.boardId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentReplyAPI(data) {
  // 게시물 대댓글 작성
  // return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
  return axios.post(
    `/comment?content=${data.content}&boardId=${data.boardId}&parentId=${data.parentId}`,
    data
  ); // POSTMAN에 나온 주소
}

function* addCommentReply(action) {
  try {
    const result = yield call(addCommentReplyAPI, action.data);
    yield put({
      type: ADD_POST_COMMENT_REPLY_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: { boardId: action.data.boardId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_COMMENT_REPLY_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchLikePost() {
  yield throttle(5000, LIKE_POST_REQUEST, likePost);
  // yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  // yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
  yield throttle(5000, UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadTagPosts() {
  yield throttle(5000, LOAD_TAG_POSTS_REQUEST, loadTagPosts);
}

function* watchLoadPosts() {
  // yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPostComments() {
  yield takeLatest(LOAD_POST_COMMENTS_REQUEST, loadPostComments);
}

function* watchUpdatePostComment() {
  yield takeLatest(UPDATE_POST_COMMENT_REQUEST, updatePostComment);
}

function* watchRemovePostComment() {
  yield takeLatest(REMOVE_POST_COMMENT_REQUEST, removePostComment);
}

function* watchAddCommentReply() {
  yield takeLatest(ADD_POST_COMMENT_REPLY_REQUEST, addCommentReply);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchAddPost),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchLoadTagPosts),
    fork(watchLoadPosts),
    fork(watchRemovePost),
    fork(watchUpdatePost),
    fork(watchAddComment),
    fork(watchLoadPostComments),
    fork(watchUpdatePostComment),
    fork(watchRemovePostComment),
    fork(watchAddCommentReply),
  ]);
}
