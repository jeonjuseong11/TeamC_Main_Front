import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import { Menu } from "antd";
import { Wrapper } from "../../styles/PageStyle";
import { MenuLists } from "./MenuList";
import styled from "styled-components";

const MenuHeader = styled.header`
  border-top: 1px solid #c2c2c2;
  border-bottom: 1px solid #c2c2c2;
`;

const TopMenu = () => {
  const location = useLocation();
  const [testUrl, setTestUrl] = useState('/');
  useEffect(() => {
    if(location.pathname === "/promotion" || location.pathname === "/promotion/news" || location.pathname === "/promotion/videos"){
      setTestUrl("/promotion");
    }else{setTestUrl(location.pathname)}
  }, [location]);
  return (
    <div>
      <Wrapper>
        <Header />
      </Wrapper>
      <MenuHeader>
        <Wrapper>
          <Menu
            mode="horizontal"
            items={MenuLists}
            selectedKeys={testUrl}
          />
        </Wrapper>
      </MenuHeader>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopMenu;
