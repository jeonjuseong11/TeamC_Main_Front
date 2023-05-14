import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  width: 60%;
  margin: 0 auto;
`;
export const SubWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
`;
export const NoDecoLink = styled(Link)`
  float: right;
  text-decoration: none;
  color: black;
  margin-right: 5px;
`;
