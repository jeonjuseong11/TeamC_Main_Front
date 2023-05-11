import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import { Menu } from "antd";
import { Wrapper } from "../../styles/PageStyle";
import { MenuLists } from "./MenuList";
import { MenuWrapper } from "./MenuList";

const TopMenu = () => {
  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);
  return (
    <div>
      <Wrapper>
        <Header />
      </Wrapper>
      <MenuWrapper>
        <Wrapper>
          <Menu mode="horizontal" items={MenuLists} selectedKeys={location.pathname} />
        </Wrapper>
      </MenuWrapper>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopMenu;
