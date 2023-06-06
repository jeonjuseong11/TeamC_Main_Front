import { Avatar, Card, Button, Col, Row } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LOGOUT_REQUEST } from "../../constants/actionTypes";
const BoardProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogOut = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, []);
  return (
    <>
      <Col xs={24} md={4}>
        <Card
          actions={[
            <Button
              type="text"
              style={{ width: "90%" }}
              onClick={() => navigate(`/schoolboard/${schoolId}/post`)}
            >
              글쓰기
            </Button>,
            <Button type="text" danger onClick={onLogOut} loading={logOutLoading}>
              로그아웃
            </Button>,
          ]}
        >
          <Card.Meta
            avatar={
              <Link to={`/profile`}>
                <a>
                  <Avatar>{me?.userName[0]}</Avatar>
                </a>
              </Link>
            }
            title={me?.userName}
          />
        </Card>
      </Col>
    </>
  );
};
export default BoardProfile;
