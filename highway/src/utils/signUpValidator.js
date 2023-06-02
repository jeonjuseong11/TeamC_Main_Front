//id 유효성 검사
//영문자로 시작하고, 5~20 길이의 영문자와 숫자의 조합
export const idRegExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{1,20}$/g;

export const validateId = (_, value) => {
  const regExp = /^(?=.*[0-9]+)[a-zA-Z][a-zA-Z0-9]{1,20}$/g;
  if (!value) {
    return Promise.reject(new Error("아이디를 입력해주세요"));
  }
  if (!regExp.test(value)) {
    return Promise.reject(
      new Error("아이디는 1~20자이며 영어와 숫자 조합으로 입력해주세요")
    );
  }
  return Promise.resolve();
};

// password 유효성 검사
export const validatePassword = (_, value) => {
  const regExp =
    /(?=.*\d{1,50})(?=.*[~`!@#$%&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$/;
  if (!value) {
    return Promise.reject(new Error("비밀번호는 필수 항목입니다."));
  }
  if (!regExp.test(value)) {
    return Promise.reject(
      new Error("영문 소,대문자, 숫자, 특수문자를 모두 포함해야 합니다")
    );
  }
  return Promise.resolve();
};

//닉네임 유효성 검사
//길이 2~20, 영어, 한국어, 숫자
export const validateNickname = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("닉네임은 필수 항목입니다."));
  }
  if (/\s/.test(value)) {
    return Promise.reject(new Error("닉네임은 공백을 포함 할 수 없습니다"));
  }
  let nicknameLength = 0;
  for (let i = 0; i < value.length; i += 1) {
    const char = value.charAt(i);
    if (escape(char).length > 4) {
      nicknameLength += 2;
    } else {
      nicknameLength += 1;
    }
  }
  if (nicknameLength < 2 || nicknameLength >= 20) {
    return Promise.reject(
      new Error("한글 1~10자, 영문 및 숫자 2~20자까지 입력해주세요")
    );
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
