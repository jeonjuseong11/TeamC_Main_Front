import styled from "styled-components";
import { Button, Form, Input, Radio } from "antd";
//회원가입 페이지 전체를 감싸고 배경색을 담당
//안에 것들을 화면 중앙에 배치함
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
  width: 30%;
  min-width: 30rem;
  border: 1px solid #efefef;
  padding: 3rem;
  border-radius: 1.25rem;
  text-align: left;
`;
//회원가입 폼 안에 input style
export const SignUpInput = styled(Input)`
  height: 3rem;
`;
export const SignUpInputPassword = styled(Input.Password)`
  height: 3rem;
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
  border: 1px solid #8282ff;d
  color: #8282ff;
  width: 45%;
  height: 3rem;
  display: inline-block;
`;
export const BackToLogin = styled(Button)`
  width: 40%;
  margin-top : 7%;
  color: #FFFFFF;
  height: 3rem;
  color: #FFFFFF;
  background-color: #8282ff;
  font-weight: 700;
`
export const RadioGroup = styled(Form)`
`

export const AgeGenderWrapper = styled(Form.Item)`

// export const GenderRadio = styled(Form.Item)`
//   display: 'inline-block'
//   width: 'calc(40% - 8px)'
// `
