import React, { useEffect } from "react";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Modal } from "antd";
import {
  LoginBtn,
  LoginWrapper,
  LoginMenuItem,
  LoginInput,
  LoginMenu,
  LoginForm,
  LoginFormTitle,
} from "../styles/LoginStyle";

import { useNavigate } from "react-router-dom";
import { LOGIN_REQUEST } from "../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";

const imgUrl = "/assets/TitleIcon.png";
const Login = () => {
  const { me, logInError } = useSelector((state) => state.user);
  const access = localStorage.getItem("ACCESSTOKEN");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: values,
    });
    // console.log("로그인 값: ", values);
  };

  useEffect(() => {
    // console.log(me);
    if (access) {
      navigate("/");
    }
  }, [me, navigate]);

  return (
    <LoginWrapper>
      <LoginForm
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <LoginFormTitle>
          <img src={imgUrl} alt="Logo" style={{ width: "13rem" }} />
        </LoginFormTitle>
        <Form.Item
          name="userId"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("normal_login")) {
                  if (!value) {
                    return Promise.reject("아이디를 입력해주세요");
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <LoginInput
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="아이디 또는 이메일"
          />
        </Form.Item>
        <Form.Item
          name="userPw"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue("normal_login")) {
                  if (!value) {
                    return Promise.reject("아이디를 입력해주세요");
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <LoginInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ textAlign: "left", fontSize: "0.75rem" }}
        >
          <Checkbox>로그인 상태 유지</Checkbox>
        </Form.Item> */}
        <Form.Item shouldUpdate>
          {({ getFieldsError, getFieldValue }) => (
            <LoginBtn
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={
                !getFieldValue("userId") ||
                !getFieldValue("userPw") ||
                getFieldsError().some((field) => field.errors.length)
              }
            >
              Log in
            </LoginBtn>
          )}
        </Form.Item>
        <LoginMenu>
          <LoginMenuItem to="/terms">회원가입</LoginMenuItem>
          {/* <LoginMenuItem to="/findpw">비밀번호를 까먹었나요?</LoginMenuItem> */}
        </LoginMenu>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
