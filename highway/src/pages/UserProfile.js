import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";

const UserProfile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    axios.post(`http://localhost:8080/todo?`);
  };
  return (
    <div>
      원래 프로필 페이지임
      <br />
      <Form form={form} name="test" onFinish={onFinish}>
        <Form.Item name="tokenTest">
          <Input defaultValue="토큰 테스트용입니다" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            test
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
