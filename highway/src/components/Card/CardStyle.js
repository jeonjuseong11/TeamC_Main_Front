import React from "react";

import styled from "styled-components";
import { Space, Button } from "antd";

//Card 리스트 전체를 감싸는 div
export const ListWrapper = styled.div`
  margin: 0 auto;
  width: 60%;
`;
//Card 리스트 안에 공백을 처리하기위해 Card 리스트 안에 div
export const CardItem = styled.div`
  margin-top: 3px;
  margin-bottom: 3px;
`;
//좋아요 갯수, 댓글 갯수, 찜하기 갯수를 나타내는 리스트
export const IconList = styled(Space)`
  gap: 0px !important;
  margin: 0px 3px;
`;
//icon과 텍스트를 받아 아이콘을 출력해주는 작은 컴포넌트
export const IconText = ({ icon, text }) => (
  <IconList>
    {React.createElement(icon)}
    {text}
  </IconList>
);
//학과를 tag로 하여 어떤 학과가 있는지 버튼으로 보여줌
export const TagsItem = styled(Button)`
  display: inline-block;
  padding: 5px;
  height: 20px;
  line-height: 10px;
  background-color: rgba(80, 62, 157, 0.1);
  color: #503e9d;
  margin-bottom: 3px;
  border-radius: 5px;
  border: 0;
  margin-right: 5px;
`;
