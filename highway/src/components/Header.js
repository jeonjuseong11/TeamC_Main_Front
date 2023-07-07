import {
  CommentOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, FloatButton, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT_REQUEST } from "../constants/actionTypes";
import { info } from "../utils/Message";

const imgUrl = "/assets/TitleIcon.png";

const Title = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
`;

const Header = () => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOut = () => {
    info("로그아웃");
    dispatch({
      type: LOGOUT_REQUEST,
    });
    // navigate(-1);
    window.localStorage.clear();
  };

  useEffect(() => {
    // console.log(me);
  }, [me]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
        <Col xs={8} md={6} style={{ textAlign: "left" }}>
          <Title to="/">
            <img src={imgUrl} alt="Logo" style={{ width: "10rem" }} />
          </Title>
        </Col>
        <Col xs={16} md={9} style={{ textAlign: "right", marginTop: "0.3rem" }}>
          {me !== null ? (
            <>
              <Button onClick={handleProfileClick} type="link" style={{ color: "black" }}>
                <Avatar size={28}>{me?.userName[0]}</Avatar>
                <span style={{ marginLeft: "0.5rem" }}>{me?.userName}</span>
              </Button>
              <Button onClick={onLogOut} danger style={{ marginLeft: "0.5rem" }}>
                로그아웃
              </Button>
            </>
          ) : (
            <div style={{ marginTop: "0.7rem" }}>
              <Link to="/login">로그인</Link>
            </div>
          )}
        </Col>
      </Row>
      <FloatButton
        href="https://www.work.go.kr/consltJobCarpa/jobPsyExamNew/jobPsyExamYouthList.do"
        type="primary"
        icon={<FileTextOutlined />}
        tooltip={<div>적성검사 하러가기</div>}
        style={{
          right: 40,
        }}
      />
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 40, bottom: 100 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton
          icon={<CommentOutlined />}
          tooltip={<div>서비스에 대한 생각을 남겨주세요</div>}
        />
        <FloatButton icon={<QuestionCircleOutlined />} tooltip={<div>버그 리포트</div>} />
      </FloatButton.Group>
    </>
  );
};

export default Header;
