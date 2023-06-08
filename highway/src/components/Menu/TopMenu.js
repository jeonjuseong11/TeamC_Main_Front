import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import { Col, Menu, Row } from "antd";
import { MenuLists } from "./MenuList";
import { MenuWrapper } from "./MenuList";

const TopMenu = () => {
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <Header />
      <MenuWrapper>
        <Row justify="center" gutter={[24, 24]}>
          <Col xs={24} md={15}>
            <Menu
              mode="horizontal"
              items={MenuLists}
              selectedKeys={location.pathname}
            />
          </Col>
        </Row>
      </MenuWrapper>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopMenu;
