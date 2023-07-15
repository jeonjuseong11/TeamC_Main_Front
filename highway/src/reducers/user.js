import { message, Modal } from "antd";
import { produce } from "immer";
import {
  CHECK_DUPLICATE_ID_REQUEST,
  CHECK_DUPLICATE_ID_SUCCESS,
  CHECK_DUPLICATE_ID_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
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
  RESET_DUPLICATE_ID_REQUEST,
} from "../constants/actionTypes";
import { error, success } from "../utils/Message";

export const initialState = {
  checkIdLoading: false, // 유저 아이디 중복확인 시도중
  checkIdDone: false,
  checkIdError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  loadUserLoading: false, //유저 정보 로딩 시도중
  loadUserDone: false,
  loadUserError: null,
  myNo: null, //로그인한 유저 번호(백엔드쪽)
  me: null, //로그인한 유저 정보
  idValid: null,
  refreshToken: null, //jwt 토큰
  accessToken: null,
  expire: null,
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case RESET_DUPLICATE_ID_REQUEST:
        draft.idValid = null;
        break;
      case CHECK_DUPLICATE_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      case CHECK_DUPLICATE_ID_SUCCESS:
        draft.idValid = action.data;
        draft.checkIdLoading = false;
        draft.checkIdDone = true;
        break;
      case CHECK_DUPLICATE_ID_FAILURE:
        draft.idValid = false;
        draft.checkIdLoading = false;
        draft.checkIdError = action.error;
        break;
      // 로그인
      case LOGIN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        break;
      case LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        error("아이디, 비밀번호를 확인해주세요");
        break;
      // 회원가입
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGNUP_SUCCESS:
        success("회원가입 성공");
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      // 로그아웃
      case LOGOUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOGOUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        draft.refreshToken = null;
        draft.accessToken = null;
        break;
      case LOGOUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        error("로그아웃 실패");
        break;
      case LOAD_USER_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_USER_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_USER_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        error("유저 정보를 불러오지 못했습니다");
        break;
      case REFRESH_TOKEN_REQUEST:
        draft.refreshTokenLoading = true;
        draft.refreshTokenError = null;
        draft.refreshTokenDone = false;
        break;
      case REFRESH_TOKEN_SUCCESS:
        draft.accessToken = action.data.access_TOKEN;
        draft.refreshToken = action.data.refresh_TOKEN;
        draft.expire = action.data.access_TOKEN_EXPIRATION;
        draft.refreshTokenLoading = false;
        draft.refreshTokenDone = true;
        break;
      case REFRESH_TOKEN_FAILURE:
        draft.refreshTokenLoading = false;
        draft.refreshTokenError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
