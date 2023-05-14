import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const MenuWrapper = styled.header`
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
`;
export const MenuLists = [
  //메뉴 리스트 key : Menu 컴포넌트에 해당 항목 밑줄 쳐짐
  {
    key: "/schoolRanking",
    label: <NavLink to="/schoolRanking">학교 랭킹</NavLink>,
  },
  {
    key: "/search",
    label: <NavLink to="/search">내 학교 찾기</NavLink>,
  },
  {
    key: "/promotion",
    label: <NavLink to="/promotion">홍보자료</NavLink>,
  },
];
