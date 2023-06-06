import { NavLink } from "react-router-dom";

export const items = [
  //메뉴 리스트 key : Menu 컴포넌트에 해당 항목 밑줄 쳐짐
  {
    key: "/promotion",
    label: <NavLink to="/promotion">홈</NavLink>,
  },
  {
    key: "/promotion/news",
    label: <NavLink to="/promotion/news">뉴스</NavLink>,
  },
  {
    key: "/promotion/videos",
    label: <NavLink to="/promotion/videos">영상</NavLink>,
  },
];
