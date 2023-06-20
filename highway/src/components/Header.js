import {
  CommentOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Col, FloatButton, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LOGOUT_REQUEST } from "../constants/actionTypes";
import { NoDecoLink } from "../styles/PageStyle";
import { info } from "../utils/Message";
const imgUrl = "/assets/TitleIcon.png";
//사이트 로고 부분
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
  };
  function navigateToSchoolBoard() {
    //학교 게시판으로 이동
    navigate("/schoolboard/1");
  }

  useEffect(() => {
    // console.log(me);
  }, [me]);
  return (
    <>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: "0.5rem" }}>
        <Col xs={8} md={6} style={{ textAlign: "left" }}>
          <Title to="/">
            <img src={imgUrl} alt="Logo" style={{ width: "10rem" }} />
          </Title>
        </Col>
        <Col xs={16} md={9} style={{ textAlign: "right", marginTop: "0.3rem" }}>
          {me != null ? (
            <>
              <NoDecoLink to="/profile">
                <Avatar size={28} style={{ marginRight: "5px" }}>
                  {me.userName[0]}
                </Avatar>
                {me?.userName}
              </NoDecoLink>
              <Button onClick={onLogOut} danger style={{ marginLeft: "0.5rem" }}>
                로그아웃
              </Button>
            </>
          ) : (
            <div style={{ marginTop: "0.7rem" }}>
              <NoDecoLink to="/login">로그인</NoDecoLink>
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
          // height: 60,
          // width: 60,
          right: 40,
        }}
      />
      {/* <FloatButton
        type="primary"
        icon={<QuestionCircleOutlined />}
        tooltip={<div>서비스에 대한 생각을 남겨주세요</div>}
        style={{
          height: 60,
          width: 60,
          right: 40,
          bottom: 120,
        }}
      /> */}
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
