import styled from "styled-components";
import { Button, Form, Checkbox } from "antd";

export const JoinPresenterWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;
export const JoinPresenterForm = styled(Form)`
  text-align: left;
  width: 30%;
  min-width: 25rem;
`;
export const JoinPresenterFormTitle = styled.h1`
  text-align: center;
`;
export const JoinPresenterBtn = styled(Button)`
  width: 40%;
  margin-left : 7%;
  height: 3rem;
  background-color: #8282ff;
  font-weight: 700;
`;
export const JoinPresenters = styled(Form)`
`;
export const JoinPresenterCheckbox = styled(Checkbox)`
margin-left : 27%;
`;

