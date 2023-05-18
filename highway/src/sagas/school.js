import axios from "axios";
import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
} from "../constants/actionTypes";

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
  return axios.post(`/school/${data.schoolId.schoolId}/review`, data);
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

function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

export default function* userSaga() {
  yield all([fork(watchAddReview)]);
}
