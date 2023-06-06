import React from "react";
import { TermWrapper } from "../../styles/TermsStyle";
import { Divider, Form } from "antd";
// import { useNavigate } from "react-router-dom";

const Private = () => {
  // const navigator = useNavigate();
  return (
    <TermWrapper>
      <Divider />
      <h1>HIGHWAY 개인정보 처리방침</h1>
      <p>내용</p>
      <Form.Item></Form.Item>
    </TermWrapper>
  );
};

export default Private;
