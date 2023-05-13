import React, { useEffect, useState } from "react";
import { Form, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  JoinPresenterBtn,
  JoinPresenterWrapper,
  JoinPresenterForm,
  JoinPresenterFormTitle,
  JoinPresenters,
  JoinPresenterCheckbox,
} from "../styles/JoinPresenterStyle";
import { Link, useNavigate } from "react-router-dom";
import { items } from "../utils/Agree";

const JoinPresenter = () => {
  const [requiredCheck, setRequiredCheck] = useState(false);
  const [promotion, setPromotion] = useState(false);
  const [location, setLocation] = useState(false);

  const navigator = useNavigate();

  const onFinish = () => {
    if (requiredCheck) {
      navigator("/signup");
    }
  };
  useEffect(() => {}, [requiredCheck, promotion, location]);
  return (
    <JoinPresenterWrapper>
      <JoinPresenterForm
        name="normal_JoinPresenter"
        className="JoinPresenter-form"
        onFinish={onFinish}
      >
        <JoinPresenterFormTitle>약관동의</JoinPresenterFormTitle>
        <JoinPresenters name="JoinPresenters" initialValue={{ checked: false }}>
          <Form.Item>
            <JoinPresenterCheckbox
              name="requiredCheck"
              checked={requiredCheck}
              onChange={(e) => {
                setRequiredCheck(e.target.checked);
              }}
              value="requiredCheck"
            >
              HIGHWAY 필수약관 동의
            </JoinPresenterCheckbox>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Form.Item>
          <Form.Item>
            <JoinPresenterCheckbox
              name="location"
              checked={location}
              onChange={(e) => {
                setLocation(e.target.checked);
              }}
              value="TermToUse"
            >
              위치기반서비스 이용약관 동의(선택)
            </JoinPresenterCheckbox>
          </Form.Item>
          <Form.Item>
            <JoinPresenterCheckbox
              name="promotion"
              checked={promotion}
              onChange={(e) => {
                setPromotion(e.target.checked);
              }}
              value="promotion"
            >
              프로모션 정보 수신동의(선택)
            </JoinPresenterCheckbox>
          </Form.Item>
          <Form.Item>
            <JoinPresenterBtn
              type="primary"
              htmlType="submit"
              className="JoinPresenter-form-button"
            >
              확인
            </JoinPresenterBtn>
            <Link to={"/login"}>
              <JoinPresenterBtn type="primary" className="goToLogin">
                취소
              </JoinPresenterBtn>
            </Link>
          </Form.Item>
        </JoinPresenters>
      </JoinPresenterForm>
    </JoinPresenterWrapper>
  );
};

export default JoinPresenter;
