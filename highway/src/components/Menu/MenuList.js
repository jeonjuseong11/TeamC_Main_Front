import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuWrapper = styled.header`
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;

export const MenuLists = [
  {
    key: "/schoolRanking",
    label: <NavLink to="/schoolRanking">학교 랭킹</NavLink>,
  },
  {
    key: "/promotion",
    label: <NavLink to="/promotion">홍보자료</NavLink>,
  },
  {
    key: "/schoolboard",
    label: <NavLink to="/schoolboard/0">커뮤니티</NavLink>,
  },
];

// 현재 선택된 경로에 대한 key 값을 반환하는 함수
export const getSelectedKey = () => {
  const currentPath = window.location.pathname;
  const selectedMenuItem = MenuLists.find((item) => currentPath.startsWith(item.key));
  return selectedMenuItem ? selectedMenuItem.key : null;
};
