import { List, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const TipLink = styled(Link)`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  margin: 10px;
`;
const SchoolDetailJob = () => {
  const data = [
    { tag: "취업", content: "2022년 이력서, 자기소개서 서식 및 작성 예시" },
    { tag: "취업", content: "현장실습(취업) 요청 안내_2020년" },
    {
      tag: "취업",
      content: " 학습중심 현장실습(취업)참여요청서 및 개인정보 수집 이용 및 제공동의서 서식_2020년",
    },
    { tag: "진로", content: " 드림레터23-03 고등학생 학부모의 상담 준비하기" },
    { tag: "진로", content: "드림레터23-02 우리 자녀 학년별 준비사항 알아보기" },
  ];
  return (
    <div
      style={{ backgroundColor: "white", borderRadius: "10px", textAlign: "left", padding: "2rem" }}
    >
      <List
        header={<h3 style={{ margin: "0" }}>정보글</h3>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Tag>{item.tag}</Tag>{" "}
            <TipLink to="">
              <span> {item.content}</span>
            </TipLink>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SchoolDetailJob;
