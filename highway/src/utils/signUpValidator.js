// id 유효성 검사
// 영문자로 시작하고, 5~20 길이의 영문자와 숫자의 조합
export const idRegExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{4,19}$/;

export const validateId = (_, value, isIdValid) => {
  const regExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{4,19}$/;
  if (!value) {
    return Promise.reject(new Error("아이디를 입력해주세요"));
  }
  if (!regExp.test(value)) {
    return Promise.reject(new Error("아이디는 5~20자이며 영어와 숫자 조합으로 입력해주세요"));
  }
  return Promise.resolve();
};

// password 유효성 검사
export const validatePassword = (_, value) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%&*()-+=]).{8,50}$/;
  if (!value) {
    return Promise.reject(new Error("비밀번호는 필수 항목입니다."));
  }
  if (!regExp.test(value)) {
    return Promise.reject(new Error("영문 소문자, 대문자, 숫자, 특수문자를 모두 포함해야 합니다"));
  }
  return Promise.resolve();
};

// 닉네임 유효성 검사
// 길이 2~20, 영어, 한국어, 숫자
export const validateNickname = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("닉네임은 필수 항목입니다."));
  }
  if (/\s/.test(value)) {
    return Promise.reject(new Error("닉네임은 공백을 포함 할 수 없습니다"));
  }
  const nicknameLength = value.length;
  if (nicknameLength < 2 || nicknameLength >= 20) {
    return Promise.reject(new Error("한글 1~10자, 영문 및 숫자 2~20자까지 입력해주세요"));
  }
  return Promise.resolve();
};
// email 유효성 검사
export const validateEmail = (_, value) => {
  const regExp = /^[A-Za-z0-9_]+@[A-Za-z0-9]+\.[A-Za-z0-9]+/;
  if (!value) {
    return Promise.reject(new Error("이메일은 필수 항목입니다."));
  }
  if (!value.match(regExp)) {
    return Promise.reject(new Error("올바른 이메일 형식이 아닙니다."));
  }
  return Promise.resolve();
};
//약관 동의 유효성 검사
export const agreeValidate = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("약관에 동의 하셔야 합니다"));
  }
  return Promise.resolve();
};
//나이 유효성 검사
export const validateAge = (_, value) => {
  const regExp = /^[0-9]+$/;
  if (!value) {
    return Promise.reject(new Error("나이는 필수 항목입니다."));
  }
  if (!value.match(regExp)) {
    return Promise.reject(new Error("숫자로만 이루어진 나이 형식이 아닙니다."));
  }
  return Promise.resolve();
};
//역할 선택
export const roleValidate = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("역할를 선택해주세요"));
  }
  return Promise.resolve();
};
//학교 선택 유효성 검사
export const schoolValidate = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("학교를 선택해주세요"));
  }
  return Promise.resolve();
};
