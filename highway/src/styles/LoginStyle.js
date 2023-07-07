import styled from "styled-components";
import { Input, Button, Form } from "antd";
import { Link } from "react-router-dom";

export const LoginWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f2f2f2;
`;
export const LoginForm = styled(Form)`
  text-align: left;
  width: 25%;
  min-width: 15rem;
  padding: 2rem;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 18.4rem;
`;
export const LoginFormTitle = styled.h1`
  margin-top: 10rem;
  text-align: center;
`;
export const LoginInput = styled(Input)`
  width: 100%;
  height: 3rem;
  font-weight: 700;
`;
export const LoginBtn = styled(Button)`
  width: 100%;
  height: 3rem;
  background-color: #8282ff;
  font-weight: 700;
`;
export const LoginMenu = styled.p`
  text-align: left;
`;
export const LoginMenuItem = styled(Link)`
  text-decoration: none;
  color: #737881;
  font-weight: 500;
  letter-spacing: -0.6px;
  vertical-align: baseline;
  margin-right: 1rem;
`;
