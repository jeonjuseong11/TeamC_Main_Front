import {
  DesktopOutlined,
  ExperimentOutlined,
  HighlightOutlined,
  LineChartOutlined,
  MedicineBoxOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Avatar, Col, Row, Segmented, Space } from "antd";
import React from "react";

export const RankTopic = [
  {
    icon: <ProfileOutlined />,
    content: "전체보기",
    value: "",
  },
  {
    icon: <ExperimentOutlined />,
    content: "자연과학",
    value: ["물리학", "화학", "생물학", "지구과학"],
  },
  {
    icon: <SettingOutlined />,
    content: "공학 및 기술",
    value: ["건축", "기계", "전자", "컴퓨터"],
  },
  {
    icon: <DesktopOutlined />,
    content: "정보통신 및 SW",
    value: ["정보통신", "소프트웨어", "네트워크", "시스템"],
  },
  {
    icon: <HighlightOutlined />,
    content: "예술 및 디자인",
    value: ["예술", "디자인", "음악", "영상", "애니메이션", "연극"],
  },
  {
    icon: <TeamOutlined />,
    content: "인문사회과학",
    value: ["역사", "경제", "정치", "사회", "심리"],
  },
  {
    icon: <TranslationOutlined />,
    content: "언어 및 문학",
    value: ["한국어", "영어", "독일어", "중국어", "일본어", "프랑스어"],
  },
  {
    icon: <LineChartOutlined />,
    content: "경제 및 경학",
    value: ["경제 ", "경학"],
  },
  {
    icon: <MedicineBoxOutlined />,
    content: "의학 및 보건",
    value: ["의학", "보건"],
  },
  {
    icon: <MedicineBoxOutlined />,
    content: "체육 및 스포츠",
    value: ["체육", "스포츠"],
  },
];
const RankSelector = ({ setFilterValue }) => {
  const handleFilterChange = (value) => {
    setFilterValue(value);
    console.log(value);
  };
  return (
    <Row justify="center">
      <Space direction="vertical" style={{ overflowX: "auto" }}>
        <Segmented
          onChange={handleFilterChange}
          options={RankTopic.map((item) => ({
            label: (
              <Col key={item.value} style={{ padding: 5 }}>
                <Avatar
                  style={{ backgroundColor: "#8282ff" }}
                  icon={item.icon}
                />

                <div>{item.content}</div>
              </Col>
            ),
            value: item.value,
          }))}
        />
      </Space>
    </Row>
  );
};

export default RankSelector;
