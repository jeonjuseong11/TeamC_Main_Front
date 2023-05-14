import React, { useEffect } from "react";
import axios from "axios";
import { LeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form } from "antd";
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

const Login = () => {
  const { me, logInError, token } = useSelector((state) => state.user);
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
    if (logInError) {
      alert(logInError); //로그인 실패 이유
    }
  }, [logInError]);

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    // console.log(me);
    if (me) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    }
  }, [me, token]);

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
        <LeftOutlined onClick={goHome} />
        <LoginFormTitle>로그인</LoginFormTitle>
        <Form.Item
          name="userId"
          rules={[
            {
              required: true,
              message: "아이디를 입력해주세요",
            },
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
            {
              required: true,
              message: "비밀번호를 입력해주세요",
            },
          ]}
        >
          <LoginInput
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ textAlign: "left", fontSize: "0.75rem" }}
        >
          <Checkbox>로그인 상태 유지</Checkbox>
        </Form.Item>
        <Form.Item>
          <LoginBtn type="primary" htmlType="submit" className="login-form-button">
            Log in
          </LoginBtn>
        </Form.Item>
        <LoginMenu>
          <LoginMenuItem to="/signup">회원가입</LoginMenuItem>
          <LoginMenuItem to="/findpw">비밀번호를 까먹었나요?</LoginMenuItem>
        </LoginMenu>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
