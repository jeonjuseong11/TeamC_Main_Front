import axios from "axios";
import { all, fork, put, takeLatest, call } from "redux-saga/effects";

import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
} from "../reducers/post";

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function addReviewAPI(data) {
  return axios.post(`/post/${data.postId}/review`, data); // POST /post/1/review
}

function* addReview(action) {
  try {
    const result = yield call(addReviewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

export default function* postSaga() {
  yield all([fork(watchAddComment), fork(watchAddReview)]);
}
