import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
  ADD_POST_COMMENT_FAILURE,
  ADD_POST_COMMENT_REQUEST,
  ADD_POST_COMMENT_SUCCESS,
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
} from "../constants/actionTypes";
import { REMOVE_POST_OF_ME } from "../constants/actionTypes";

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

function loadUserPostsAPI(data) {
  //좋아요 누른 게시글 로딩
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  axios.defaults.headers.common["ACCESS_TOKEN"] = localAccessToken;
  return axios.get(`/board/list/heart`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data.data,
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
      data: { category: action.data.category, schoolId: action.data.schoolId },
    });
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
  return axios.delete(`board?id=${data.id}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data.board.id,
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
  return axios.put(
    `board?title=${data.title}&content=${data.content}&category=${data.category}&id=${data.id}`,
    data
  );
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

function addPostCommentAPI(data) {
  // 게시물 댓글 작성
  // return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
  return axios.post(`/comment`, data); // POSTMAN에 나온 주소
}

function* addPostComment(action) {
  try {
    const result = yield call(addPostCommentAPI, action.data);
    yield put({
      type: ADD_POST_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_POST_COMMENTS_REQUEST,
      data: { boardId: action.data.boardId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostCommentsAPI(data) {
  //학교 게시판 댓글 조회
  return axios.get(`/comment/list/${data.boardId}`);
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
  return axios.put(`/comment/delete`, data);
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
  return axios.put(`/comment`, data);
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
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
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

function* watchAddPostComment() {
  yield takeLatest(ADD_POST_COMMENT_REQUEST, addPostComment);
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
    fork(watchAddPostComment),
    fork(watchLoadPostComments),
    fork(watchUpdatePostComment),
    fork(watchRemovePostComment),
  ]);
}
