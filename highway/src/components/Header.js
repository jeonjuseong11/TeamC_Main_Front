import { Avatar, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT_REQUEST } from "../constants/actionTypes";
import { NoDecoLink } from "../styles/PageStyle";

//사이트 로고 부분
const Title = styled(Link)`
  text-decoration: none;
  text-align: right;
  color: black;
  font-size: 2rem;
`;
const HeaderWrapper = styled.div`
  text-align: left;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const ProfileWrapper = styled.div`
  padding-top: 5px;
  float: right;
  text-decoration: none;
  color: black;
`;

const Header = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogOut = () => {
    alert("로그아웃");
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };
  function navigateToSchoolBoard() {
    //학교 게시판으로 이동
    navigate("/schoolboard/1");
  }

  return (
    <HeaderWrapper>
      <Title to="/">HIGHWAY</Title>
      <ProfileWrapper>
        {me ? (
          <>
            <Button onClick={navigateToSchoolBoard}>학교 게시판으로</Button>
            <NoDecoLink to="/profile">
              <Avatar size={28} style={{ marginRight: "5px" }}>
                {me?.userName[0]}
              </Avatar>
              {me?.userName}
            </NoDecoLink>
            <Button onClick={onLogOut}>로그아웃</Button>
          </>
        ) : (
          <NoDecoLink to="/login">로그인</NoDecoLink>
        )}
      </ProfileWrapper>
    </HeaderWrapper>
  );
};

export default Header;
