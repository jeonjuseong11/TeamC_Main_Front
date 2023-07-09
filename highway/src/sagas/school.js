import axios from "axios";
import { call, put, all, fork, takeLatest, throttle } from "redux-saga/effects";
import {
  ADD_SCHOOL_REVIEW_REQUEST,
  ADD_SCHOOL_REVIEW_FAILURE,
  ADD_SCHOOL_REVIEW_SUCCESS,
  REMOVE_SCHOOL_REVIEW_REQUEST,
  REMOVE_SCHOOL_REVIEW_SUCCESS,
  REMOVE_SCHOOL_REVIEW_FAILURE,
  UPDATE_SCHOOL_REVIEW_REQUEST,
  UPDATE_SCHOOL_REVIEW_SUCCESS,
  UPDATE_SCHOOL_REVIEW_FAILURE,
  LOAD_SCHOOL_INFO_SUCCESS,
  LOAD_SCHOOL_INFO_FAILURE,
  LOAD_SCHOOL_INFO_REQUEST,
  LOAD_SCHOOL_LIST_SUCCESS,
  LOAD_SCHOOL_LIST_FAILURE,
  LOAD_SCHOOL_LIST_REQUEST,
  LOAD_SCHOOL_REVIEWS_SUCCESS,
  LOAD_SCHOOL_REVIEWS_FAILURE,
  LOAD_SCHOOL_REVIEWS_REQUEST,
  LOAD_SAVED_SCHOOL_FAILURE,
  LOAD_SAVED_SCHOOL_SUCCESS,
  LOAD_SAVED_SCHOOL_REQUEST,
  UPDATE_POST_COMMENT_FAILURE,
  LOAD_POST_COMMENTS_REQUEST,
  UPDATE_POST_COMMENT_SUCCESS,
  ADD_SAVED_SCHOOL_REQUEST,
  ADD_SAVED_SCHOOL_SUCCESS,
  ADD_SAVED_SCHOOL_FAILURE,
  REMOVE_SAVED_SCHOOL_SUCCESS,
  REMOVE_SAVED_SCHOOL_FAILURE,
  REMOVE_SAVED_SCHOOL_REQUEST,
} from "../constants/actionTypes";

const loadSchoolListAPI = () => {
  return axios.get("/school/list");
};
function* loadSchoolList() {
  const result = yield call(loadSchoolListAPI);
  try {
    yield put({
      type: LOAD_SCHOOL_LIST_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SCHOOL_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
const loadSchoolInfoAPI = (data) => {
  return axios.get(`/school/info?schId=${data.schoolId}`); //백엔드 오류 수정시 다시 주석 해제
};
function* loadSchoolInfo(action) {
  const result = yield call(loadSchoolInfoAPI, action.data);
  try {
    yield put({
      type: LOAD_SCHOOL_INFO_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SCHOOL_INFO_FAILURE,
      error: err.response.data,
    });
  }
}
const loadSavedSchoolsAPI = () => {
  //찜한 학교 보기
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  axios.defaults.headers.common["ACCESS_TOKEN"] = localAccessToken;
  return axios.get(`/school/heart`);
};
function* loadSavedSchools(action) {
  const result = yield call(loadSavedSchoolsAPI, action.data);
  try {
    yield put({
      type: LOAD_SAVED_SCHOOL_SUCCESS,
      data: result.data.data, //result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SAVED_SCHOOL_FAILURE,
      error: err.response.data,
    });
  }
}
const addSavedSchoolAPI = (schoolId) => {
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  axios.defaults.headers.common["ACCESS_TOKEN"] = localAccessToken;
  const formData = new FormData();
  formData.append("schoolId", schoolId);

  return axios.post(`/school/heart`, formData);
};

function* addSavedSchool(action) {
  const result = yield call(addSavedSchoolAPI, action.data.schoolId);
  try {
    yield put({
      type: ADD_SAVED_SCHOOL_SUCCESS,
      data: result.data.data, //result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SAVED_SCHOOL_FAILURE,
      error: err.response.data,
    });
  }
}
const removeSavedSchoolAPI = (heartId) => {
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  axios.defaults.headers.common["ACCESS_TOKEN"] = localAccessToken;
  const formData = new FormData();
  formData.append("heartId", heartId);
  //찜한 학교 보기
  // return axios.delete(`/school/heart`, { heartId: formData });
  return axios.delete(`/school/heart?heartId=${heartId}`);
};
function* removeSavedSchool(action) {
  const result = yield call(removeSavedSchoolAPI, action.data.heartId);
  console.log(result.data);
  try {
    yield put({
      type: REMOVE_SAVED_SCHOOL_SUCCESS,
      data: result.data.data, //result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_SAVED_SCHOOL_FAILURE,
      error: err.response.data,
    });
  }
}
const loadSchoolReviewsAPI = (data) => {
  //학교 리뷰 로딩
  return axios.get(`/review?schoolId=${data.schoolId}`);
};
function* loadSchoolReviews(action) {
  try {
    const result = yield call(loadSchoolReviewsAPI, action.data); //schoolId
    yield put({
      type: LOAD_SCHOOL_REVIEWS_SUCCESS,
      data: result.data.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SCHOOL_REVIEWS_FAILURE,
      error: err.response.data,
    });
  }
}
// const loadSchoolAPI = (data) => {
//   // console.log(data);
//   return axios.get(`/school/loadSchoolApi?schoolid=${data}`);
// };
// function* loadSchool(action) {
//   try {
//     // console.log(action.data);
//     const result = yield call(loadSchoolAPI, action.data);
//     yield put({
//       type: CHECK_DUPLICATE_ID_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: CHECK_DUPLICATE_ID_FAILURE,
//       error: err.response.data,
//     });
//   }
// }
function addSchoolReviewAPI(data) {
  return axios.post(`/review`, data);
}

function* addSchoolReview(action) {
  // console.log(action.data.values);
  try {
    const result = yield call(addSchoolReviewAPI, action.data);
    yield put({
      type: ADD_SCHOOL_REVIEW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: { schoolId: action.data.schoolId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SCHOOL_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}
function removeSchoolReviewAPI(data) {
  // 게시물 댓글 삭제
  return axios.post(`/review/${data.id}`);
}

function* removeSchoolReview(action) {
  try {
    const result = yield call(removeSchoolReviewAPI, action.data);
    yield put({
      type: REMOVE_SCHOOL_REVIEW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: { schoolId: action.data.schoolId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_SCHOOL_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}
function updateSchoolReviewAPI(data) {
  // 게시물 댓글 삭제
  return axios.put(`/review/${data.id}`);
}

function* updateSchoolReview(action) {
  try {
    const result = yield call(updateSchoolReviewAPI, action.data);
    yield put({
      type: UPDATE_SCHOOL_REVIEW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: { schoolId: action.data.schoolId },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_SCHOOL_REVIEW_FAILURE,
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
// function* watchLoadSchool() {
//   yield takeLatest(CHECK_DUPLICATE_ID_REQUEST, loadSchool);
// }

function* watchLoadSchoolList() {
  // yield throttle(5000, LOAD_SCHOOL_LIST_REQUEST, loadSchoolList);
  yield takeLatest(LOAD_SCHOOL_LIST_REQUEST, loadSchoolList);
}
function* watchLoadSchoolInfo() {
  yield takeLatest(LOAD_SCHOOL_INFO_REQUEST, loadSchoolInfo);
}

function* watchAddSchoolReview() {
  yield takeLatest(ADD_SCHOOL_REVIEW_REQUEST, addSchoolReview);
}
function* watchLoadSchoolReview() {
  yield takeLatest(LOAD_SCHOOL_REVIEWS_REQUEST, loadSchoolReviews);
}
function* watchRemoveSchoolReview() {
  yield takeLatest(REMOVE_SCHOOL_REVIEW_REQUEST, removeSchoolReview);
}
function* watchLoadSavedSchools() {
  yield takeLatest(LOAD_SAVED_SCHOOL_REQUEST, loadSavedSchools);
}
function* watchAddSavedSchool() {
  yield takeLatest(ADD_SAVED_SCHOOL_REQUEST, addSavedSchool);
}
function* watchRemoveSavedSchool() {
  yield takeLatest(REMOVE_SAVED_SCHOOL_REQUEST, removeSavedSchool);
}
function* watchUpdateSchoolReview() {
  yield takeLatest(UPDATE_SCHOOL_REVIEW_REQUEST, updateSchoolReview);
}

export default function* userSaga() {
  yield all([
    fork(watchAddSchoolReview),
    fork(watchLoadSchoolInfo),
    fork(watchLoadSchoolList),
    fork(watchLoadSchoolReview),
    fork(watchLoadSavedSchools),
    fork(watchAddSavedSchool),
    fork(watchRemoveSavedSchool),
    fork(watchRemoveSchoolReview),
    fork(watchUpdateSchoolReview),
  ]);
}
