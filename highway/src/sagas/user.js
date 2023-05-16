import axios from "axios";
import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  CHECK_DUPLICATE_ID_REQUEST,
  CHECK_DUPLICATE_ID_SUCCESS,
  CHECK_DUPLICATE_ID_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from "../constants/actionTypes";

const checkUserIdAPI = (data) => {
  // console.log(data);
  return axios.get(`/user/idCheck?userId=${data}`);
};
function* checkUserId(action) {
  try {
    // console.log(action.data);
    const result = yield call(checkUserIdAPI, action.data);
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

const logInAPI = (data) => {
  return axios.post(`user/signIn?userId=${data.userId}&userPw=${data.userPw}`, data);
};
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    // console.log(result.data.token);//토큰 확인용
    axios.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
    console.log(result.data.userNo);
    localStorage.setItem("ACCESSTOKEN", result.data.token);
    yield put({
      type: LOAD_USER_REQUEST,
      data: result.data.userNo,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

const signUpAPI = (data) => {
  return axios.post(
    `/user/join?userId=${data.userId}&userPw=${data.userPw}&userName=${data.userName}&userEmail=${data.userEmail}&userSex=${data.userSex}&userAge=${data.userAge}`
  );
};
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut() {
  try {
    localStorage.removeItem("ACCESSTOKEN");
    localStorage.removeItem("USERINFO");
    delete axios.defaults.headers.common["Authorization"];
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}
const loadUserAPI = (data) => {
  return axios.get(
    `/user/info?userNo=${data}`
    // headers: { Authorization: `Bearer ${token}` },
  );
};

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    console.log(action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      data: e.response.data,
    });
  }
}

function* watchCheckUserId() {
  yield takeLatest(CHECK_DUPLICATE_ID_REQUEST, checkUserId);
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
  yield all([
    fork(watchCheckUserId),
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
  ]);
}
