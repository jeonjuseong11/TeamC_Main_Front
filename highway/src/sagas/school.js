import axios from "axios";
import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  CHECK_DUPLICATE_ID_REQUEST,
  CHECK_DUPLICATE_ID_SUCCESS,
  CHECK_DUPLICATE_ID_FAILURE,
} from "../constants/actionTypes";

const loadSchoolAPI = (data) => {
  // console.log(data);
  return axios.get(`/school/loadSchoolApi?schoolid=${data}`);
};
function* loadSchool(action) {
  try {
    // console.log(action.data);
    const result = yield call(loadSchoolAPI, action.data);
    yield put({
      type: CHECK_DUPLICATE_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_DUPLICATE_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadSchool() {
  yield takeLatest(CHECK_DUPLICATE_ID_REQUEST, loadSchool);
}

export default function* userSaga() {
  yield all([fork(watchLoadSchool)]);
}
