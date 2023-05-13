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
} from "../constants/actionTypes";

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
  idValid: false,
  token: localStorage.getItem("token"), //jwt 토큰
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_DUPLICATE_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      // 요기가 saga에 의해 실행된다.
      case CHECK_DUPLICATE_ID_SUCCESS:
        draft.idValid = action.data;
        draft.checkIdLoading = false;
        draft.checkIdDone = true;
        break;
      case CHECK_DUPLICATE_ID_FAILURE:
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
        draft.token = action.data.token;
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.myNo = action.data;
        break;
      case LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      // 회원가입
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGNUP_SUCCESS:
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
        draft.token = action.data;
        break;
      case LOGOUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
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
        break;

      default:
        return state;
    }
  });

export default reducer;
