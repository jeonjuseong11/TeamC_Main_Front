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
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
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
  return axios.post(
    `user/login?userId=${data.userId}&userPw=${data.userPw}`,
    data
  );
};
function setAccessToken(accessToken, refreshToken, expiration) {
  localStorage.removeItem("ACCESSTOKEN");
  localStorage.removeItem("EXPIRES");
  localStorage.removeItem("REFRESHTOKEN");
  localStorage.setItem("ACCESSTOKEN", accessToken);
  localStorage.setItem("EXPIRES", expiration);
  localStorage.setItem("REFRESHTOKEN", refreshToken);
  // 현재 도메인의 쿠키에 accessToken을 설정
  // document.cookie = `accessToken=${accessToken}; path=/; Secure; HttpOnly`;
  // console.log(data.access_TOKEN_EXPIRATION);
  // const expires = new Date(expiration);
  // cookie.save("accessToken", token, {
  //   path: "/",
  //   expires,
  //   // httpOnly: true,
  //   // secure: true,
  //   // sameSite: "strict",
  // });
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    const { access_TOKEN, access_TOKEN_EXPIRATION, refresh_TOKEN } =
      result.data;
    // console.log(result.data.token);//토큰 확인용
    axios.defaults.headers.common["ACCESS_TOKEN"] = `${access_TOKEN}`;
    setAccessToken(access_TOKEN, refresh_TOKEN, access_TOKEN_EXPIRATION);

    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
    yield put({
      type: LOAD_USER_REQUEST,
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
    delete axios.defaults.headers.common["ACCESS_TOKEN"];
    localStorage.removeItem("ACCESSTOKEN");
    localStorage.removeItem("EXPIRES");
    localStorage.removeItem("REFRESHTOKEN");

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
const loadUserAPI = () => {
  // console.log(access);

  return axios.get(
    `/user/info`
    // headers: { Authorization: `Bearer ${token}` },
  );
};

function* loadUser() {
  try {
    const result = yield call(loadUserAPI);
    // console.log(action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data.body,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_FAILURE,
      data: e.response.data,
    });
    alert(e.response.data);
  }
}
const refreshTokenAPI = () => {
  // console.log(access);
  const localAccessToken = localStorage.getItem("ACCESSTOKEN");
  const localRefreshToken = localStorage.getItem("REFRESHTOKEN");
  axios.defaults.headers.common["REFRESH_TOKEN"] = localRefreshToken;
  axios.defaults.headers.common["ACCESS_TOKEN"] = localAccessToken;
  return axios.post(`/user/issue`);
};

function* refreshToken() {
  try {
    const result = yield call(refreshTokenAPI);
    const { access_TOKEN, refresh_TOKEN, access_TOKEN_EXPIRATION } =
      result.data;
    axios.defaults.headers.common["ACCESS_TOKEN"] = access_TOKEN;
    setAccessToken(access_TOKEN, refresh_TOKEN, access_TOKEN_EXPIRATION);
    // console.log(action.data);
    yield put({
      type: REFRESH_TOKEN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: REFRESH_TOKEN_FAILURE,
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
function* watchRefreshToken() {
  yield takeLatest(REFRESH_TOKEN_REQUEST, refreshToken);
}

export default function* userSaga() {
  yield all([
    fork(watchCheckUserId),
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchRefreshToken),
  ]);
}
