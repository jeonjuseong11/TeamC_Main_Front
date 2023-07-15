import styled, { keyframes } from "styled-components";
import { Button, Form, Input, Select } from "antd";
//회원가입 페이지 전체를 감싸고 배경색을 담당
//안에 것들을 화면 중앙에 배치함

// 애니메이션 키프레임
const slideDownAnimation = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 학교 선택 셀렉터 컴포넌트
export const SchoolSelector = styled(Select)`
  animation: ${slideDownAnimation} 0.5s ease-in-out;
`;

export const SignUpWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fbfbfb;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;
//어떤 회원인지 고를수 있는 버튼
export const SignUpBtn = styled(Button)`
  width: 10rem;
  height: 10rem;
  font-size: 1.5rem;
  margin-left: 5px;
  margin-right: 5px;
`;
//회원가입 폼 style
export const SignUpForm = styled(Form)`
  background-color: white;
  width: 20%;
  min-width: 30rem;
  border: 1px solid #efefef;
  padding: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 1.25rem;
  text-align: left;
`;
//회원가입 폼 안에 input style
export const SignUpInput = styled(Input)`
  height: 3rem;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: #f2f2f2;
`;
export const SignUpInputPassword = styled(Input.Password)`
  height: 3rem;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: #f2f2f2;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
//회원가입 폼 안에 가입, 취소 버튼 style
export const StudentSignUpBtn = styled(Button)`
  background-color: #8282ff;
  width: 45%;
  height: 3rem;
  display: inline-block;
`;
export const CancelBtn = styled(Button)`
  border: 1px solid #8282ff;
  color: #8282ff;
  width: 45%;
  height: 3rem;
  display: inline-block;
`;
export const BackToLogin = styled(Button)`
  width: 40%;
  margin-top: 7%;
  color: #ffffff;
  height: 3rem;
  background-color: #8282ff;
  font-weight: 700;
`;
//회원가입 나이,성별 입력란을 한 줄에 놓기 위해
export const SmallFormItem = styled(Form.Item)`
  display: inline-block;
  width: 50%;
`;
