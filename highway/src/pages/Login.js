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

import { Link, useNavigate } from "react-router-dom";
import { LOGIN_REQUEST } from "../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const { me, logInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: values,
    });
    // console.log("로그인 값: ", values);
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    // console.log(me);
    if (me) {
      navigate(-1);
    }
  }, [me]);
  useEffect(() => {}, []);
  const imgUrl = "/assets/TitleIcon.png";

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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/">
            <img src={imgUrl} alt="Logo" style={{ width: "13rem", marginBottom: "1rem" }} />
          </Link>
        </div>
        {/* <LeftOutlined onClick={goHome} style={{ marginBottom: "1rem" }} /> */}
        {/* <LoginFormTitle>로그인</LoginFormTitle> */}
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
        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          style={{ textAlign: "left", fontSize: "0.75rem" }}
        >
          <Checkbox>로그인 상태 유지</Checkbox>
        </Form.Item> */}
        <Form.Item>
          <LoginBtn type="primary" htmlType="submit" className="login-form-button">
            Log in
          </LoginBtn>
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
