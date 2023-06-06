import axios from "axios";
import { call, put, all, fork, takeLatest, throttle } from "redux-saga/effects";
import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  LOAD_SCHOOL_INFO_SUCCESS,
  LOAD_SCHOOL_INFO_FAILURE,
  LOAD_SCHOOL_INFO_REQUEST,
  LOAD_SCHOOL_LIST_SUCCESS,
  LOAD_SCHOOL_LIST_FAILURE,
  LOAD_SCHOOL_LIST_REQUEST,
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
  return axios.get(`/school/info?schId=${data.schoolId}`);
};
function* loadSchoolInfo(action) {
  const result = yield call(loadSchoolInfoAPI, action.data);
  try {
    yield put({
      type: LOAD_SCHOOL_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SCHOOL_INFO_FAILURE,
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
function addReviewAPI(data) {
  return axios.post(`/school/${data.schoolId}/review`, data);
}

function* addReview(action) {
  // console.log(action.data.values);
  try {
    // const result = yield call(addReviewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

// function* watchLoadSchool() {
//   yield takeLatest(CHECK_DUPLICATE_ID_REQUEST, loadSchool);
// }

function* watchLoadSchoolList() {
  yield throttle(5000, LOAD_SCHOOL_LIST_REQUEST, loadSchoolList);
}
function* watchLoadSchoolInfo() {
  yield takeLatest(LOAD_SCHOOL_INFO_REQUEST, loadSchoolInfo);
}

function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

export default function* userSaga() {
  yield all([fork(watchAddReview), fork(watchLoadSchoolInfo), fork(watchLoadSchoolList)]);
}
