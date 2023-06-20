import axios from "axios";
import { call, put, all, fork, takeLatest, throttle } from "redux-saga/effects";
import {
  ADD_SCHOOL_REVIEW_REQUEST,
  ADD_SCHOOL_REVIEW_FAILURE,
  ADD_SCHOOL_REVIEW_SUCCESS,
  LOAD_SCHOOL_INFO_SUCCESS,
  LOAD_SCHOOL_INFO_FAILURE,
  LOAD_SCHOOL_INFO_REQUEST,
  LOAD_SCHOOL_LIST_SUCCESS,
  LOAD_SCHOOL_LIST_FAILURE,
  LOAD_SCHOOL_LIST_REQUEST,
  LOAD_SCHOOL_REVIEWS_SUCCESS,
  LOAD_SCHOOL_REVIEWS_FAILURE,
  LOAD_SCHOOL_REVIEWS_REQUEST,
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
  // return axios.get(`/school/info?schId=${data.schoolId}`); 백엔드 오류 수정시 다시 주석 해제
};
function* loadSchoolInfo(action) {
  // const result = yield call(loadSchoolInfoAPI, action.data);
  try {
    yield put({
      type: LOAD_SCHOOL_INFO_SUCCESS,
      data: action.data, //result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SCHOOL_INFO_FAILURE,
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
    // console.log(action.data);
    yield put({
      type: LOAD_SCHOOL_REVIEWS_SUCCESS,
      data: result.data,
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
    // console.log(action.data);
    // console.log(result.data.schoolId.id);
    yield put({
      type: ADD_SCHOOL_REVIEW_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_SCHOOL_REVIEWS_REQUEST,
      data: { schoolId: result.data.schoolId.id },
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SCHOOL_REVIEW_FAILURE,
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

export default function* userSaga() {
  yield all([
    fork(watchAddSchoolReview),
    fork(watchLoadSchoolInfo),
    fork(watchLoadSchoolList),
    fork(watchLoadSchoolReview),
  ]);
}
