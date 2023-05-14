import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpWrapper, SignUpBtn, BackToLogin } from "../styles/SignUpStyle";

const SignUp = () => {
  return (
    <SignUpWrapper>
      <div>
        <h2>어떤 사용자 인가요?</h2>
        <Link to="/signup/student">
          <SignUpBtn icon={<UserOutlined />}>
            <br />
            재학생
          </SignUpBtn>
        </Link>
        <Link to="/signup/other">
          <SignUpBtn icon={<UsergroupAddOutlined />}>
            <br />
            기타 사용자
          </SignUpBtn>
        </Link>
        <Form.Item>
          <Link to={"/login"}>
            <BackToLogin>돌아가기</BackToLogin>
          </Link>
        </Form.Item>
      </div>
    </SignUpWrapper>
  );
};

export default SignUp;